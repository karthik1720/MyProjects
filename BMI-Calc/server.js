const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function () {
    console.log("Server started");
});

app.get("/", function(req, res) {
   res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    var height = Number(req.body.input1);
    var weight = Number(req.body.input2);
    res.send("Your BMI is "+ bmiCalc(height, weight));
} );

function bmiCalc(height, weight) {
      result = height/ (weight*weight);
      return Math.round(result*10)/10;
}