/**
 * Module dependencies
 */

var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    _= require('underscore'),
    spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    util = require('util');

var browser, currentBrowserUrl,
    omxProcess, videoPaused,
    omxCommands = {
        'pause' : 'p',
        'quit' : 'q'
    };
    
var config = {
    port: 8000,
    root: __dirname,
    uploadDir: './media'
}

//load the browser instance
loadBrowser();

var app = express();

app.use(allowCrossDomain);

// app.use(omx());

app.use(express.static(config.root + '/public'))

app.set('view engine', 'jade')

app.configure(function () {

    // bodyParser should be above methodOverride
    app.use(express.bodyParser({uploadDir:config.uploadDir}))
    app.use(express.methodOverride())

    // routes should be at the last
    app.use(app.router)

    // custom error handler
    app.use(function (err, req, res, next) {
        if (~err.message.indexOf('not found')) return next()
        console.error(err.stack)
        res.status(500).render('500')
    })

//    app.use(function (req, res, next) {
//        res.status(404).render('404', { url: req.originalUrl })
//    })

})


addRoutes(app);


//var io = socketio.listen(server);

app.listen(config.port, function() {
    console.log("Express server listening on port " + config.port);
});

function allowCrossDomain (req, res, next) {
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

    
app.use('/media',function(req, res){
    var imgpath= "."+req.originalUrl;
    if (req.url.match(/(jpg|jpeg|png|gif)$/i)) {
        fs.exists(imgpath, function (exists) {
            (exists)? res.sendfile(imgpath): res.sendfile(config.root+"/noimage.jpg");
        });
    }
    
})

function addRoutes(app) {    
    var out= {};
    var playerrun = false;
    var file= "_playlist.json",
        playlist= config.root+"/"+file;
        
    var out= function(res, status, msg, data){           
        res.contentType('json');
        return res.json({success: status, stat_message: msg, data: data});
    } 
    
    app.get('/media-list', function(req,res){
        var isplaylist= (req.query.cururl)? ~req.query.cururl.indexOf('playlist'): '',
            readDir= function(){
                fs.readdir(config.uploadDir,function (err, files) {
                    (err)? out(res, false, "Error: "+err, []): out(res, true, "Sending Media files list", files);
                })
            }        
        if(fs.existsSync(playlist) && isplaylist){
            fs.readFile(playlist, 'utf8', function (err, data) {
                if(err) console.log("Error: "+err);                
                data= JSON.parse(data);
                if(data){
                    var playlistarr= [],
                    diskmedia,  playmedia;                                        
                    for(key in data){
                        playlistarr.push(data[key].filename);
                    }                    
                    fs.readdir(config.uploadDir, function(err, files){
                        if(files){ 
                            diskmedia= _.difference(files, playlistarr);
                            if (diskmedia.length) {
                                diskmedia.forEach(function(itm){                    
                                    data.push({filename: itm, duration: 0, selected: false});
                                }); 
                            }
                            playmedia= _.difference(playlistarr, files);
                            if (playmedia.length) {
                                playmedia.forEach(function(itm){
                                    _.map(data, function(arritm){
                                        if (arritm.filename == itm) {
                                            arritm.deleted= true;
                                        }
                                    }) 
                                }); 
                            }
                            out(res, true, 'Loaded Playlist', data);                            
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
    })

    app.post('/play-file', function(req,res){
        var out = {};
        var link = config.uploadDir+'/'+req.param('file');
        //check image or video
        if ( !imageformat.indexOf(path.extname(link)) ) {
            //shell command to display image
            imagchild= exec('sudo fbi -T 1 media/'+req.param('file'), function(stderr,stdout,stdin){
                console.log(" stderr" + stderr);
                console.log("stdout "+ stdout);
                console.log("stdin "+ stdin);
            });
	    setTimeout(function(){
		exec('MACHINE=`pidof fbi`;echo `sudo kill $MACHINE`;')
		}, 5000)
            console.log('display play the image '+link );
        }else{
            // player is running or not
            
            if( !playerrun ){
                omx.play(link , { audioOutput : 'hdmi'});
                playerrun = true; 
                console.log("player started running");
                out.stat_message2= 'player started';
                // if the player runnning they pause or play
            }else if(playerrun) {
                        console.log(req.param('state'));
                        if (req.param('state') == 'pause') {
                                omx.pause();
                                playerrun = true;
                                console.log('pause button pressed >>>>');
                                
                                out.stat_message3= 'play/pause key pressed';
                        }else if (req.param('state') == 'play') {
                                omx.play(link , { audioOutput : 'hdmi'});
                                playerrun = true;
                                console.log('play pressed playing >>>>>');
                            }
               
            }    
            console.log('play the video file');
        }
        //check the status of player
        (omx.getStatus().loaded)?  playerrun = true : playerrun = false;
        // stop the video player
        if (req.param('playing') == 'stop') {
            omx.stop();
            playerrun = false;
            console.log('player stoped');
        }        
        out.success= true;
        out.stat_message1= "Recived the file name for play: "+req.param('file') + link;
        out.data= [];

        res.contentType('json');
        return res.json(out);
    })
    
    app.post('/file-upload', function(req, res){            
        var media= req.files[Object.keys(req.files)],
            mediapath= config.uploadDir+'/'+media.name;
        fs.exists(mediapath, function (exists) {
            if(exists){
                out(res, true, "Overwriting file", {name: media.name});
            }else{
                var data= {
                    name: media.name,
                    path: media.path,
                    size: media.size,
                    type: media.type
                }
                out(res, true, "Uploaded file", data);
            }
        });
        fs.rename(media.path, mediapath, function(err){
            if(err) console.log(err);
        });      
    })
    
    // space indicator 
    app.get('/indicator',function(req,res){        
        child = exec('df -h /',['utf8']);            // shell command to know the available space
        child.stdout.on('data',function(data){
            console.log("the total usage" +data);
            res.json(data);  
        })
    })    
    
    app.get('/file-detail', function(req, res){
        var stats= fs.statSync(config.uploadDir+"/"+req.query.file),
            data= {
                name: req.query.file,
                size: stats.size,
                extension: path.extname(req.query.file),
            };
        out(res, true, '', data);
    })   
    
    app.post('/file-delete', function(req, res){     
        var file= config.uploadDir+"/"+req.body.file;
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
    })
    
    app.get('/file-rename', function(req, res){
        var oldpath= config.uploadDir+"/"+req.query.oldname,
            newpath= config.uploadDir+"/"+req.query.newname;
            
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
    })
    
    app.post('/file-playlist', function(req, res){
        fs.writeFile(playlist,
            JSON.stringify(req.param('playlist'), null, 4),
            function(err) {
                (err)? out(res, false, err): out(res, true, "File Saved");
            }
        );       
    })
    
    app.post('/notice-save', function(req, res){
        var data= req.body.formdata;
        var pagedata= '<h1> '+ data.title +' </h1>'+
        '<div class="media">'+
            '<a class="pull-right" href="#">'+
                '<img class="media-object" style="width:auto; height: 150px" src="'+ data.imagepath +'">'+
            '</a>'+
            '<div class="media-body">'+
                '<h4 class="media-heading"></h4> '+
                    data.description+
            ' </div>'+
        '</div>';
        
        fs.writeFile(config.uploadDir+"/"+data.filename+'.html', pagedata, 'utf8', function(err){
            (err)? out(res, false, err): out(res, true, "Notice File Saved");
        });
    })
    
    app.post('/playall',function(req,res){
        if (req.param('pressed')== 'play') {
            var entry = JSON.parse(fs.readFileSync('./_playlist.json','utf8'));
            var i=0,len = entry.length;
            displayNext(entry[i].filename, cb);
            function cb(err) {
                i = (i +1) % len;
                displayNext(entry[i].filename,cb)
            }
        }else if(req.param('pressed')== 'pause') {
            browserSend('uri ./dummy/black.gif',['utf8']);
            stopVideo();
        }
    })
}
function displayNext(fname, cb) {
	//check for video
	util.log("playing next file: "+fname);
    if(fname.match(/(mp4|mov)$/i)){
        browserSend('uri ./dummy/black.gif',['utf8']);
        playVideo('./media/'+fname,cb );
        setTimeout(function(){
            util.log("setTimeout expired, video")
            stopVideo();

        },30000);
    } else {
	    browserSend('uri ./media/'+fname);
		setTimeout(function(){
            util.log("setTimeout expired, browser")
            cb();
        },20000)
    }
}

//browser and video utilities
function loadBrowser (url) {
    if (browser) {
        console.log('killing previous uzbl %s', browser.pid)
        browser.kill()
    }

    if (url)
        currentBrowserUrl = url;

    browser = spawn('uzbl',['-c','-','--uri',currentBrowserUrl],{stdio : [ 'pipe', null, process.stderr ]})
    console.log('Browser loading %s. Running as PID %s.', currentBrowserUrl, browser.pid)

    browser.once('exit', function(code, signal) {
        browser = null;
        console.log("browser stopped with code %s, signal %s",code,signal)
    });

    browserSend(fs.readFileSync('./misc/uzblrc'));

    browserSend("uri www.google.com");
}

function browserSend(cmd) {
    //wait for stream availability, flush browser.next() if needed
    if (!cmd) {
        console.log("Browser: No command to issue")
    }
    if (browser) {
        try {
            browser.stdin.write(cmd + '\n', function(err){
                console.log("uzbl command issued: "+cmd);
                if (err) console.log("uzbl command callback error: "+err)
            })
        } catch (err) {
            console.log("browser stdin write exception: "+err);
        }
    } else {
        console.log("No browser instance, restarting the browser")
        loadBrowser();
    }
}

function openOmxPlayer (file,cb) {

    omxProcess = spawn("omxplayer", [file], {
        stdio : [ 'pipe', null, null ]
    });

    omxProcess.once('exit', function(code, signal) {
        exec('killall /usr/bin/omxplayer.bin');
        omxProcess = null;
        cb();
    });
}


function omxSend (action) {
    if (omxCommands[action] && omxProcess) {
        try {
            omxProcess.stdin.write(omxCommands[action], function(err) {
                console.log("omxplayer command callback error: "+err);
            });
        } catch (err) {
            console.log("omxplayer stdin write exception: "+err);
        }
    } else {
        console.log("omxplayer command not issued: "+action);
    }
};

function playVideo (file,cb) {
    console.log("play video: "+file)
    if (omxProcess) {
        if (!videoPaused) {
            return false;
        }
        omxSend('pause');
        videoPaused = false;
        return true;
    }
    openOmxPlayer(file,cb);
    return true;
};

function pauseVideo() {
    if (videoPaused) {
        return false;
    }
    omxSend('pause');
    videoPaused = true;
    return true;
};


function stopVideo() {
    if (!omxProcess) {
        /* ignore, no omxProcess to stop */
        return false;
    }
    util.log("stop video")
    //omxSend('quit');
    omxProcess.kill();
    return true;
};
