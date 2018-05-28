var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var passport = require('passport');

var passportLocal = require('passport-local');
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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.get("/secret", function (req, res) {
    res.render("secret.ejs");
});

app.listen(3000, function () {
    console.log("server is listening");
});