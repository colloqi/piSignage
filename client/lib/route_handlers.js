'use strict';

var config = require('../config'),
    viewer = require('./viewer'),
    exec = require('child_process').exec,
    fs= require('fs'),
    rest= require('./restware'),
    path = require('path'),
    _= require('underscore'),
    jade = require('jade'),
    os = require('os');


var rhGlobals = {
        playlistOn:         false,
        currentPlaylist:    null,
        playlistStarttime:  null,
        diskSpaceUsed:      null,
        diskSpaceAvailable: null,
        lastUpload:         null,
        duration:           null,
        tvStatus:           true
    },
    settings = {
        name:           "piSignage",
        description:    "This is placed in Bangalore Central"
    };

var validFile = function(file){
    return (file.charAt(0) != '_' && file.charAt(0) != '.');
}

var writeToConfig= function(){
    fs.writeFile(config.poweronConfig, JSON.stringify(rhGlobals, null, 4), function(err){
        if (err) throw err;
    })
}

var updateDiskStatus = function () {
    exec('df -h /').stdout.on('data',function(data){
        //console.log("the total usage" +data);
        var strings = data.replace(/\s{2,}/g, ' ').split(" ");
        rhGlobals.diskSpaceUsed = strings[strings.length-2];
        rhGlobals.diskSpaceAvailable = strings[strings.length-3];
    })
}

exports.mediaList = function(req,res){

    fs.readdir(config.mediaDir,function (err, data) {
        if (err){
            return rest.sendError(res, "Error reading media directory: "+err)
        } else {
            var files = data.filter(validFile);
            if (req.query['withplaylist'] && fs.existsSync(config.defaultPlaylist)) {
                fs.readFile(config.defaultPlaylist, 'utf8', function (err, data) {
                    var plitems = JSON.parse(data),
                        plfiles = [];
                    if (err || !plitems || files.length == 0){
                        return rest.sendSuccess(res, "Could not read playlist: "+err,files)
                    } else {                       
                        for (var key in plitems) {
                            plfiles.push(plitems[key].filename);
                        }
                        
                        for (var i= 0,len=files.length;i<len;i++) {
                            if (plfiles.indexOf(files[i]) == -1) {
                                plitems.push({filename: files[i], duration: 10, selected: false});
                            }
                        }
                        
                        for (var i= 0,len=plitems.length;i<len;i++) {
                            if ((files.indexOf(plitems[i].filename) == -1) && (plitems[i].selected)) {
                                plitems[i].deleted = true;
                            }
                        }
                    return rest.sendSuccess(res, "Sending loaded Playlist: ",plitems);
                    }
                })
            } else {
                return rest.sendSuccess(res, "Sending media directory files: ",files)
            }

        }
    });
}

exports.playFile = function(req,res){
    if (req.body.play) {
        var err;
        if (req.params['playfile']) {
            err = viewer.startPlay({filename: req.params['playfile'],duration:100000});
        } else {
            err = "Nothing to Play";
        }

        if (err) {
            return rest.sendError(res,err);
        } else {
            return rest.sendSuccess(res,'Started playing file',rhGlobals);
        }
    }

    if (req.body.stop) {
        var err = viewer.stopPlay();
        rest.sendSuccess(res,'Stopped playing file',rhGlobals);
        return;
    }
}

exports.fileUpload = function(req, res){    
    var alldata=[], len=Object.keys(req.files).length;
    var origName= function(media, mediapath){
        fs.exists(mediapath, function (exists) {
            if(exists){
                var data= {
                    overwritten: true,
                    name: media.name
                }
                alldata.push(data);
            }else{
                var data= {
                    name: media.name,
                    path: media.path,
                    size: media.size,
                    type: media.type
                }
                alldata.push(data);
            }
            len--;
            if(!len) {
                rhGlobals.lastUpload = Date.now();
                writeToConfig();
                updateDiskStatus();
                rest.sendSuccess(res, "Uploaded files", alldata);
            }
        });
        fs.rename(media.path, mediapath, function(err){
            if(err) console.log(err);
        });
    }
    for(var key in req.files) {
        var media= req.files[key],
            mediapath= config.mediaDir+'/'+media.name;
        origName(media, mediapath);
    }
}

exports.fileDetails = function(req, res){
    var file= req.param('file'),
        ext= path.extname(file);
    
    if(ext == '.html'){
        var file= path.basename(file,'.html')+'.json';
        fs.readFile(config.mediaDir+"/_"+file, 'utf8', function (err, data) {
            if (err) console.log(err);
            rest.sendSuccess(res, 'html file detail', JSON.parse(data));            
        });
    }else{
        if (file != 'new') {
            var stats= fs.statSync(config.mediaDir+"/"+file),
            data= {
                name: file,
                size: ~~(stats.size/1000)+' KB',
                extension: ext
            };
            rest.sendSuccess(res, '', data);
        }        
    }
}
exports.fileDelete = function(req, res){
    var file= path.basename(req.param('file'),'.html'),
        filehtml= config.mediaPath+req.param('file'),
        filejson= config.mediaPath+"_"+file+".json";
    if (req.param('file')) {
        fs.exists(filehtml, function (exists) {
            if(exists){
                fs.unlink(filehtml, function(err){
                    updateDiskStatus();
                    if(err){
                        rest.sendError(res, "Unable to delete file!")
                    }
                    rest.sendSuccess(res, "File Deleted");
                    fs.exists(filejson, function (exists) {
                        if(err){
                           console.log(err);
                        }
                        fs.unlink(filejson, function(err){
                            if(err){
                                console.log(err);
                            }
                       });                            
                    });
                    
                })
            }else{
                rest.sendError(res, "File Not Found");
            }
        });
    }else{
        rest.sendError(res, "No file received");
    }
}
exports.fileRename = function(req, res){    
    var newname= req.param('file'),
        oldname= req.body.oldname;        
    var oldpath= config.mediaPath+oldname,
        newpath= config.mediaPath+newname;
    
    if (req.query) {
        fs.exists(oldpath, function (exists) {
            if(exists){
                fs.rename(oldpath, newpath, function (err) {
                    (err)? rest.sendError(res, 'Unable to rename file!'): rest.sendSuccess(res, 'File Renamed!');
                });
                fs.exists(config.defaultPlaylist, function (exists) {
                    if(exists){
                        fs.readFile(config.defaultPlaylist, 'utf8', function (err, data) {
                            if (err) console.log(err);
                            if(data.indexOf(oldname) != -1){
                                var write=  data.replace(oldname, newname);
                                fs.writeFile(config.defaultPlaylist, write, function (err) {
                                    if (err) console.log(err);
                                });
                            }
                        });
                    }else{
                        //'Playlist does not exist!';
                    }
                });
            }else{
                rest.sendError(res, "File Not Found");
            }
        });
    }
    else{
        rest.sendError(res, false, "No file name received");
    }
}
exports.filePlaylist =  function(req, res){
    fs.writeFile(config.defaultPlaylist,
        JSON.stringify(req.param('playlist'), null, 4),
        function(err) {
            (err)? rest.sendError(res, err): rest.sendSuccess(res, true, "File Saved");
        }
    );
}
exports.noticeSave = function(req, res){    
    var data= req.body.formdata,
        template= fs.readFileSync(config.defaultTemplate,'utf8');
        
    var options= {
        filename: 'noticecss.css',
        pretty: true,
        compileDebug: false
    }
    var fn= jade.compile(template, options),
        varobj= {
            title: data.title,
            description: data.description,
            image: data.image,
            footer: data.footer
        };
    var html= fn(varobj);
    var noticejson= {
        filename: data.filename,
        title: data.title,
        description: data.description,
        image: data.image || '',
        footer: data.footer || ''
    };

    fs.writeFile(config.mediaPath+data.filename+'.html', html, 'utf8', function(err){
        if(err){
            rest.sendError(res, err)
        }else{
            rhGlobals.lastUpload = Date.now();
            writeToConfig();
            updateDiskStatus();
            rest.sendSuccess(res, 'Notice File Saved', { file: data.filename+'.html' });
            fs.writeFile(config.mediaPath+"_"+data.filename+'.json',
                JSON.stringify(noticejson, null, 4), 'utf8', function(err){
                    if (err) {
                        console.log(err);
                    }
                });
        }
    });
}

exports.playPlaylist = function (req,res){

    if (req.body.play) {
        if (rhGlobals.playlistOn )
            return rest.sendError(res,"Already playing started");

        rhGlobals.playlistOn = true;
        if (req.params['playlist'] != 'default') {
            rhGlobals.currentPlaylist = config.mediaPath+req.params['playlist'];
        } else {
            rhGlobals.currentPlaylist = config.defaultPlaylist;
        }
        try {
            var files = JSON.parse(fs.readFileSync(rhGlobals.currentPlaylist,'utf8'));
        } catch (e) {
            return rest.sendError(res,"There seems to be no such playlist file: "+rhGlobals.currentPlaylist+";error="+ e.code);
        }

        var err = viewer.startPlay(files);
        if (err) {
            rhGlobals.playlistOn = false;
            return rest.sendError(res,err);
        } else {
            rhGlobals.playlistStarttime = Date.now();
            writeToConfig();
            rhGlobals.duration = 0;
            return rest.sendSuccess(res,'Started playlist',rhGlobals);
        }        
    }

    if (req.body.stop ) {
        if (!rhGlobals.playlistOn )
            return rest.sendError(res,"Already playing stopped");

        rhGlobals.playlistOn = false;
        var err = viewer.stopPlay();
        rhGlobals.playlistStarttime = null;
        rhGlobals.duration = Date.now() - rhGlobals.playlistStarttime;;
        rest.sendSuccess(res,'Stopped playlist',rhGlobals);
        rhGlobals.currentPlaylist = null;
        writeToConfig();
        return;
    }
}

exports.getStatus = function(req, res){
    rhGlobals.duration = Date.now() - rhGlobals.playlistStarttime;
    return rest.sendSuccess(res, 'Status Check', rhGlobals);
}

updateDiskStatus();
//read the last config on poweron and start play if necessary
fs.readFile ( config.poweronConfig,'utf8', function(err,data){
    if (!err) {
        try {
            var cfgdata = JSON.parse(data);
        } catch(e) {
            fs.unlink(config.poweronConfig);    //corrupt file
        }
        if (cfgdata) {
            rhGlobals = cfgdata;
            if (rhGlobals.playlistOn) {

                var files = JSON.parse(fs.readFileSync(rhGlobals.currentPlaylist,'utf8'));

                var err = viewer.startPlay(files);
                if (err) {
                    rhGlobals.playlistOn = false;
                    rhGlobals.playlistStarttime = null;
                    rhGlobals.currentPlaylist = null;
                } else {
                    rhGlobals.playlistStarttime = Date.now();
                }
            } else {
                rhGlobals.playlistStarttime = null;
                var ipdata= os.networkInterfaces(), ipaddress, html;
                for(var key in ipdata){
                    var interfaces= ipdata[key];
                    for(var key in interfaces){
                        var target= interfaces[key];
                        if(target.family == 'IPv4' && !target.internal) ipaddress= target.address;
                    }
                }                
                html= jade.compile(fs.readFileSync('./views/emptynotice.jade','utf8'))({ ipaddress: ipaddress || null});
                fs.writeFile('./media/_emptynotice.html', html, function(err){
                    if (err) console.log(err);
                    viewer.startPlay([{filename: '_emptynotice.html',duration:100000}]);
                })                
            }
        }
    } else {
        console.log("there seems to be no _config.json file: "+err);
    }
    sendSocketIoStatus();
});


//Socket.io based server communication
var io = require('socket.io-client'),
    socket = io.connect("http://www.ariemdev.com:3000");              //add server address

socket.on('connect', function () {
    // socket connected
    console.log("socket.io: connected to server");
    sendSocketIoStatus();
    socket.on('status', function () {
        // socket connected
        sendSocketIoStatus();
    });
    setInterval(function(){
        sendSocketIoStatus();
    },60000)
});


function sendSocketIoStatus () {
    if (!socket)
        return;
    rhGlobals.duration = Date.now() - rhGlobals.playlistStarttime;
    socket.emit('status', settings, rhGlobals);
}



