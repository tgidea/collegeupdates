const express = require('express');
const path = require('path')
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const { data } = require('cheerio/lib/api/attributes');
// let lastUpdated = 0;

const codeforcesupd = function (codePrevUpd) {
    // if (Date.now() - lastUpdated > 600000) {
    // lastUpdated = Date.now();

    try {
        axios('https://codeforces.com/contests')
            .then(res => {
                const html = res.data;
                const $ = cheerio.load(html);
                let i = 0;
                const articles = [];
                let name, time, duration, toStart, toRegister, link;
                $('table', html).each(function () {
                    if (i == 0) {
                        $(this).find('tr').each(function () {

                            let j = 0;
                            $(this).find('td').each(function () {

                                const dataInner = $(this).text();
                                if (j == 0) {
                                    name = dataInner;
                                }
                                if (j == 2) {
                                    link = $(this).find('a').attr('href');
                                    time = dataInner.trim();
                                }
                                if (j == 3) {
                                    duration = dataInner.trim();
                                }
                                if (j == 4) {
                                    toStart = dataInner.trim();
                                }
                                if (j == 5) {
                                    toRegister = dataInner.trim();
                                }
                                j++;
                            })
                            if (name != undefined) {
                                articles.push({ codePrevUpd, name, time, duration, toStart, toRegister, link });
                            }
                        })
                        console.log(articles);
                    }
                    else {
                        return;
                    }
                    i++;
                })
                if (articles.length > 1) {
                    fs.writeFile(path.join(__dirname, '../public/', 'codeforces.json'), JSON.stringify(articles, null, 2), (err) => {
                        if (err) {
                            console.log('codeforces err 1');
                        }
                        // console.log("successfully written")
                    })
                }
            })
            .catch(err => console.log(err));
    }
    catch (err) { console.log('codeforces err3') }
    // }
    // resp.sendFile(path.join(__dirname, "../public", 'codeforces.html'));


}
// var s="hello";
// codeforcesupd(s);
module.exports = codeforcesupd;