const express = require('express');
const path = require('path')
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const jcboseupd = require('./jcbose');
const dcrustupd = require('./dcrust');
const dtuupd = require('./dtu');
const mduupd = require('./mdu');
const gjuupd = require('./gju');
const codechefupd = require('./codechef');
const codeforcesupd = require('./codeforces');

const app = express();

const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));
app.set('view engine','ejs');

const callingFun = function(){

    let clgPrevUpd=Date.now();
    let codePrevUpd=Date.now();
    codechefupd(codePrevUpd);
    codeforcesupd(codePrevUpd);
    gjuupd(clgPrevUpd);
    dtuupd(clgPrevUpd);
    jcboseupd(clgPrevUpd);
    mduupd(clgPrevUpd);
    dcrustupd(clgPrevUpd);
    const update1 = setInterval(function () {
        codePrevUpd=Date.now();
        codechefupd(codePrevUpd);
        codeforcesupd(codePrevUpd);
    }, 180000)
    const update2 = setInterval(function () {
        clgPrevUpd=Date.now();
        gjuupd(clgPrevUpd);
        dtuupd(clgPrevUpd);
        jcboseupd(clgPrevUpd);
        mduupd(clgPrevUpd);
        dcrustupd(clgPrevUpd);
    }, 300000)
}

callingFun();
var heading="WELCOME BACK 🎉";
app.get('/', (req, res) => {
    try {
        res.status(201).render('index',{heading:heading});
        // res.sendFile(path.join(__dirname, "../public", 'main.html'))
    }
    catch (err) {
        res.send("There is some issue. Kindly check your network connection ");
    }
})

app.get('/head7095/:heading',(req,res)=>{
    heading=req.params.heading;
    heading=heading.replace(/(dot)/g,".")
    heading=heading.replace(/(slash)/g,"/")
    heading=heading.replace(/(quest)/g,"?")
    heading=heading.replace(/(andq)/g,"&")
    heading=heading.replace(/(percent)/g,"%")
    
    setTimeout(function(){
        heading="WELCOME BACK 🎉";
    },3600000);
    res.send('success');
})
// app.use(express.static(path.join(__dirname, "../public")));
// app.get('/jcbose', async (req, res) => {
//     await jcboseupd(res);
// })

//dcrust: to add data to dcrust.json
// app.get('/dcrust', async (req, res) => {
//     await dcrustupd(res);
// })

////dtu: to add data to dtu.json
// app.get('/dtu', async (req, res) => {
//     await dtuupd(res);
// })

// app.get('/mdu', async (req, res) => {
//     await mduupd(res);
// })

// app.get('/gju', async (req, res) => {
//     await gjuupd(res);
// })

// app.get('/codechef', (req, res) => {
//     codechefupd(res);  
// })

// app.get('/codeforces', (req, res) => {
//     codeforcesupd(res);  
// })

app.get('*', (req, res) => {
    res.send('<h1>Error:404</h1><br><h3>Page not found</h3>');
})



app.listen(port);