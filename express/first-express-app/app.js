var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/topic/:name', function(req, res) {
    res.send("Viewing topic: " + req.params.name);
});

app.get('*', function(req, res) {
    res.send('no route defined');
});

app.listen(3000);