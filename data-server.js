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
        calls: 12
    }));
});
app.get('/data.json', function(req, res) {
    res.json({
        calls: 12
    });
});
app.post('/data.txt', function(req, res) {
    var num = parseInt(Math.random() * 100);
    res.send(num.toString());
});
app.post('/array', function(req, res) {
    var ret = [];
    for( var i = 0; i < 4; i++ ){
        ret.push( parseInt(Math.random() * 100) );
    }
    res.json(ret);
});
app.post('/queues', function(req, res) {
    var ret = ['0121','0122','0123','0128'];
    res.json(ret);
});
app.post('/jq-plot', function(req, res) {
    var ret = require('./jq-plot-example.json');
    res.json(ret);
});

app.get('/data-servers', function(req, res) {
    res.json(config.dataServers);
});