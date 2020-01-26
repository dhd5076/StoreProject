var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var session = require('express-session');
var indexRouter = require('./routes');
var path = require('path');

app.use(session({
    secret: 'wingwingwing',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'pug')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter)
app.use('/', function(req, res){
    res.send("Coming Soon - AeroPept");
});

mongoose.connect('mongodb://localhost/AeroPept', {useNewUrlParser: true});

http.listen(8080, function() {
   console.log('listening on *:8080'); 
});