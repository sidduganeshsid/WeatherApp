//
const { log } = require("console");
const express = require("express");
const bodyParser = require("body-parser");
//it is native node module
const https = require("https");
const { dirname } = require("path");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    //console.log(req.body.cityName);name of the input

    const appid = "e3b3a83279f9ee6ddbe17965dd829c29";
    const cityName = req.body.cityName;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+appid+"&units="+units;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            //console.log(data);
            const weatherData=JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
           
            res.write("<p>Results for "+"<strong>"+cityName+"</strong><br>");
            res.write("<img src="+imageURL+">");
            res.write("<p>The Weather is currently "+weatherDescription+"</p>");
            res.write("<h1>The temperature in "+cityName+" is "+temp+" degree Celcius.</h1>");
 
            res.send();
        });
    });
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on the port 3000");
});
