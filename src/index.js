const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let formular =
    "<h1> Zadejte jmono postavy ze StarWars: </h1><form action='/' method='post'>";
  formular += "<input type='text' name='name' />";
  formular += "<button type='submit' name='submit'>Fesh</button></form>";
  res.send(formular);
});

app.post("/", (req, res) => {
  let name = req.body.name;
  let encoded = encodeURIComponent(name);
  var options = {
    url: `https://swapi.co/api/people/?search=` + encoded,
    method: "GET"
  };

  request(options, (error, repsonse, body) => {
    let data = JSON.parse(body);
    if (data.count > 0) {
      res.send(
        "<h2> Jmeno: " +
          data.results[0].name +
          "</h2>" +
          "<h2> Vyska: " +
          data.results[0].height +
          "</h2>" +
          "<h2> Hmotnost: " +
          data.results[0].mass +
          "</h2>" +
          "<h2> Gender: " +
          data.results[0].gender +
          "</h2>"
      );
    } else {
      res.send("<h1> Hledane jmeno neni v databazi </h1>");
    }
  });
});

app.listen(8080, () => {
  console.log("Server běží na portu 8080");
});
