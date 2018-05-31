var express = require("express");
var router = express.Router();

var passport        = require('passport');

var Campground      = require("../models/campground"),
    Comment         = require("../models/comment"),
    User            = require("../models/user");


router.get("/", function (req, res) {
    res.render("landing.ejs");
});

router.get("/register", function (req, res) {
    res.render("register.ejs");
});

router.post("/register", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({username: username}), password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect("/register");
        }

        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", function (req, res) {
    res.render("login.ejs");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function (req, res) {
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggeIn(req, res, next) {
    console.log("User logged in: " + req.isAuthenticated());

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

module.exports = router;