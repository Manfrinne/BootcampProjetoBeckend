const express = require('express');
const nunjucks = require('nunjucks');

const videos = require('./data')

const server = express();

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server
});

server.get("/", function(req, res) {
    return res.render("about")
});

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", {itens: videos})
});

server.listen(5000, function() {
    console.log("I'm a Fullstack Developer, Mother fucker!")
});