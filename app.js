//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB');

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
    Article.find({}).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
})

app.post("/articles", (req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save().then(() => {
        console.log("Successfully saved article");
        res.send("Successfully saved article");
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
});

app.delete("/articles", (req, res) => {
    Article.deleteMany({}).then(() => {
        console.log("Successfully deleted all articles");
        res.send("Successfully deleted all articles");
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});