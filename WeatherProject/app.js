const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html");
});


app.post("/", function(req, res) {
    console.log(req.body.cityname);
    weatherFinder(req.body.cityname, res);
});


app.listen(3000, function () {
    console.log("Listening to 3000");
});


function weatherFinder(city, res) {
    const apikey = "59bf90d4f08e57a3cbd1f4949d4b2088";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + apikey + "&units="+ units;
    https.get(url, function(response) {
        response.on("data", function(data) {
            const datas = JSON.parse(data);
            const temp = datas.main.temp;
            const des = datas.weather[0].description;
            const icon = datas.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
            res.write("<h1>The temperature in "+city+" is "+temp+" degree celsius</h1>");
            res.write("<p>The weather condition is "+des+"</p>");
            res.write("<img src="+iconURL+">");
            res.send();
        });
    });
}




    
    

//     https.get(url, function(response){
//         response.on("data", function(data) {
//             const dataS = JSON.parse(data);
//             const temp = dataS.main.temp;
//             const des = dataS.weather[0].description;
//             const icon = dataS.weather[0].icon;
//             "http://openweathermap.org/img/w/" + icon + ".png";
//             console.log(temp);
//             res.write("<h1>The temperature in london is "+temp+" degree celsius</h1>");
//             res.write("The weather condition is "+des);
//             const url1 = "http://openweathermap.org/img/w/" + icon + ".png";
//             res.write("<img src="+url1+">");
//             res.send();
//         })
//         console.log("Status is "+response.statusCode);
//     });