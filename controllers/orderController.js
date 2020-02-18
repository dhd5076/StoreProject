var Order = require('../models/order');

exports.create_product = function(req, res) {
    var product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });
    product.save();
    res.redirect('/product/' + product._id);
}