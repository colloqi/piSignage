'use strict';

var path = require('path');

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
    var stripped = req.url.split('.')[0];
    var requestedView = path.join('./', stripped);
    res.render(requestedView, function(err, html) {
        if(err) {
            res.send(404);
        } else {
            res.send(html);
        }
    });
};

/**
 * Send our single page app
 */
exports.index = function(req, res) {
    console.log('serving default page');
    if (req.device.type == 'phone')
        res.render('index-mobile');
    else
        res.render('index-pc');
};
