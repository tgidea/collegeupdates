const express = require('express');
const path = require('path')
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../public", 'main.html'))
    }
    catch (err) {
        res.send("There is some issue. Kindly check your network connection ");
    }
})

app.use(express.static(path.join(__dirname, "../public")));
app.get('/jcbose', (req, res) => {
    
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
                        console.log(err);
                    }
                    // console.log("successfully written")
                })
            })
            .catch(err => console.log(err));
    }
    catch (err) { console.log(err) }

    res.sendFile(path.join(__dirname, "../public", 'jcbose.html'));

})
//dcrust: to add data to dcrust.json
app.get('/dcrust', (req, res) => {

    async () => {
        try {
            var i = 0;
            await axios('http://www.dcrustm.ac.in/')
                .then(res => {
                    const html = res.data;
                    const $ = cheerio.load(html);
                    // console.log(html);
                    const articles = [];
                    $('.wpb_wrapper', html)
                        .each(function () {
                            $(this).find('p').each(function () {
                                i++;
                                const url = $(this).find('a').attr('href');
                                const title = $(this).find('a').text();
                                if (i > 7 && i < 17) {
                                    articles.push({ title, url });
                                }
                            })
                        });
                    // console.log(articles);
                    fs.writeFile(path.join(__dirname, '../public/', 'dcrust.json'), JSON.stringify(articles, null, 2), (err) => {
                        if (err) {
                            console.log(err);
                        }
                        // console.log("successfully written")
                    })
                })
                .catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    }
    res.sendFile(path.join(__dirname, "../public", 'dcrust.html'));
})

////dtu: to add data to dtu.json
app.get('/dtu', (req, res) => {
    
    // async () => {
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
                                var finalurl='undefined';
                                const title = $(this).text();
                                if (url != undefined) {
                                    if (url[0] == 'h')
                                        var finalurl = `${url}`;
                                    else {
                                        const len = url.length;    
                                        const url2 = url.slice(1,len);
                                         finalurl = `http://dtu.ac.in${url2}`;
                                    }
                                }
                                i++;
                                if (i < 50) {
                                    articles.push({ title, finalurl });
                                }
                            })
                        })
                        // }
                    });
                    
                    fs.writeFile((path.join(__dirname, '../public/', 'dtu.json')), JSON.stringify(articles, null, 2), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                })
                .catch(err => console.log(err));
        }
        catch (err) { console.log(err) }
    // }
    res.sendFile(path.join(__dirname, "../public", 'dtu.html'));
})

app.get('*',(req,res)=>{
    res.send('<h1>Error:404</h1><br><h3>Page not found</h3>');
})



app.listen(port);