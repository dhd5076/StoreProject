var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/', userController.view_account);

router.get('/login', userController.view_login);
router.post('/login', userController.login_user);

router.get('/register', userController.view_register);
router.post('/register', userController.create_account);

module.exports = router;