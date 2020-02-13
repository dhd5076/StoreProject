var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController');

router.use('/', function(req, res) {
    res.render('cart')
});

module.exports = router;