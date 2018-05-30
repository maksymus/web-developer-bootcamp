var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var passport = require('passport');

var PassportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

var seedDB = require("./seeds");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

mongoose.connect('mongodb://localhost:32772/yelp-camp');

seedDB();

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

app.use(function (req, res, next) {
   res.locals.currentUser = req.user;
   return next();
});

/////////////////////////////////////////////////////////
// Routes
/////////////////////////////////////////////////////////

/*******************************************************
 * Campground routes
 ******************************************************/

app.get("/", function (req, res) {
    res.render("landing.ejs");
});

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("campgrounds/index.ejs", {campgrounds: campgrounds});
        }
    });
});

app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new.ejs");
});

app.get("/campgrounds/:id", function (req, res) {
    Campground.findOne({_id: req.params.id}).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("campgrounds/show.ejs", {campground: campground});
        }
    });
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    var cg = new Campground({name: name, image: image, description: description});
    cg.save(function (err, res) {
        if (err) {
            console.log("error:", err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});

/**************************************
// Comments routes
***************************************/
app.get("/campgrounds/:id/comments/new", isLoggeIn, function (req, res) {
    Campground.findOne({_id: req.params.id}).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("campgrounds/comments/new.ejs", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggeIn, function (req, res) {
    Campground.findOne({_id: req.params.id}).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log("error:", err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log("error:", err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

/*************************************************************
 * Auth routes
 ************************************************************/
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
            res.redirect("/campgrounds");
        });
    });
});

app.get("/login", function (req, res) {
    res.render("login.ejs");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function (req, res) {
});

app.get("/logout", function(req, res) {
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


app.listen(3000, function () {
    console.log("server is listening");
});