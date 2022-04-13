const express = require('express');
const path = require('path')
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
// let lastUpdated = 0;

const jcboseupd = function (clgPrevUpd) {
    // if (Date.now() - lastUpdated > 300000) {
    // lastUpdated = Date.now();
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
                    console.log(date);

                    articles.push({ clgPrevUpd, date, title, url });

                });
                console.log(articles.length);
                fs.writeFile(path.join(__dirname, '../public/', 'jcbose.json'), JSON.stringify(articles, null, 2), (err) => {
                    if (err) {
                        console.log(err);
                    }
                    // console.log("successfully written")
                })
            })
            .catch(err => console.log(err));
    }
    catch (err) { console.log(err) };
    // }
    // res.sendFile(path.join(__dirname, "../public", 'jcbose.html'));
}
module.exports = jcboseupd;