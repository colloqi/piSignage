'use strict';

var config = require('../config'),
    viewer = require('./viewer');

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

exports.mediaList = function(req,res){
    var isplaylist= (req.query.cururl)? ~req.query.cururl.indexOf('playlist'): '',
        readDir= function(){
            fs.readdir(config.mediaDir,function (err, files) {
                if (err){
                    out(res, false, "Error: "+err, [])
                } else {
                    res.contentType('json');
                    return res.json(
                        {
                            success: true,
                            stat_message: "Sending Media files list",
                            data: validFiles(files),
                            playStatus: { playingStatus: playingStatus }
                        }
                    );
                    //out(res, true, "Sending Media files list", validFiles(files));
                }
            })
        }
    if(fs.existsSync(playlist) && isplaylist){
        fs.readFile(playlist, 'utf8', function (err, data) {
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
                                    playingStatus: playingStatus,
                                    since: getDiff(playStart),
                                    playlist: true
                                }
                            }
                        );
                    } else {
                        out(res, false, 'No files in upload directory', []);
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
            err = "Noting to Play";
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
                out(res, true, "Uploaded files", alldata);
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
exports.indicator = function(req,res){
    var child = exec('df -h /',['utf8']);            // shell command to know the available space
    child.stdout.on('data',function(data){
        console.log("the total usage" +data);
        res.json(data);
    })
}
exports.fileDetail = function(req, res){
    if(path.extname(req.query.file) == '.html'){
        var file= path.basename(req.query.file,'.html')+'.json';
        fs.readFile(config.mediaDir+"/_"+file, 'utf8', function (err, data) {
            if (err) console.log(err);
            out(res, true, 'html file detail', JSON.parse(data));
        });
    }else{
        var stats= fs.statSync(config.mediaDir+"/"+req.query.file),
            data= {
                name: req.query.file,
                size: stats.size,
                extension: path.extname(req.query.file)
            };
        out(res, true, '', data);

    }
}
exports.fileDelete = function(req, res){
    var file= config.mediaDir+"/"+req.body.file;
    if (req.body.file) {
        fs.exists(file, function (exists) {
            if(exists){
                fs.unlink(file, function(err){
                    (err)? out(res, false, "Unable to delete file!") : out(res, true, "File Deleted");
                })
            }else{
                out(res, false, "File Not Found");
            }
        });
    }else{
        out(res, false, "No file received");
    }
}
exports.fileRename = function(req, res){
    var oldpath= config.mediaDir+"/"+req.query.oldname,
        newpath= config.mediaDir+"/"+req.query.newname;

    if (req.query) {
        fs.exists(oldpath, function (exists) {
            if(exists){
                fs.rename(oldpath, newpath, function (err) {
                    (err)? out(res, false, 'Unable to rename file!'): out(res, true, 'File Renamed!');
                });
                fs.exists(playlist, function (exists) {
                    if(exists){
                        fs.readFile(playlist, 'utf8', function (err, data) {
                            if (err) console.log(err);
                            if(data.indexOf(req.query.oldname) != -1){
                                var write=  data.replace(req.query.oldname, req.query.newname);
                                fs.writeFile(playlist, write, function (err) {
                                    if (err) console.log(err);
                                });
                            }
                        });
                    }else{
                        //'Playlist does not exist!';
                    }
                });
            }else{
                out(res, false, "File Not Found");
            }
        });
    }
    else{
        out(res, false, "No file name received");
    }
}
exports.filePlaylist =  function(req, res){
    fs.writeFile(playlist,
        JSON.stringify(req.param('playlist'), null, 4),
        function(err) {
            (err)? out(res, false, err): out(res, true, "File Saved");
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
            out(res, false, err)
        }else{
            out(res, true, 'Notice File Saved', { file: data.filename+'.html' });
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
        if (req.params['playlist']) {
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
            return rest.sendSuccess(res,'Started playlist',{playlist:currentPlaylist,since:playlistStarttime});
        }
    }

    if (req.body.stop) {
        playlistOn = false;
        var err = viewer.stopPlay();
        rest.sendSuccess(res,'Stopped playlist',{playlist:currentPlaylist,since:playlistStarttime});
        currentPlaylist = null;
        playlistStarttime = null;
        return;
    }
}


