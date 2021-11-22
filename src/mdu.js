const express = require('express');
const path = require('path')
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
let lastUpdated = 0;

const mduupd = async (res)=> {
    if (Date.now() - lastUpdated > 300000) {
        lastUpdated = Date.now();
        try {
            var i = 0;
            await axios('https://mdu.ac.in/')
                .then(res => {
                    const html = res.data;
                    const $ = cheerio.load(html);
                    // console.log(html);
                    const articles = [];
                    var wpbcount = 0;
                    $('.cardstyle', html)
                        .each(function () {
                            wpbcount++;
                            var title, date, url;
                            $(this).find('.card-title').each(function () {
                                url = "https://mdu.ac.in";
                                url += $(this).find('a').attr('href');
                                url = url.replace(/\s/g, "%20")
                                title = $(this).text();
                            })
                            $(this).find('.DateNews').each(function () {
                                date = $(this).text();
                            })
                            articles.push({ title, date, url });

                        });
                    // console.log(articles);
                    fs.writeFile(path.join(__dirname, '../public/', 'mdu.json'), JSON.stringify(articles, null, 2), (err) => {
                        if (err) {
                            console.log('some error occur 1');
                        }
                        // console.log("successfully written")
                    })
                })
                .catch(err => console.log('some error occur 2'))
        }
        catch (err) {
            console.log('error occur3')
        }
    }
    res.sendFile(path.join(__dirname, "../public", 'mdu.html'));
}
// var s = "hello";
// dcrustupd(s);
module.exports = mduupd;