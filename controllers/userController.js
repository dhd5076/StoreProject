var User = require('../models/user');

exports.view_account = function(req, res) {
    res.redirect('/account/login');
}

exports.view_login = function(req, res) {
    if(req.session.user) {
        res.render('account')
    } else {
        res.render('login');
    }
}

exports.login_user = function(req, res) {
    User.findOne({username : req.body.username}, function(err, user) {
        if(user) {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if(err) {
                    console.log(err);
                }
                if(isMatch) {
                    req.session.user = user;
                    req.session.save();
                    res.redirect('/');
                    req.session.user = user;
                    req.session.save();
                } else {
                    res.render('login', {errmsg: 'Username or password were incorrect'})
                }
            });
        } else {
            res.render('login', {errmsg: 'Username or password were incorrect'});
        }
    });
}

exports.view_register = function(req, res) {
    res.render('register');
}

exports.create_account = function(req, res) {
    if( req.body.firstname &&
        req.body.lastname &&
        req.body.username &&
        req.body.password ) {

        User.find({username : req.body.username}, function(err, users) {
            if(!req.body.username.includes(' ')) {
                if(users.length == 0) {
                    var user = new User({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        password: req.body.password,
                        wings: 100
                    });
                    user.save(function(err) {
                        console.log(err + 'asdasd');
                        res.render('register', {msg: 'Account Created Successfully'});
                    });
                } else {
                    res.render('register', {errmsg : 'Username already exists'})
                }
            } else {
                res.render('register', {errmsg : 'Illegal character in username'})
            }
        });
    }
}
