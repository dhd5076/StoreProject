exports.list_product = function(req, res) {
    res.render('shop');
}

exports.view_product = function(req, res) {
    res.send("View Product");
}