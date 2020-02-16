var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.use('/dashboard', function(req, res) {
    User.find({}, function(err, users) {
        res.render('admin-dashboard', {user: req.session.user, users: users})
    });
});

module.exports = router;