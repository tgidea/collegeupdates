const express = require('express');
const path = require('path')
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
let lastUpdated = 0;

const gjuupd = async (res)=> {
    if (Date.now() - lastUpdated > 300000) {
        lastUpdated = Date.now();
        try {
            var i = 0;
            await axios('http://www.gjust.ac.in/')
                .then(res => {
                    const html = res.data;
                    const $ = cheerio.load(html);
                    // console.log(html);
                    const articles = [];
                    var wpbcount = 0;
                    $('.tabpage', html)
                        .each(function () {
                            if (wpbcount == 0) {
                                var title = "", url;
                                $(this).find('li').each(function () {
                                    title = $(this).text();
                                    if (title != "") {
                                        url = "http://www.gjust.ac.in/";
                                        url += $(this).find('a').attr('href');
                                        url = url.replace(/\s/g, "%20")
                                        articles.push({ title, url });
                                    }
                                })
                            }
                            else {
                                return;
                            }
                        });
                    // console.log(articles);
                    fs.writeFile(path.join(__dirname, '../public/', 'gju.json'), JSON.stringify(articles, null, 2), (err) => {
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
    res.sendFile(path.join(__dirname, "../public", 'gju.html'));
}
// var s = "hello";
// mduupd(s);
module.exports = gjuupd;

