var express = require("express");
var router = express.Router();

var Campground      = require("../models/campground"),
    Comment         = require("../models/comment"),
    User            = require("../models/user");

router.get("/campgrounds/:id/comments/new", isLoggeIn, function (req, res) {
    Campground.findOne({_id: req.params.id}).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("campgrounds/comments/new.ejs", {campground: campground});
        }
    });
});

router.post("/campgrounds/:id/comments", isLoggeIn, function (req, res) {
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

function isLoggeIn(req, res, next) {
    console.log("User logged in: " + req.isAuthenticated());

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

module.exports = router;