const express = require('express');
const path = require('path')
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const jcboseupd=require('./jcbose');
const dcrustupd = require('./dcrust');
const dtuupd=require('./dtu');
const mduupd=require('./mdu');
const gjuupd=require('./gju');
const codechefupd=require('./codechef');
const codeforcesupd=require('./codeforces');

const app = express();

const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

codechefupd();
codeforcesupd();
const update=setInterval(function(){
    codechefupd();
    codeforcesupd();
},180000)

app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../public", 'main.html'))
    }
    catch (err) {
        res.send("There is some issue. Kindly check your network connection ");
    }
})

app.use(express.static(path.join(__dirname, "../public")));
app.get('/jcbose', async(req, res) => {
    await jcboseupd(res);
})

//dcrust: to add data to dcrust.json
app.get('/dcrust', async(req, res) => {
    await  dcrustupd(res);
})

////dtu: to add data to dtu.json
app.get('/dtu',async (req, res) => {
    await dtuupd(res);  
})

app.get('/mdu',async (req, res) => {
    await mduupd(res);  
})

app.get('/gju', async(req, res) => {
    await gjuupd(res);  
})

// app.get('/codechef', (req, res) => {
//     codechefupd(res);  
// })

// app.get('/codeforces', (req, res) => {
//     codeforcesupd(res);  
// })

app.get('*',(req,res)=>{
    res.send('<h1>Error:404</h1><br><h3>Page not found</h3>');
})



app.listen(port);