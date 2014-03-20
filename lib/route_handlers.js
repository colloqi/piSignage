'use strict';

var config = require('../config'),
    viewer = require('./viewer'),
    exec = require('child_process').exec,
    fs= require('fs'),
    rest= require('./restware'),
    path = require('path'),
    _= require('underscore');


var playlistOn = false,
    currentPlaylist,
    playlistStarttime;

var validFiles= function(files){
    var newfilelist=[];
    files.forEach(function(file){
        if(file.charAt(0) != '_') newfilelist.push(file);
    });
    return newfilelist;
}

var getDiff= function(starttime){
    return (Date.now() - starttime) / 1000;         
}

var startTimer= function(startfrom){
    startfrom= 0;
    var ss = Math.round(startfrom % 60);
    startfrom /= 60;
    var mn = Math.round(startfrom % 60);
    startfrom /= 60;
    var hh = Math.round(startfrom % 24);
    
    var interval= setInterval(function(){                    
        ss+=1;
        if(ss >= 60) {
            ss=0; mn+=1;
        }
        if(mn >= 60) {
            mn=0; hh+=1;
        }                    
        var h= (hh > 0)? ( (hh < 10)? " 0"+hh: hh ) + " Hour " : '';
        var m= (mn > 0)? ( (mn < 10)? " 0"+mn: mn ) + " Min." : '';
        var msg= (mn > 0 || hh > 0)? "": "Just Started!";
        var timerValue= msg + h + m;        
    }, 1000);                
}

exports.mediaList = function(req,res){
    var isplaylist= (req.query.cururl)? ~req.query.cururl.indexOf('playlist'): '',
        readDir= function(){
            fs.readdir(config.mediaDir,function (err, files) {
                if (err){
                    rest.sendError(res, "Error: "+err, [])
                } else {
                    res.contentType('json');
                    return res.json(
                        {
                            success: true,
                            stat_message: "Sending Media files list",
                            data: validFiles(files),
                            playStatus: { playingStatus: playlistOn }
                        }
                    );
                    //out(res, true, "Sending Media files list", validFiles(files));
                }
            })
        }
    if(fs.existsSync(config.defaultPlaylist) && isplaylist){
        fs.readFile(config.defaultPlaylist, 'utf8', function (err, data) {
            if(err) console.log("Error: "+err);
            data= JSON.parse(data);
            if(data){
                var playlistarr= [],
                    diskmedia,  playmedia;
                for(var key in data){
                    playlistarr.push(data[key].filename);
                }
                fs.readdir(config.mediaDir, function(err, files){
                    if(files){
                        diskmedia= _.difference(validFiles(files), playlistarr);
                        if (diskmedia.length) {
                            diskmedia.forEach(function(itm){
                                data.push({filename: itm, duration: 10, selected: false});
                            });
                        }
                        playmedia= _.difference(playlistarr, validFiles(files));
                        if (playmedia.length) {
                            playmedia.forEach(function(itm){
                                _.map(data, function(arritm){
                                    if (arritm.filename == itm) {
                                        arritm.deleted= true;
                                    }
                                })
                            });
                        }
                        //out(res, true, 'Loaded Playlist', data);
                        res.contentType('json');
                        return res.json(
                            {
                                success: true,
                                stat_message: 'Loaded Playlist!',
                                data: data,
                                playStatus: {
                                    playingStatus: playlistOn,
                                    since: getDiff(playlistStarttime),
                                    playlist: true
                                }
                            }
                        );
                    } else {
                        rest.sendError(res, 'No files in upload directory', []);
                    }
                });
            }else{
                readDir();
            }
        });
    }
    else{
        readDir();
    }
}

exports.playFile = function(req,res){
    if (req.body.play) {
        playlistOn = true;
        var err;
        if (req.params['playfile']) {
            err = viewer.startPlay({filename: req.params['playfile'],duration:100000});
        } else {
            err = "Nothing to Play";
        }

        if (err) {
            playlistOn = false;
            return rest.sendError(res,err);
        } else {
            playlistStarttime = Date.now();
            return rest.sendSuccess(res,'Started playing file',{playlist:currentPlaylist,since:playlistStarttime});
        }
    }

    if (req.body.stop) {
        playlistOn = false;
        var err = viewer.stopPlay();
        rest.sendSuccess(res,'Stopped playing file',{playlist:currentPlaylist,since:playlistStarttime});
        currentPlaylist = null;
        playlistStarttime = null;
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
exports.diskSpace = function(req,res){
    // shell command to know the available space
    exec('df -h /').stdout.on('data',function(data){
        //console.log("the total usage" +data);
        var strings = data.replace(/\s{2,}/g, ' ').split(" ");
        rest.sendSuccess(res, 'sending disk usage',
                            {diskspace: strings[strings.length-2], available:Math.floor(strings[strings.length-3]/1000000)+' MB' });
    })
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
                size: stats.size,
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
        playlistOn = true;
        startTimer();
        if (req.params['playlist'] != 'default') {
            currentPlaylist = config.mediaPath+req.params['playlist'];
        } else {
            currentPlaylist = config.defaultPlaylist;
        }
        var files = JSON.parse(fs.readFileSync(currentPlaylist,'utf8'));

        var err = viewer.startPlay(files);
        if (err) {
            playlistOn = false;
            return rest.sendError(res,err);
        } else {
            playlistStarttime = Date.now();
            return rest.sendSuccess(res,'Started playlist',{playlist:currentPlaylist,since:getDiff(playlistStarttime)});
        }
    }

    if (req.body.stop) {
        playlistOn = false;
        var err = viewer.stopPlay();
        playlistStarttime = null;
        rest.sendSuccess(res,'Stopped playlist',{playlist:currentPlaylist,since:playlistStarttime});
        currentPlaylist = null;        
        return;
    }
}

exports.Status = function(req, res){    
    var data= {
        diskspace:'',
        playingStatus:'',
        since: getTimer(),
        lastUpdated:''
    }
    return rest.sendSuccess(res, 'Status Check', data);
}


