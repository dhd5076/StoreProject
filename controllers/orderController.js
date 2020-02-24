var Order = require('../models/order');

exports.view_checkout = function(req, res) {
    var total = 0;
    if(req.session.cart) {
        req.session.cart.forEach((cart_item) => {
            total += parseFloat(cart_item.product.price * cart_item.quantity);
        });
    }
    res.render('checkout', {session: req.session, total: total});
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
}

exports.view_order = function(req, res) {
    Order.findOne({_id: req.params.id}, function(err, order) {
        if(order) {
            var total = 0;
            if(order.invoice) {
                order.invoice.forEach((item) => {
                    total += parseFloat(item.product.price * item.quantity);
                });
            }
            res.render('order', {session: req.session, order: order, total: total})
        } else {
            res.redirect('/');
        }
    });
}