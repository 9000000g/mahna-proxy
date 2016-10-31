var express = require('express');
var cors = require('cors-express');
var bodyParser = require('body-parser');
var fs = require('fs');
var xml = require('xml');
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(9100);

app.get('/data.xml', function(req, res) {
    res.send(xml({
        foo: 'bar'
    }));
});
app.get('/data.json', function(req, res) {
    res.json({
        foo: 'bar'
    });
});
app.post('/data.txt', function(req, res) {
    var num = parseInt(Math.random() * 100);
    res.send(num.toString());
});

app.get('/data-servers', function(req, res) {
    res.json(config.dataServers);
});