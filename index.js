var express = require('express');
var cors = require('cors-express');
var bodyParser = require('body-parser');
var fs = require('fs');
var parser = require('xml2json');
var request = require('request');
var config = require('./config.json');
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(config.server.port);
console.log('listen on ' + config.server.address + ':' + config.server.port)

app.get('/hi', function(req, res) {
    res.json('hi yourself :-)');
});


app.get('/', function(req, res) {
    var ret = [];
    for (var i = 0; i < config.dataServers.length; i++) {
        ret.push({
            id: config.dataServers[i].id,
            url: config.server.address + ':' + config.server.port + '/fetch/' + config.dataServers[i].id
        })
    }
    res.json(ret);
});
app.get('/data-servers', function(req, res) {
    res.json(config.dataServers);
});



app.get('/fetch/:serverId', function(req, res) {
    var dataServer = config.dataServers.filter(function(v) {
        return v.id == req.params.serverId;
    });
    if (dataServer.length === 0) {
        res.status(500).json("serverId is not available.");
        return;
    }
    dataServer = dataServer[0];
    request({
        method: dataServer.method,
        url: dataServer.url,
    }, function(error, response, body) {
        if (error) {
            res.status(500).json("the " + dataServer.id + " server does not answer!");
            console.log(error);
            return;
        }
        switch (dataServer.dataType) {
            case 'json':
                if (typeof body == 'string') {
                    body = JSON.parse(body);
                }
                res.status(200).json(body);
                return;
            case 'xml':
                body = JSON.parse(parser.toJson(body));
                res.status(200).json(body);
                return;
            case 'text':
                res.status(200).json(body);
                return;
            default:
                res.status(500).json("the " + dataServer.id + " server dataType config does not correct!");
                return;
        }
    });



    //res.json(config.dataServers);
});