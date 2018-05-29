var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var passport = require('passport');

var PassportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

var User = require("./models/user");

mongoose.connect('mongodb://localhost:32772/auth-demo');

var app = express();

app.use(require('express-session')({
    secret: 'secret seed',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.get("/secret", isLoggeIn, function (req, res) {
    res.render("secret.ejs");
});

app.get("/register", function (req, res) {
    res.render("register.ejs");
});

app.post("/register", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({username: username}), password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect("/register");
        }

        passport.authenticate("local")(req, res, function () {
            res.redirect("/secret");
        });
    });
});

app.get("/login", function (req, res) {
    res.render("login.ejs");
});

app.post("/login", passport.authenticate("local", {
            successRedirect: "/secret",
            failureRedirect: "/login"
        }),function (req, res) {
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggeIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

app.listen(3000, function () {
    console.log("server is listening");
});