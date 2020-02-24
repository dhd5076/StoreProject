var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController');

router.get('/', function(req, res) {
    var total = 0;
    if(req.session.cart) {
        req.session.cart.forEach((cart_item) => {
            total += parseFloat(cart_item.product.price * cart_item.quantity);
        });
    }
    res.render('cart', {session: req.session, total: total});
});

router.post('/add/:id', productController.add_to_cart);

router.post('/decrement/:id', productController.decrement_item_in_cart);

router.post('/increment/:id', productController.increment_item_in_cart);

module.exports = router;