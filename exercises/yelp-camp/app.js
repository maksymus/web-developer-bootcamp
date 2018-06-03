// https://github.com/nax3t/yelp-camp-refactored

var express         = require("express"),
    ejs             = require("ejs"),
    bodyParser      = require("body-parser"),
    mongoose        = require('mongoose'),
    flash           = require("connect-flash"),
    passport        = require('passport'),
    PassportLocal   = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    seedDB          = require("./seeds");

var Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user");

var indexRoutes         = require("./routes/index"),
    commentsRoutes      = require("./routes/comments"),
    campgroundsRoutes   = require("./routes/campgrounds");

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
app.use(flash());

passport.use(new PassportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    return next();
});

app.use(campgroundsRoutes);
app.use(commentsRoutes);
app.use(indexRoutes);

app.listen(3000, function () {
    console.log("server is listening");
});