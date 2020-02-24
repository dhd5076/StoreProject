var User = require('../models/user');

exports.view_account = function(req, res) {
    if(req.params.id) {
        User.findOne({ _id: req.params.id }, function(err, user) {
            res.render('account', {session: req.session});
        });
    } else {
        res.render('account', {session: req.session});
    }
}

exports.view_login = function(req, res) {
    if(req.session.user) {
        res.render('account')
    } else {
        res.render('login', {session: req.session});
    }
}

exports.logout_user = function(req, res) {
    if(req.session) {
        req.session.destroy();
    }
    res.redirect("/");
}

exports.login_user = function(req, res) {
    User.findOne({username : req.body.username}, function(err, user) {
        if(user) {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if(err) {
                    res.render('login', {errmsg: 'Unknown error logging in'})
                }
                if(isMatch) {
                    req.session.user = user;
                    req.session.save();
                    res.redirect('/');
                } else {
                    res.render('login', {errmsg: 'Username or password were incorrect', session: req.session})
                }
            });
        } else {
            res.render('login', {errmsg: 'Username or password were incorrect', session: req.session});
        }
    });
}

exports.view_register = function(req, res) {
    res.render('register', {session: req.session});
}

exports.create_account = function(req, res) {
    if( req.body.username  &&
        req.body.password) {
        User.find({username : req.body.username}, function(err, users) {
            if(!req.body.username.includes(' ')) {
                if(users.length == 0) {
                    var user = new User({
                        username: req.body.username,
                        password: req.body.password
                    });
                    user.save(function(err) {
                        console.log(user.password);
                        res.render('register', {msg: 'Account Created Successfully', session: req.session});
                    });
                } else {
                    res.render('register', {errmsg : 'Username already exists', session: req.session})
                }
            } else {
                res.render('register', {errmsg : 'Illegal character in username', session: req.session})
            }
        });
    }
}

exports.delete_account = function(req, res) {
    User.findByIdAndDelete(req.params.id, function(err, user) {
        res.redirect('/admin/dashboard/#users');
    });
}
