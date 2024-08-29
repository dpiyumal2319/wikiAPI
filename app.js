//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title: String,
    content: String,
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
    .get((req, res) => {
        Article.find({})
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            });
    })
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
        });

        newArticle
            .save()
            .then(() => {
                res.send("Successfully saved article");
            })
            .catch((err) => {
                res.send(err);
            });
    })
    .delete((req, res) => {
        Article.deleteMany({})
            .then(() => {
                res.send("Successfully deleted all articles");
            })
            .catch((err) => {
                res.send(err);
            });
    });

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
