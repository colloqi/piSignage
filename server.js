/**
 * Module dependencies
 */

var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    _= require('underscore');

var config = require('./config'),
    routes = require('./lib/route_handlers');

var app = express();

app.use(allowCrossDomain);

app.use('/media',express.static(config.root + '/media'))
app.use(express.static(config.root + '/public'))

app.set('view engine', 'jade')

app.set('views', config.root + '/views');

app.configure(function () {

    // bodyParser should be above methodOverride
    app.use(express.bodyParser({uploadDir:config.mediaDir}))
    app.use(express.methodOverride())

    // routes should be at the last
    app.use(app.router)

    // custom error handler
    app.use(function (err, req, res, next) {
        if (~err.message.indexOf('not found')) return next()
        console.error(err.stack)
        res.status(500).render('500')
    })

    app.use(function (req, res, next) {
        res.status(404).render('404', { url: req.originalUrl })
    })

})


addRoutes(app);


//var io = socketio.listen(server);

app.listen(config.port, function() {
    console.log("Express server listening on port " + config.port);
});

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, X-Requested-With,origin,accept');

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
}

function addRoutes(app) {
    app.get('/media-list', routes.mediaList);
    app.post('/file-upload', routes.fileUpload);
    app.get('/indicator', routes.indicator);    
    app.get('/file-detail', routes.fileDetail);    
    app.post('/file-delete', routes.fileDelete);    
    app.get('/file-rename', routes.fileRename);    
    app.post('/file-playlist', routes.filePlaylist);
    app.post('/notice-save', routes.noticeSave);
    app.post('/playlists/:playlist', routes.playPlaylist);
    app.post('/playfiles/:playfile', routes.playFile);
}
