var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController');

router.use('/:id', productController.view_product);

module.exports = router;