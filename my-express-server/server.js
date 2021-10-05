const express = require('express');

const app = express();

app.get('/', function (req, res) {
    res.send('<h1>Hello, world!</h1>');
});

app.get('/contact', function (req, res) {
    res.send('Contact me at: mintaesik7@gmail.com');
});

app.get('/about', function (req, res) {
    res.send("I'm a full stack developer.");
});

app.get('/hobbies', function (req, res) {
    res.send('<ul><li>Coffee</li><li>Code</li><li>Beer</li></ul>')
});

app.listen(3000, function () {
    console.log('server started on port 3000.');
});