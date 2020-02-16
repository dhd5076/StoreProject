var Product = require('../models/product');

exports.list_product = function(req, res) {
    Product.find({}, function(err, products) {
        res.render('shop', {user: req.session.user, products: products});
    });
}

exports.view_product = function(req, res) {
    Product.findOne({_id: req.params.id}, function(err, product){
        res.render('product', {user: req.session.user, product: product});
    });
}

exports.create_product = function(req, res) {
        var product = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
        });
        product.save();
        res.render('product', {product: product});
}