// server need to add the folder based on corporate and group. leads to creation of secret, then read the folder secret read only.
// Send the read only secret to client. Did it manually on line no 23.
// Client adds the folder with this secret. Sync should start.

var BTSync = require('bittorrent-sync');

var btsync = new BTSync({
    host: 'localhost',
    port: 8888,
    username: 'api',
    password: 'secret',
    timeout: 10000
});

btsync.getFolders(function(err, data) {
    if (err) throw err;
    console.log(data);


});

/*
 btsync.getSecrets({
 secret:"AS5QO4KYQ423DIKOHPA3HDWJIKDS6ZKCT"
 }, function(err, result) {
 console.log(err);
 console.log(result);

 btsync.getFiles({
 secret:result.read_only;
 }, function(err, result) {
 console.log(err);
 console.log(result);

 });
 });
 */

btsync.addFolder({
    dir:'/home/pi/btsynctest1',
    secret:'ASZDQ4BBXMTQ3IYFOB437WCO74ER5SGBO'
}, function(err, data) {
    if (err) console.log( err);
    console.log(data);
});
