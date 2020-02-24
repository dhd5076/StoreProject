var Product = require('../models/product');

exports.list_product = function(req, res) {
    Product.find({}, function(err, products) {
        res.render('shop', {session: req.session, products: products});
    });
}

exports.view_product = function(req, res) {
    Product.findOne({_id: req.params.id}, function(err, product){
        res.render('product', {session: req.session, product: product});
    });
}

exports.create_product = function(req, res) {
        var product = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        });
        product.save();
        res.redirect('/product/' + product._id);
}

exports.delete_product = function(req, res) {
    Product.findByIdAndDelete(req.params.id, function(err, product){
        res.redirect('/admin/dashboard/#products');
    });
}

exports.add_to_cart = function(req, res) {
    Product.findOne({_id: req.params.id}, function(err, product){
        if(!req.session.cart) {
            req.session.cart = [];
        }

        var foundMatch = false

        req.session.cart.forEach((cart_item, index) => {
            if(cart_item.product._id == req.params.id) {
                req.session.cart[index].quantity++;
                foundMatch = true;
            }
        });
        if(!foundMatch) {
            req.session.cart.push({
                product: product,
                quantity: 1
            });
        }

        res.redirect('/cart');
    });
}

exports.increment_item_in_cart = function(req, res) {
    req.session.cart.forEach((cart_item, index) => {
        if(cart_item.product._id == req.params.id) {
            req.session.cart[index].quantity++;
        }
    });
    res.redirect('/cart')
}

exports.decrement_item_in_cart = function(req, res) {
    req.session.cart.forEach((cart_item, index) => {
        if(cart_item.product._id == req.params.id) {
            req.session.cart[index].quantity--;
            if(req.session.cart[index].quantity <= 0) {
                req.session.cart.splice(index, 1);
            }
        }
    });
    res.redirect('/cart')
}