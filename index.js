var express = require('express');
var app = require('express')();
var https = require('https');
var http = require('http');
var mongoose = require('mongoose');
var session = require('express-session');
var indexRouter = require('./routes');
var path = require('path');
var fs = require('fs');

app.use(session({
    secret: 'aeropept',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'pug')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { dotfiles: 'allow' }));
app.use('/', indexRouter);

mongoose.connect('mongodb://localhost/AeroPept', {useNewUrlParser: true, useUnifiedTopology: true});

https.createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/www.aeropept.com/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/www.aeropept.com/cert.pem'),
	ca: fs.readFileSync('/etc/letsencrypt/live/www.aeropept.com/fullchain.pem'),
}, app).listen(443, () => {
	console.log('Listening...');
});

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
