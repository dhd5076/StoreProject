exports.requiresLogin = function(req, res, next){
    if(req.session.user) {
        next();
    } else {
        res.redirect('/account/login');
    }
}

exports.requiresAdmin = function(req, res, next){
    if(req.session.user && req.session.user.username == 'admin') {
        next();
    } else {
        res.redirect('/');
    }
}