const express = require("express");
const https = require("https");
require("dotenv").config();
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var url = "";
var city = "Tetouan";
var units = "metric";
var apikey = process.env.API_KEY;
var object = {};
const time = new Date();
const date = time.toDateString().slice(0, 10);

console.log(process.env.API_KEY);
app.get("/", (req, res) => {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${units}`;
  console.log(url);
  https.get(url, (response) => {
    response.on("data", (data) => {
      object = JSON.parse(data);
      console.log(object);
      if (object.cod == 200) {
        const temp = Math.floor(object.main.temp);
        const max = Math.floor(object.main.temp_max);
        const min = Math.floor(object.main.temp_min);
        const icon = object.weather[0].icon;
        const description = object.weather[0].description;
        res.render("index", {
          name: city,
          temp: temp,
          max: max,
          min: min,
          icon: icon,
          description: description,
          date: date,
        });
      } else {
        city = "Tetouan";
        res.redirect("/");
      }
    });
  });
});

app.post("/", (req, res) => {
  city = req.body.city;
  res.redirect("/");
});

app.listen(3000, (err) => console.log(err || "Listening on port 3000"));
