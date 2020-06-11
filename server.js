const express = require('express');
const nunjucks = require('nunjucks');

const videos = require('./data')

const server = express();

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
});

server.get("/", function(req, res) {

    const about = {
        avatar_url: "https://img.youtube.com/vi/iyAyN3GFM7A/maxresdefault.jpg",
        name: "Manfrinne Ferreira",
        role: "Desenvolvedor de Sistema",
        description: 'Programador Fullstack, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua <a href="https://rocketseat.com.br/" target="_blank">Rocketseat',
        links: [
            {name: "Twitter", url: "https://twitter.com/@Manfrinne_r00t"},
            {name: "GitHub", url: "https://github.com/Manfrinne"},
            {name: "Linkein", url: "https://www.linkedin.com/in/manfrinne-ferreira-6033121a7/"},
        ],
    };

    return res.render("about", {about});
});

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", {itens: videos})
});

server.listen(5000, function() {
    console.log("I'm a Fullstack Developer!")
});