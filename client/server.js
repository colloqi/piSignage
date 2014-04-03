/**
 * Module dependencies
 */

var express = require('express');

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

    app.post('/play/playlists/:playlist', routes.playPlaylist);

    app.post('/play/playfiles/:playfile', routes.playFile);

    app.get('/files', routes.mediaList);
    app.get('/files/:file', routes.fileDetails);
    app.post('/files', routes.fileUpload);
    app.post('/files/:file', routes.fileRename);
    app.delete('/files/:file', routes.fileDelete);

    app.post('/playlists', routes.savePlaylist);
    app.get('/playlists', routes.getPlaylists);
    app.post('/playlists/:file', routes.createPlaylist);
    //app.post('/playlists/:file');//file so update    

    app.get('/notice/:file', routes.fileDetails);
    app.get('/status', routes.getStatus);
    app.post('/notice/save', routes.noticeSave);
    app.delete('/notice/:file', routes.fileDelete);

    app.get('/settings', routes.getSettings);
    app.post('/settings', routes.saveSettings);

    app.get('*', function(req, res){
        res.render('index');
    })
}
