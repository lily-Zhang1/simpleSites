'use strict';
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const database = require('./public/myjs/data.js');
const multiparty = require('multiparty');
const app = express();
// https
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('./public/private.pem', 'utf8');
const certificate = fs.readFileSync('./public/file.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
const PORT = 8010;
const SSLPORT = 8011;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

// Increase security
app.use(helmet());

// parse json type file
app.use(bodyParser.json());

// parse urlencoded type file
app.use(bodyParser.urlencoded({extended: true}));

/* By modifying the underlying router of express
   to achieve global capture of abnormal errors in
   express routing async function
*/
const Layer = require('express/lib/router/layer');
Object.defineProperty(Layer.prototype, 'handle', {
    enumerable: true,
    get() {
        return this.__handle;
    },
    set(fn) {
        if (fn.length === 4) {
            this.__handle = fn;
        } else {
            this.__handle = (req, res, next) =>
                Promise.resolve(fn(req, res, next)).catch(next);
        }
    },
});

// Error Handler
app.use(function (err, req, res, next) {
    console.error('Error:', err);
    res.status(500).send(err.message);
});

// create database
database.createData();

let banned = [];
banUpperCase('./public/', '');

// Make URLs lower case
app.use(lower);

// ban upper case filenames
app.use(ban);

// url Validation
app.use(urlValidation);

// deliver static files from ./public.
let options = { setHeaders: deliverXHTML };

// use ejs template
app.set('views', './public/views')
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// Using Session middleware
app.use(session({
    secret :  'secret',
    resave : true,
    saveUninitialized: false,
    cookie : {
        // Set the session effective time, in milliseconds
        maxAge : 1000 * 60 * 8,
    },
}));

// Make the URL lower case.
function lower(req, res, next) {
    req.url = req.url.toLowerCase();
    next();
}

// Forbid access to the URLs in the banned list.
function ban(req, res, next) {
    for (let i=0; i<banned.length; i++) {
        let b = banned[i];
        if (req.url.startsWith(b)) {
            res.status(404).send('Filename not lower case');
            return;
        }
    }
    next();
}

// Called by express.static.  Deliver response as XHTML.
function deliverXHTML(res, path, stat) {
    if (path.endsWith('.html')) {
        res.header('Content-Type', 'application/xhtml+xml');
    }
}

// ban the upper case
function banUpperCase(root, folder) {
    let folderBit = 1 << 14;
    let names = fs.readdirSync(root + folder);
    for (let i=0; i<names.length; i++) {
        let name = names[i];
        let file = folder + '/' + name;
        if (name != name.toLowerCase()) banned.push(file.toLowerCase());
        let mode = fs.statSync(root + file).mode;
        if ((mode & folderBit) === 0) continue;
        banUpperCase(root, file);
    }
}

// url validation
function urlValidation(req, res, next) {
    if (req.url.startsWith('//')) {
        res.status(404).send('URL cannot begin with //');
        return;
    } else if (req.url.startsWith('/..')) {
        res.status(404).send('URL cannot begin with /..');
        return;
    } else if (req.url.startsWith('/.')) {
        res.status(404).send('URL cannot begin with /.');
        return;
    } else if (req.url.indexOf('%20') != -1 || req.url.indexOf(' ') != -1) {
        res.status(404).send('URL cannot contains space');
        return;
    }
    let url = req.url;
    let temp;
    // non-ascii
    for (let i = 0; i < url.length; i++) {
        if (url.charAt(i) === '%') {
            temp = url.substring(i+1, i+3);
            if (temp.length === 2) {
                let number = parseInt(temp.charAt(0), 16)*16+parseInt(temp.charAt(1), 16);
                if (number > 127) {
                    res.status(404).send('URL cannot contains non-ascii character');
                    return;
                }
            }
        }
    }
    next();
}

//************************** response ***************************
const str = 'application/xhtml+xml';
//******************** home page *********************
app.get('/', async (req, res, next) => {
    //******** content negotiation *********
    if(req.headers.accept.indexOf(str) != -1) {
        res.set('Content-Type', 'application/xhtml+xml');
    } else {
        res.set('Content-Type', 'text/html');
    }
    /*Determine the user's login status, if it is valid,
      return to the home page, otherwise go to the login page*/
    if(req.session.username){
        res.render('index',{username : req.session.username, titlename:'HOME'});
    } else {
        res.redirect('/login.html');
    }
});

//******************** login page *********************
app.get('/login.html', async (req, res, next) => {
    //******** content negotiation *********
    if(req.headers.accept.indexOf(str) != -1) {
        res.set('Content-Type', 'application/xhtml+xml');
    } else {
        res.set('Content-Type', 'text/html');
    }
    res.sendFile( __dirname + '/public/login.html' );
});

app.post('/login.html', async (req, res, next) => {
    //******** content negotiation *********
    if(req.headers.accept.indexOf(str) != -1) {
        res.set('Content-Type', 'application/xhtml+xml');
    } else {
        res.set('Content-Type', 'text/html');
    }
    //Ajax data receiving and processing
    let form = new multiparty.Form();
    form.parse(req, async function(err,fields,file){
        let email = fields.email.toString();
        let password = fields.password.toString();
        let username;
        try {
            username = await database.searchUser(email, password);
        } catch (err) {
            console.log(err);
        }
        if (username === 'null') {
            res.send('Login failed, wrong account or password! ' +
                'If you don\'t have an account yet, you can go to ' +
                'the registration page to register.');
        } else {
            // Successfully login, set session
            req.session.username = username;
            res.send('Login successful, now you can enter the main page or search page');
        }
    });
});

//****************** register page ********************
app.get('/register.html', async (req, res, next) => {
    //******** content negotiation *********
    if(req.headers.accept.indexOf(str) != -1) {
        res.set('Content-Type', 'application/xhtml+xml');
    } else {
        res.set('Content-Type', 'text/html');
    }
    res.sendFile( __dirname + '/public/register.html' );
});

app.post('/register.html', async (req, res) => {
    //******** content negotiation *********
    if(req.headers.accept.indexOf(str) != -1) {
        res.set('Content-Type', 'application/xhtml+xml');
    } else {
        res.set('Content-Type', 'text/html');
    }
    try {
        await database.insertUser(req.body.username,req.body.email,req.body.password);
        res.redirect('/login.html');
    } catch (err) {
        console.log(err);
    }
});

//******************** video page *********************
app.get('/video1.html', async (req, res, next) => {
    //******** content negotiation *********
    if(req.headers.accept.indexOf(str) != -1) {
        res.set('Content-Type', 'application/xhtml+xml');
    } else {
        res.set('Content-Type', 'text/html');
    }
    if(req.session.username){
        res.render('video1',{username : req.session.username, titlename:'VIDEO'});
    }else{
        res.redirect('/login.html');
    }
});

app.get('/video2.html', async (req, res, next) => {
    //******** content negotiation *********
    if(req.headers.accept.indexOf(str) != -1) {
        res.set('Content-Type', 'application/xhtml+xml');
    } else {
        res.set('Content-Type', 'text/html');
    }
    if(req.session.username){
        res.render('video2',{username : req.session.username, titlename:'VIDEO'});
    }else{
        res.redirect('/login.html');
    }
});

app.get('/video3.html', async (req, res, next) => {
    //******** content negotiation *********
    if(req.headers.accept.indexOf(str) != -1) {
        res.set('Content-Type', 'application/xhtml+xml');
    } else {
        res.set('Content-Type', 'text/html');
    }
    if(req.session.username){
        res.render('video3',{username : req.session.username, titlename:'VIDEO'});
    }else{
        res.redirect('/login.html');
    }
});

//******************** search page *********************
app.get('/search.html', async (req, res, next) => {
    //******** content negotiation *********
    if(req.headers.accept.indexOf(str) != -1) {
        res.set('Content-Type', 'application/xhtml+xml');
    } else {
        res.set('Content-Type', 'text/html');
    }
    if(req.session.username){
        res.render('search',{username : req.session.username, titlename:'SEARCH'});
    }else{
        res.redirect('/login.html');
    }
});

app.post('/search.html', async (req, res, next) => {
    //******** content negotiation *********
    if (req.headers.accept.indexOf(str) != -1) {
        res.set('Content-Type', 'application/xhtml+xml');
    } else {
        res.set('Content-Type', 'text/html');
    }
    if (req.body.startDate === '' || req.body.endDate === '') {
        res.render('error', {username: req.session.username, titlename: 'ERROR'});
    } else {
        let country = req.body.country.toUpperCase();
        let startStr = req.body.startDate.substring(8);
        let endStr = req.body.endDate.substring(8);
        let start = parseInt(startStr, 10);
        let end = parseInt(endStr, 10);
        if ((country != 'UK' && country != 'USA' && country != 'FRANCE')
            || end - start < 1 || start < 24 || end > 30) {
            res.render('error', {username: req.session.username, titlename: 'ERROR'});
        } else {
            let data;
            try {
                data = await getData(country, start, end);
                let content = writeFileAsync('./public/data.json', data);
                res.render('searchResult', {username: req.session.username,
                    titlename: 'SEARCH', searchName: country});
            } catch (err) {
                console.log(err);
            }
        }
    }
});

// get the resulting data
async function getData(country, start, end) {
    let data = {
        'mortality':[],
        'recovery':[],
        'confirmed':[],
        'date':[]};
    for (let i = start; i <= end; i++) {
        let date = '2020-05-'+i;
        let single;
        try {
            single = await database.searchCountry(country, date);
            data.mortality[data.mortality.length] = single.mortality;
            data.recovery[data.recovery.length] = single.recovery;
            data.confirmed[data.confirmed.length] = single.confirmed;
            data.date[data.date.length] = '05/'+i;
        } catch (err) {
            console.log(err);
        }
    }
    return data;
}

// Write the resulting data to json file
function writeFileAsync(path,newData) {
    return new Promise(function (resolve, reject) {
        let content = JSON.stringify(newData);
        fs.writeFile(path,content,function(err){
            if(err){
                reject(err);
                return;
            }
        })
    });
}

//******************** error page *********************
app.get('/error.html', async (req, res, next) => {
    //******** content negotiation *********
    if(req.headers.accept.indexOf(str) != -1) {
        res.set('Content-Type', 'application/xhtml+xml');
    } else {
        res.set('Content-Type', 'text/html');
    }
    res.render('searchResult',{username: req.session.username, titlename:'SEARCH'});
});

//******************** logout *************************
app.get('/logout', function (req, res, next) {
    //******** content negotiation *********
    if(req.headers.accept.indexOf(str) != -1) {
        res.set('Content-Type', 'application/xhtml+xml');
    } else {
        res.set('Content-Type', 'text/html');
    }
    // Delete session, redirect to login page
    req.session.username = null;
    res.redirect('/login.html');
});

//************* deal with other page ******************
app.use(express.static('public', options));
