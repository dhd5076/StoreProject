var express = require('express');
var router = express.Router();

var shopRouter = require('./shop');
var faqRouter = require('./faq');
var contactRouter = require('./contact');
var accountRouter = require('./account');
var cartRouter = require('./cart');
var adminRouter = require('./admin')

var authMiddleware = require('../middleware/auth');

router.use('/shop', shopRouter);

router.use('/faq', faqRouter);

router.use('/contact', contactRouter);

router.use('/account', accountRouter);

router.use('/cart', cartRouter);

router.use('/admin', authMiddleware.requiresAdmin, adminRouter);

router.use('/', function(req, res){
    res.render('index', {user: req.session.user})
});

module.exports = router;