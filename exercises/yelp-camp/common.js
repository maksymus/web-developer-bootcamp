var flash = require("connect-flash");

var common = {}

common.isLoggeIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    req.flash("error", "Please login first");
    res.redirect("/login");
}

module.exports = common;