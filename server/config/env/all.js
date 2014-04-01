'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    uploadDir: rootPath + '/media',
    viewDir: rootPath + '/app/views',

    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },
    session: {
        secret: 'piSignage'
    }
};
