var Order = require('../models/order');

exports.view_checkout = function(req, res) {
    res.render('checkout', {session: req.session});
}

exports.create_order = function(req, res) {
    var order = new Order({
        invoice : req.session.cart,
        shipping_address : req.body.shipping_address,
        billing_address : req.body.billing_address
    });
}