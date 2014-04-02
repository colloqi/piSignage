//var parseSignedCookie = require('express/node_modules/connect').utils.parseSignedCookie,
//    cookie = require('express/node_modules/cookie'),
//    sessionConfig = require('../../config/express').sessionConfig();
//session_store = sessionConfig.store;

var iosockets = null;     //holds all the clients io.sockets

var handleClient = function(socket) {

    socket.on('status', function(settings,status) {
        settings.ip = socket.handshake.address.address;
        console.log(settings);
        console.log(status);
    });

    socket.on('disconnect', function () {
        console.log("disconnect event");
    });

};

//authorization module
//var authorize= function(data, callback){
//    // check if there's a cookie header
//    if (data.headers.cookie) {
//        data.cookie = cookie.parse(data.headers.cookie);
//        data.sessionId = parseSignedCookie(data.cookie['connect.sid'], sessionConfig.secret);
//        data.colloqi = data.cookie['colloqi'];      //visitor cookie
//
//        session_store.get(data.sessionId, function (err, session) {
//            if (err || !session) {
//                // if we cannot grab a session, turn down the connection
//                data.user= null;
//                callback(null, true);
//            }
//            else {
//                if (session.passport.user && session.passport.user.id){
//                    data.user= session.passport.user;
//                    callback(null, true);
//                }
//                else {
//                    console.log('assigning default name,user not found');
//                    data.user= null;
//                    callback(null, true);
//                }
//            }
//        });
//    }
//    else {
//        // if there isn't, turn down the connection with a message
//        // and leave the function.
//        console.log('socket.io authentication: assigning default name,cookie not found');
//        data.user= null;
//        callback(null, true);
//    }
//};

exports.startSIO = function(io) {
    //io.set('authorization', authorize);
    io.sockets.on('connection', handleClient);
    io.set('log level', 1);
    iosockets = io.sockets;
    //setInterval(sendUpdates,2000);
}

exports.emitMessage = function(sid,cmd, msg) {
    iosockets.sockets[sid].emit(cmd, msg);
}
