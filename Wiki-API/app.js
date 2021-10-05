const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/wikiDB',  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model('Article', articleSchema);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.route('/articles')
    .get(function (req, res) {
        Article.find({}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    })
    .post(function (req, res) {

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.send('successfully added a new article.');
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany({}, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.send(('successfully deleted all documents'));
            }
        });
    });

app.route('/articles/:articleTitle')
    .get(function (req, res) {

    Article.findOne({title: req.params.articleTitle}, function (err, result) {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})
    .put(function (req, res) {
        Article.updateOne({title: req.params.articleTitle},
            {title: req.body.title,
            content: req.body.content},
            {overwrite: true}, function (err) {
            if(err) {
                console.log(err);
            } else {
                res.send('successfully updated');
            }
        });
})
    .patch(function (req, res) {
        Article.updateOne({title: req.params.articleTitle},
            {$set: req.body},
            function (err) {
                if(err) {
                    console.log(err);
                } else {
                    res.send('successfully updated');
                }
            });
})
    .delete(function (req, res) {
    Article.deleteOne({title: req.params.articleTitle}, function (err) {
        if(err) {
            console.log(err);
        } else {
            console.log('successfully deleted');
        }
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});