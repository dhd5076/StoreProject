var Order = require('../models/order');

exports.view_checkout = function(req, res) {
    res.render('checkout', {session: req.session});
}

exports.create_order = function(req, res) {
    shipping_address = 
                    req.body.first_name + ' ' + req.body.last_name + '\n' +
                    req.body.street_address_1 + ' ' + req.body.street_address_2 + '\n' +
                    req.body.city + ', ' + req.body.state + ' ' + req.body.zipcode;
    console.log(shipping_address); 
}