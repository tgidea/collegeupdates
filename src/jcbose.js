const express = require('express');
const path = require('path')
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
// let lastUpdated = 0;

const jcboseupd = async (clgPrevUpd) =>{
    console.log('in jcboseupd');
    try {

        axios('https://www.jcboseust.ac.in/content/all_notices/general-notices')
            .then(res => {
                console.log('in axios')
                const html = res.data;
                var i = 0;
                const $ = cheerio.load(html);
                console.log($);
                const articles = [];
                console.log('inside fun');
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
    
    
}
module.exports = jcboseupd;