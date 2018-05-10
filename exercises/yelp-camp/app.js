var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:32772/yelp-camp');

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// schema
var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

var campgrounds = [
    {name: "Paradise Campground", image: "/img/paradise_campground.jpg"},
    {name: "Difficult Campground", image: "/img/difficult_campground.jpg"},
    {name: "White River", image: "/img/white_river.jpg"},
    {name: "Shady Brook Campground", image: "/img/shady_brooks_campground.jpg"},
    {name: "The Lantern Resort", image: "/img/lantern_resort_campground.jpg"},
];

// campgrounds.forEach(function (value) {
//     var cg = new Campground({name: value.name, image: value.image});
//     cg.save(function (err, res) {
//         if (err) {
//             console.log("Error:", err);
//         } else {
//             console.log("Campground saved ", res);
//         }
//     })
// })

app.get("/", function (req, res) {
    res.render("landing.ejs");
});

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("campgrounds.ejs", {campgrounds: campgrounds});
        }
    });
});

app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds_new.ejs");
});

app.get("/campgrounds/:id", function (req, res) {
    Campground.findOne({_id: req.params.id}, function (err, campground) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("campgrounds_show.ejs", {campground: campground});
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

// app.get("/campgrounds/:id", function (req, res) {
//     Campground.find({id: req.params.id}, function (err, res) {
//         // if (err) {
//         //     console.log("error:", err);
//         // } else {
//         //     res.send("show page");
//         // }
//     });
// });

app.listen(3000, function () {
    console.log("server is listening");
});