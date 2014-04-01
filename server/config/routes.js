'use strict';

var index   = require('../app/controllers/index'),
    users   = require('./../app/controllers/users'),
    session = require('./../app/controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

    // Server API Routes
    //app.get('/api/awesomeThings', api.awesomeThings);
  
    app.post('/api/users', users.create);
    app.put('/api/users', users.changePassword);
    app.get('/api/users/me', users.me);
    app.post('/api/users/me', users.updateMyRecords);
    app.get('/api/users/:id', users.show);

    app.post('/api/session', session.login);
    app.del('/api/session', session.logout);


    // All other routes to use Angular routing in public/app/js/appMobile.js
    app.get('/partials/*', index.partials);
    
    app.get('/*', middleware.setUserCookie, index.index);
};