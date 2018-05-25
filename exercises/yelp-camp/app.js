var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var seedDB = require("./seeds");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

mongoose.connect('mongodb://localhost:32772/yelp-camp');

seedDB();

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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
app.get("/campgrounds/:id/comments/new", function (req, res) {
    Campground.findOne({_id: req.params.id}).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("campgrounds/comments/new.ejs", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function (req, res) {
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

    // var name = req.body.name;
    // var image = req.body.image;
    // var description = req.body.description;
    //
    // var cg = new Campground({name: name, image: image, description: description});
    // cg.save(function (err, res) {
    //     if (err) {
    //         console.log("error:", err);
    //     } else {
    //         res.redirect("/campgrounds");
    //     }
    // })
});

app.listen(3000, function () {
    console.log("server is listening");
});