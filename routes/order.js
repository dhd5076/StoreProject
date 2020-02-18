var express = require('express');
var router = express.Router();

var orderController = require('../controllers/productController');

router.get('/order/create', orderController.create_order);

module.exports = router;