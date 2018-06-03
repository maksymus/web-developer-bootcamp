var express = require("express");
var router = express.Router();

var common = require("../common");

var Campground      = require("../models/campground"),
    Comment         = require("../models/comment"),
    User            = require("../models/user");

router.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("campgrounds/index.ejs", {campgrounds: campgrounds});
        }
    });
});

router.get("/campgrounds/new", common.isLoggeIn, function (req, res) {
    res.render("campgrounds/new.ejs");
});

router.get("/campgrounds/:id", function (req, res) {
    Campground.findOne({_id: req.params.id}).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("campgrounds/show.ejs", {campground: campground});
        }
    });
});

router.post("/campgrounds", common.isLoggeIn, function (req, res) {
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

module.exports = router;