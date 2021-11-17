const express = require('express');
const path = require('path')
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
let lastUpdated = 0;

const jcboseupd = function (res) {
    if (Date.now() - lastUpdated > 3600000) {
        lastUpdated = Date.now();
        try {
            axios('https://www.jcboseust.ac.in/content/all_notices/general-notices')
                .then(res => {
                    const html = res.data;
                    var i = 0;
                    const $ = cheerio.load(html);
                    const articles = [];
                    $('.views-row', html).each(function () {
                        const date = $(this).find('p').text();
                        const url = $(this).find('a').attr('href');
                        const title = $(this).find('a').text();
                        i++;
                        if (i < 15) {
                            articles.push({ date, title, url });
                        }
                    });

                    fs.writeFile(path.join(__dirname, '../public/', 'jcbose.json'), JSON.stringify(articles, null, 2), (err) => {
                        if (err) {
                            console.log('jcbose err 1');
                        }
                        // console.log("successfully written")
                    })
                })
                .catch(err => console.log('jcbose err 2'));
        }
        catch (err) { console.log('jcbose err3') }
    }
    res.sendFile(path.join(__dirname, "../public", 'jcbose.html'));
}
module.exports = jcboseupd;