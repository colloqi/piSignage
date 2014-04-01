'use strict';

var express = require('express'),
    path    = require('path'),
    fs      = require('fs'),
    mongoose= require('mongoose'),
    socketio = require('socket.io');

/**
 * Main application file
 */

// Default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./config/config');

// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'app/models');
fs.readdirSync(modelsPath).forEach(function (file) {
    require(modelsPath + '/' + file);
});

// Populate empty DB with sample data
//require('./lib/config/dummydata');
  
// Passport Configuration
require('./config/passport')();

var app = express();

// Express settings
require('./config/express')(app);

// Routing
require('./config/routes')(app);

// Start server
var server;
if (config.https) {
    var https_options = {
        ca  : fs.readFileSync("/home/ec2-user/.ssh/ca-chain.crt"),
        key : fs.readFileSync("/home/ec2-user/.ssh/nodeims.key"),
        cert: fs.readFileSync("/home/ec2-user/.ssh/STAR_nodeims_com.crt")
    };
    server = require('https').createServer(https_options,app);

    // set up plain http server, redirect happens in route.js
    require('http').createServer(app).listen(80);

}
else {
    server = require('http').createServer(app);
}

var io = socketio.listen(server);

//Bootstrap socket.io
require('./app/controllers/socket').startSIO(io);

server.listen(config.port, function () {
    console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
//exports = module.exports = app;
module.exports = app;
