const express = require('express');
const path = require('path')
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const dcrustupd = function (clgPrevUpd) {
    try {
        var i = 0;
        axios('http://www.dcrustm.ac.in/')
            .then(res => {
                const html = res.data;
                const $ = cheerio.load(html);
                // console.log(html);
                const articles = [];
                var wpbcount = 0;
                $('.wpb_wrapper', html)
                    .each(function () {
                        wpbcount++;
                        if (wpbcount > 5) {
                            $(this).find('a').each(function () {
                                i++;
                                const url = $(this).attr('href');
                                let title = $(this).text();
                                if (i < 50) {
                                    if (url != undefined && title.toString().trim().length>0) {                                        
                                        articles.push({ clgPrevUpd, title, url });
                                    }
                                }
                            })
                        }
                    });
                // console.log(articles);
                fs.writeFile(path.join(__dirname, '../public/', 'dcrust.json'), JSON.stringify(articles, null, 2), (err) => {
                    if (err) {
                        console.log('some error occur 1');
                    }
                    // console.log("successfully written")
                })
            })
            .catch(err => console.log('dcrust error occur 2'))
    }
    catch (err) {
        console.log('dcurst error occur3')
    }
    // }
    // res.sendFile(path.join(__dirname, "../public", 'dcrust.html'));
}

module.exports = dcrustupd;