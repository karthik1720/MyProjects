const express = require('express');
const app = express();

const ejs = require('ejs');
app.set('view engine', 'ejs');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { listen } = require('express/lib/application');
const req = require('express/lib/request');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//=============================================
app.route("/articles")
.get(function (req, res) {
    Article.find(function(err, artRes) {
        if(!err)
        res.send(artRes);
        else
        res.send(err);
    });
})

.post(function(req, res) {
    // console.log(name);
    // console.log(content);   
    const newArticle = new Article({
        name: req.body.name,
        content: req.body.content
    }); 
    newArticle.save(function(err) {
        if(!err)
        res.send("Successful");
        else
        res.send("Failed");
    });
})


.delete(function(req,res) {
    Article.deleteMany(function (err) {
        if(!err)
        res.send("Successful");
        else
        res.send("Failed");
    });
});
//===========================================
app.route("/articles/:articleTitle")

.get(function(req, res){
    
    Article.findOne({name: req.params.articleTitle}, function(err, foundArticle){
if (foundArticle) {
    res.send(foundArticle);
} else {
    res.send("No article found");
}
    });
})

.put(function(req,res){
    Article.updateOne(
        {name: req.params.articleTitle},
        {name: req.body.name, content: req.body.content},
        
        function(err){
            if (!err) {
                res.send("Updated");
            }
        }
    )
})
.patch(function(req, res){
    Article.updateOne(
        {name: req.params.articleTitle},
        {$set:req.body},
        
        function(err){
            if (!err) {
                res.send("Updated");
            }
        }
    )
})
.delete(function(req, res){
    Article.deleteOne(
        {name: req.params.articleTitle},
        function(err){
            if (!err) {
                res.send("Deleted");
            }
        }
    )
});









//========================================
app.listen(3000, function(req, res) {
    console.log("connected to server");
})

//=========DB=========================
mongoose.connect('mongodb://localhost:27017/wikiDB')
const articleSchema = {
    name: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);