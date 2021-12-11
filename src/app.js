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
const atcoderupd = require('./atcoder');
const codechefupd = require('./codechef');
const codeforcesupd = require('./codeforces');

const { clear } = require('console');

const app = express();
//test branch to test 
const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));
app.set('view engine', 'ejs');



const callingFun = function () {

    let clgPrevUpd = Date.now();
    let codePrevUpd = Date.now();
    atcoderupd(codePrevUpd);
    codechefupd(codePrevUpd);
    codeforcesupd(codePrevUpd);
    gjuupd(clgPrevUpd);
    dtuupd(clgPrevUpd);
    jcboseupd(clgPrevUpd);
    mduupd(clgPrevUpd);
    dcrustupd(clgPrevUpd);
    const update1 = setInterval(function () {
        codePrevUpd = Date.now();
        atcoderupd(codePrevUpd);
        codechefupd(codePrevUpd);
        codeforcesupd(codePrevUpd);
    }, 180000)
    const update2 = setInterval(function () {
        clgPrevUpd = Date.now();
        gjuupd(clgPrevUpd);
        dtuupd(clgPrevUpd);
        jcboseupd(clgPrevUpd);
        mduupd(clgPrevUpd);
        dcrustupd(clgPrevUpd);
    }, 300000)
}

callingFun();

var heading = `<div class="container text-center" ><b>WELCOME BACK 🎉</b> </div>`;
var colour = "rgb(156, 240, 240)";
var result = "";
app.get('/', (req, res) => {
    try {
        res.status(201).render('index', { heading: heading, colour: colour, result: result });
    }
    catch (err) {
        res.send("There is some issue. Kindly check your network connection ");
    }
})

//******* */ Form data view-clear-add **************

app.use(express.urlencoded({ extended: false }));
app.post('/submit/', async (req, res) => {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const message = req.body.message;

        const data = `<div class="card text-center border-info">
                            <div class="card-body ">
                                <p class="card-text">${name}</p>
                                <p class="card-text">${message}</p>
                                <a href="mailto:${email}">${email}</a>
                            </div>
                     </div>
                     <br>`

        const write = async () => {
            try {
                fs.appendFileSync(path.join(__dirname, '/', 'data.txt'), data, async (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('Written');
                    }
                })
            }
            catch (err) {
                console.log(err);
            }
        }
        await write();
    }
    catch (err) {
        console.log(err);
    }
    
    result="Submitted Successfully";
    setTimeout(function(){
        result="";
    },5000);
    res.redirect('/');
})

app.get('/clearusermessage01/',(req,res)=>{

    const temp = `<div class="card text-center border-info">
                            <div class="card-body ">
                                <p class="card-text">Tushar</p>
                                <p class="card-text">everything well</p>
                                <a href="#">email</a>
                            </div>
                     </div><br>`

    fs.writeFile(path.join(__dirname, '/', 'data.txt'),temp,(err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send('success');
        }
    })
})


//*********** */ To change main head*************

app.get('/head01/:heading/:colour', (req, res) => {
    try {
        heading = req.params.heading;
        colour = req.params.colour;
        heading = heading.replace(/(dot)/g, ".")
        heading = heading.replace(/(slash)/g, "/")
        heading = heading.replace(/(quest)/g, "?")
        heading = heading.replace(/(andq)/g, "&")
        heading = heading.replace(/(percent)/g, "%")

        setTimeout(function () {
            heading = `<div class="container text-center"><b>WELCOME BACK 🎉</b> </div>`;
            colour = "rgb(156, 240, 240)";
            result="";
        }, 3600000);
        res.send('success');
    }
    catch (err) {
        res.send(err);
    }
})

app.get('/usermessage01',(req,res)=>{
    let data="";
    fs.readFile(path.join(__dirname, '/', 'data.txt'),'utf-8',(err,file)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.status(201).render('message',{result:file});
        }
    })
})

app.get('*', (req, res) => {
    res.send('<h1>Error:404</h1><br><h3>Page not found</h3>');
})

app.listen(port);