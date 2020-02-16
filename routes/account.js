var express = require('express');
var router = express.Router();
var authMiddleware = require('../middleware/auth');

var userController = require('../controllers/userController');

router.get('/', authMiddleware.requiresLogin, userController.view_account);

router.get('/login', userController.view_login);
router.post('/login', userController.login_user);

router.get('/register', userController.view_register);
router.post('/register', userController.create_account);

module.exports = router;