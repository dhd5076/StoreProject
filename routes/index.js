var express = require('express');
var router = express.Router();

var shopRouter = require('./shop');
var faqRouter = require('./faq');
var contactRouter = require('./contact');
var accountRouter = require('./account');
var cartRouter = require('./cart');

router.use('/shop', shopRouter);

router.use('/faq', faqRouter);

router.use('/contact', contactRouter);

router.use('/account', accountRouter);

router.use('/cart', cartRouter);

router.use('/', function(req, res){
    if(req.session.user) {
        res.render('index', {user: req.session.user})
    }
        res.render('index');
});

module.exports = router;