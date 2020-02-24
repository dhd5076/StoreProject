var Order = require('../models/order');

exports.view_checkout = function(req, res) {
    res.render('checkout', {session: req.session});
}

exports.create_order = function(req, res) {
    shipping_address = 
                    req.body.first_name + ' ' + req.body.last_name + '\n' +
                    req.body.street_address_1 + ' ' + req.body.street_address_2 + '\n' +
                    req.body.city + ', ' + req.body.state + ' ' + req.body.zipcode;
   order = new Order({
        invoice: req.session.cart,
        shipping_address: shipping_address
   });
   order.save();
   res.redirect('/order/view/' + order._id);
   console.log(order);
}

exports.view_order = function(req, res) {
    Order.findOne({_id: req.params.id}, function(err, order) {
        if(order) {
            res.render('order', {session: req.session, order: order})
        } else {
            res.redirect('/');
        }
    });
}