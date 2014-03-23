'use strict';

var config = require('../config'),
    viewer = require('./viewer'),
    exec = require('child_process').exec,
    fs= require('fs'),
    rest= require('./restware'),
    path = require('path'),
    _= require('underscore');


var rhGlobals = {
        playlistOn:         false,
        currentPlaylist:    null,
        playlistStarttime:  null,
        diskSpaceUsed:      null,
        diskSpaceAvailable: null,
        lastUpload:         null,
        duration:           0           //only useful while sending
    }

var validFile = function(file){
    return (file.charAt(0) != '_' && file.charAt(0) != '.');
}

var getDiff= function(starttime){
    return (Date.now() - starttime) / 1000;         
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
        rhGlobals.diskSpaceAvailable = Math.floor(strings[strings.length-3]/1000000)+' MB';
        rhGlobals.lastUpload = Date.now();
        writeToConfig();
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
    var file= config.mediaDir+"/"+req.param('file');
    if (req.param('file')) {
        fs.exists(file, function (exists) {
            if(exists){
                fs.unlink(file, function(err){
                    updateDiskStatus();
                    (err)? rest.sendError(res, "Unable to delete file!") : rest.sendSuccess(res, "File Deleted");
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
    var oldpath= config.mediaDir+"/"+oldname,
        newpath= config.mediaDir+"/"+newname;
    
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
        template='';
    if(data.imagepath){
        template= '<div class="media">'+
            '<a class="pull-right" href="#">'+
            '<img class="media-object" style="width:auto; height: 150px" src="'+
            data.imagepath +'">'+
            '</a>'+
            '<div class="media-body">'+
            '<h4 class="media-heading"></h4> '+
            data.description+
            ' </div>'+
            '</div>';
    }else{
        template= '<div><p>'+data.desecription+'</p></div>';
    }
    var pagedata= '<h1> '+ data.title +' </h1> '+ template;

    var noticejson= {
        filename: data.filename,
        title: data.title,
        description: data.description,
        image: data.imagepath || ''
    };

    fs.writeFile(config.mediaDir+"/"+data.filename+'.html', pagedata, 'utf8', function(err){
        if(err){
            rest.sendError(res, err)
        }else{
            updateDiskStatus();
            rest.sendSuccess(res, 'Notice File Saved', { file: data.filename+'.html' });
            fs.writeFile(config.mediaDir+"/_"+data.filename+'.json',
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
        rhGlobals.playlistOn = true;
        if (req.params['playlist'] != 'default') {
            rhGlobals.currentPlaylist = config.mediaPath+req.params['playlist'];
        } else {
            rhGlobals.currentPlaylist = config.defaultPlaylist;
        }
        var files = JSON.parse(fs.readFileSync(rhGlobals.currentPlaylist,'utf8'));

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

    if (req.body.stop) {
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

//read the last config on poweron and start play if necessary
var cfgdata = JSON.parse(fs.readFileSync(config.poweronConfig));
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
    }
}

