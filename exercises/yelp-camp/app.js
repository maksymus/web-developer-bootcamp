var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// mongodb://web-dev:Welcome@123@ds115740.mlab.com:15740/yelp-camp

var campgrounds = [
    {name: "Paradise Campground", image: "/img/paradise_campground.jpg"},
    {name: "Difficult Campground", image: "/img/difficult_campground.jpg"},
    {name: "White River", image: "/img/white_river.jpg"},
    {name: "Shady Brook Campground", image: "/img/shady_brooks_campground.jpg"},
    {name: "The Lantern Resort", image: "/img/lantern_resort_campground.jpg"},
];

app.get("/", function (req, res) {
    res.render("landing.ejs");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds.ejs", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds_new.ejs");
});

app.post("/campground", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;

    campgrounds.push({name: name, image: image});

    res.redirect("/campgrounds");
});

app.listen(3000, function () {
    console.log("server is listening");
});