var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController');

router.use('/', productController.list_product);

module.exports = router;