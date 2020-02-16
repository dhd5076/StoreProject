exports.list_product = function(req, res) {
    res.render('shop', {user: req.session.user});
}

exports.view_product = function(req, res) {
    res.send("View Product");
}