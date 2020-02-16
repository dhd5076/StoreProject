var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Product = require('../models/product');

var productController = require('../controllers/productController');

router.get('/dashboard', function(req, res) {
    User.find({}, function(err, users) {
        Product.find({}, function(err, products){
            res.render('admin-dashboard', {user: req.session.user, users: users, products: products})
        });
    });
});

router.post('/create-product', productController.create_product);

module.exports = router;