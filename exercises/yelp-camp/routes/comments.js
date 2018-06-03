var express = require("express");
var router = express.Router();

var common = require("../common");

var Campground      = require("../models/campground"),
    Comment         = require("../models/comment"),
    User            = require("../models/user");

router.get("/campgrounds/:id/comments/new", common.isLoggeIn, function (req, res) {
    Campground.findOne({_id: req.params.id}).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("campgrounds/comments/new.ejs", {campground: campground});
        }
    });
});

router.post("/campgrounds/:id/comments", common.isLoggeIn, function (req, res) {
    Campground.findOne({_id: req.params.id}).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log("error:", err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log("error:", err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});


module.exports = router;