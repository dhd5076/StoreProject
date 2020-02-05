var express = require('express');
var router = express.Router();

var shopRouter = require('./shop');
var faqRouter = require('./faq');
var contactRouter = require('./contact');
var accountRouter = require('./account');
var cartRouter = require('./cart');

router.use('/', function(req, res) {
    res.render('index');
});

router.use('/shop',shopRouter);

router.use('/faq', productRouter);

router.use('/contact', productRouter);

router.use('/account', productRouter);

router.use('/cart', productRouter);

module.exports = router;