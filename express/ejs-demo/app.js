var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.get("/question/:answer", function (req, res) {
    var answer = req.params.answer;
    res.render("fall.ejs", {answer: answer});
});

var posts = [
    {author: "John Doe", title: "Why EJS sucks"},
    {author: "Kirk Smith", title: "NodeJS brings light to JS development"},
];

app.get("/posts", function (req, res) {
    res.render("posts.ejs", {posts: posts});
});

app.post("/posts/add", function (req, res) {
    posts.push({author: req.body.name, title: req.body.title });
    res.redirect("/posts");

});

app.listen(3000, function () {
    console.log("server is listening");
});