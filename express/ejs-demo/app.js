var express = require("express");
var ejs = require("ejs");

var app = express();
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.get("/question/:answer", function (req, res) {
    var answer = req.params.answer;
    res.render("fall.ejs", {answer: answer});
});

app.get("/posts", function (req, res) {
    var posts = [
        {author: "John Doe", title: "Why EJS sucks"},
        {author: "Kirk Smith", title: "NodeJS brings light to JS development"},
    ];

    res.render("posts.ejs", {posts: posts});
});

app.listen(3000, function () {
    console.log("server is listening");
});