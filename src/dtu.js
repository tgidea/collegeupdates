const express = require('express');
const path = require('path')
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
// let lastUpdated = 0;

const dtuupd = function (clgPrevUpd) {
    // if (Date.now() - lastUpdated > 300000) {
    // lastUpdated = Date.now();
    try {
        var i = 0;
        axios('http://dtu.ac.in')
            .then(res => {

                const html = res.data;
                const $ = cheerio.load(html);
                const articles = [];
                $('#tab4', html).each(function () {

                    $(this).find('li').each(function () {
                        $(this).find('a').each(function () {

                            const url = $(this).attr('href');
                            var finalurl = 'undefined';
                            const title = $(this).text();
                            if (url != undefined) {
                                if (url[0] == 'h')
                                    var finalurl = `${url}`;
                                else {
                                    const len = url.length;
                                    const url2 = url.slice(1, len);
                                    finalurl = `http://dtu.ac.in${url2}`;
                                }
                            }
                            i++;
                            if (i < 70) {
                                if (title != undefined) {
                                    articles.push({ clgPrevUpd, title, finalurl });
                                }
                            }
                        })
                    })
                    // }
                });

                fs.writeFile((path.join(__dirname, '../public/', 'dtu.json')), JSON.stringify(articles, null, 2), (err) => {
                    if (err) {
                        console.log('dtu err1');
                    }
                })
            })
            .catch(err => console.log('dtu err2'));
    }
    catch (err) { console.log('dtu err3') }
    // }
    // res.sendFile(path.join(__dirname, "../public", 'dtu.html'));
}
module.exports = dtuupd;