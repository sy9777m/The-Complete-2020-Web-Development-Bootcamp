const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');


});

app.post('/', function (req, res) {
    const query = req.body.cityName;
    const apiKey = 'eac20969167f1aa51981b9b40df86665';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=matric';
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on('data', function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;            
            const iconUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            res.write('<h1>The weather is currently ' + description + '.</h1>');
            res.write('<h1>The temperature in ' + query + ' is ' + temp + ' degree Celcius.</h1>');
            res.write('<img src="' + iconUrl + '">');
            res.send();
          })
    });
});

app.listen(3000, function () {
    console.log('Server is running on port 3000.')
});