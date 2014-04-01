'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config'),
    passport = require('passport'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    device = require('express-device');

//CORS middleware  , add more controls for security like site names, timeout etc.
var allowCrossDomain = function (req, res, next) {

    //instantiate allowed domains list
    //var allowedDomains = [
    //'http://YOUR_DOMAIN.com',
    //'https://YOUR_DOMAIN.com'
    //];
    //check if request origin is in allowed domains list
    //if(allowedDomains.indexOf(req.headers.origin) != -1) {}

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

/**
 * Express configuration
 */
module.exports = function (app) {
    app.set('showStackError', true);

    //CORS related  http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
    app.use(allowCrossDomain);

    app.configure('development', function () {
        //app.use(require('connect-livereload')());

        // Disable caching of scripts for easier testing
        app.use(function noCache(req, res, next) {
            if (req.url.indexOf('/scripts/') === 0) {
                res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.header('Pragma', 'no-cache');
                res.header('Expires', 0);
            }
            next();
        });

        app.use(express.errorHandler());
        app.locals.pretty = true;
        app.locals.compileDebug = true;
    });

    app.configure('production', function () {
        app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    });

    app.configure(function () {

        app.use(express.static(path.join(config.root, 'public')));

        app.set('view engine', 'jade');
        app.locals.basedir = config.viewDir; //for jade root

        app.set('views', config.viewDir);

        app.use(express.logger('dev'));
        app.use(express.bodyParser({uploadDir: config.uploadDir}));
        app.use(express.methodOverride());

        //express-device detection, value in req.device
        app.use(device.capture());

        app.use(express.cookieParser());

        // Persist sessions with mongoStore
        app.use(express.session({
            secret: config.session.secret,
            store: new mongoStore({
                url: config.mongo.uri,
                collection: 'sessions'
            })
        }));

        app.use(flash());

        //use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        // Router needs to be last
        app.use(app.router);

        // custom error handler
        app.use(function (err, req, res, next) {
            if (~err.message.indexOf('not found')) return next()
            console.error(err.stack)
            res.status(500).render('500')
        })

        app.use(function (req, res, next) {
            res.status(404).render('404', { url: req.originalUrl })
        })
    });
};