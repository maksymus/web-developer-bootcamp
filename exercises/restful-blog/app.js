var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var methodOverride = require("method-override");

mongoose.connect('mongodb://localhost:32772/restful-blog');

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

var blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// var blogs = [
//     {title: "Test Blog", image: "/img/placeholder.jpg", body: "Hello this is a blog post"}
// ];
//
// blogs.forEach(function (blog) {
//     var cg = new Blog({title: blog.title, image: blog.image, body: blog.body});
//     cg.save(function (err, res) {
//         if (err) {
//             console.log("Error:", err);
//         } else {
//             console.log("blog saved ", res);
//         }
//     })
// });

app.get("/", function (req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("blogs.ejs", {blogs: blogs});
        }
    });
});

app.get("/blogs/new", function (req, res) {
    res.render("blogs_new.ejs");
});

app.post("/blogs", function (req, res) {
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            console.log("error:", err);
        } else {
            res.redirect("/blogs");
        }
    })
});

app.get("/blogs/:id", function (req, res) {
    Blog.findOne({_id: req.params.id}, function (err, blog) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("blogs_show.ejs", {blog: blog});
        }
    });
});

app.get("/blogs/:id/edit", function (req, res) {
    Blog.findOne({_id: req.params.id}, function (err, blog) {
        if (err) {
            console.log("error:", err);
        } else {
            res.render("blogs_edit.ejs", {blog: blog});
        }
    });
});

app.put("/blogs/:id", function (req, res) {
    Blog.findOneAndUpdate({_id: req.params.id}, req.body.blog, function (err, blog) {
        if (err) {
            console.log("error:", err);
        } else {
            res.redirect("/blogs/" + blog.id);
        }
    });
});

app.delete("/blogs/:id", function (req, res) {
    Blog.findOneAndRemove({_id: req.params.id}, req.body.blog, function (err, blog) {
        if (err) {
            console.log("error:", err);
        } else {
            res.redirect("/blogs/");
        }
    });
})

app.listen(3000, function () {
    console.log("server is listening");
});