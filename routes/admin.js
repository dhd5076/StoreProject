var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Product = require('../models/product');

var productController = require('../controllers/productController');
var userController = require('../controllers/userController');

router.get('/dashboard', function(req, res) {
    User.find({}, function(err, users) {
        Product.find({}, function(err, products){
            res.render('admin-dashboard', {session: req.session, users: users, products: products})
        });
    });
});

router.post('/create-product', productController.create_product);
router.post('/delete-product/:id', productController.delete_product);

router.post('/delete-account/:id', userController.delete_account);

module.exports = router;