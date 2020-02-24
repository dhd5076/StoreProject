var express = require('express');
var router = express.Router();

var orderController = require('../controllers/orderController');

router.get('/checkout', orderController.view_checkout);

router.post('/purchase', orderController.create_order);

module.exports = router;