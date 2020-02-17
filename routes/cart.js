var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController');

router.get('/', function(req, res) {
    res.render('cart', {session: req.session});
});

router.post('/add/:id', productController.add_to_cart);

module.exports = router;