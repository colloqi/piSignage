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
    omxProcess, videoPaused,watchdogVideo,
    playingStatus= undefined,
    playStart= 0,

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

    
app.use('/media',function(req, res, next){
    var imgpath= "."+req.originalUrl;
    if (req.url.match(/(jpg|jpeg|png|gif)$/i)) {
        fs.exists(decodeURIComponent(imgpath), function (exists) {
            (exists)? res.sendfile(imgpath): res.sendfile(config.root+"/noimage.jpg");
        });
    }else{
        //next();
        res.sendfile(imgpath);
    }    
})

function addRoutes(app) {    
    var out= {};
    var playerrun = false;
    var file= "_playlist.json",
        playlist= config.uploadDir+"/"+file;
        
    var out= function(res, status, msg, data){           
        res.contentType('json');
        return res.json({success: status, stat_message: msg, data: data});
    } 
    var validFiles= function(files){
        var newfilelist=[];
        files.forEach(function(file){
            if(file.charAt(0) != '_') newfilelist.push(file);
        });
        return newfilelist;
    }
    var getDiff= function(starttime){
        return (new Date().getTime() - starttime) / 1000;         
    }
    
    var routes= {
        mediaList: function(req,res){
        var isplaylist= (req.query.cururl)? ~req.query.cururl.indexOf('playlist'): '',
            readDir= function(){
                fs.readdir(config.uploadDir,function (err, files) {                   
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
                        for(key in data){
                            playlistarr.push(data[key].filename);
                        }                    
                        fs.readdir(config.uploadDir, function(err, files){
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
        },
        playFile: function(req,res){        
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
                }
                else if(playerrun) {
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
            out.stat_message1= "Received the file name for play: "+req.param('file') + link;
            out.data= [];
    
            res.contentType('json');
            return res.json(out);
        },
        fileUpload: function(req, res){
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
            for(key in req.files) {            
                var media= req.files[key],
                    mediapath= config.uploadDir+'/'+media.name;                
                origName(media, mediapath);
            }
        },
        indicator: function(req,res){        
            child = exec('df -h /',['utf8']);            // shell command to know the available space
            child.stdout.on('data',function(data){
                console.log("the total usage" +data);
                res.json(data);  
            })
        },
        fileDetail: function(req, res){
            if(path.extname(req.query.file) == '.html'){
                var file= path.basename(req.query.file,'.html')+'.json';
                fs.readFile(config.uploadDir+"/_"+file, 'utf8', function (err, data) {
                    if (err) console.log(err);
                    out(res, true, 'html file detail', JSON.parse(data));
                });
            }else{
                var stats= fs.statSync(config.uploadDir+"/"+req.query.file),
                    data= {
                        name: req.query.file,
                        size: stats.size,
                        extension: path.extname(req.query.file),
                    };
                out(res, true, '', data);
            }
        },
        fileDelete: function(req, res){     
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
        },
        fileRename: function(req, res){
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
        },
        filePlaylist:  function(req, res){
            fs.writeFile(playlist,
                JSON.stringify(req.param('playlist'), null, 4),
                function(err) {
                    (err)? out(res, false, err): out(res, true, "File Saved");
                }
            );       
        },
        noticeSave: function(req, res){
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
            
            fs.writeFile(config.uploadDir+"/"+data.filename+'.html', pagedata, 'utf8', function(err){
                if(err){
                    out(res, false, err)
                }else{
                    out(res, true, 'Notice File Saved', { file: data.filename+'.html' });
                    fs.writeFile(config.uploadDir+"/_"+data.filename+'.json',
                        JSON.stringify(noticejson, null, 4), 'utf8', function(err){
                            if (err) {
                                console.log(err);
                            }
                        }); 
                }
            });                     
        },
        playAll: function(req,res){
            if (req.param('pressed')== 'play' && !playingStatus) {
                playingStatus= true;
                playStart= new Date().getTime();            
                var entry = JSON.parse(fs.readFileSync(playlist,'utf8'));            
                var i=0,len = entry.length;
                if (len) {
                    displayNext(entry[i].filename,entry[i].duration ,cb);
                    function cb(err) {
                        if (!playingStatus) {
                             browserSend('uri ./dummy/black.html',['utf8']);
                        }else{
                            i = (i +1) % len;
                            displayNext(entry[i].filename,entry[i].duration,cb);
                            
                        }                    
                    }
                    out(res, true, "Playing Started", {status: playingStatus, since: getDiff(playStart)});
                }else {
                    playingStatus = false;
                    out(res, false, "Playing Stopped", {status: playingStatus });
                }
            }else if(req.param('pressed')== 'stop') {
                browserSend('uri ./dummy/black.html',['utf8']);
                playingStatus = false;
                playStart= 0;
                stopVideo();
                out(res, true, "Playing Stopped", {status: playingStatus});            
            }
        }
    }
    
    app.get('/media-list', routes.mediaList);
    app.post('/play-file', routes.playFile);    
    app.post('/file-upload', routes.fileUpload);    
    app.get('/indicator', routes.indicator);    
    app.get('/file-detail', routes.fileDetail);    
    app.post('/file-delete', routes.fileDelete);    
    app.get('/file-rename', routes.fileRename);    
    app.post('/file-playlist', routes.filePlaylist);
    app.post('/notice-save', routes.noticeSave);
    app.post('/playall', routes.playAll);   
}

function displayNext(fname, duration,cb) {
	//check for video
	util.log("playing next file: "+fname +' time = ' + duration);
    if(fname.match(/(mp4|mov)$/i)){
        browserSend('uri ./dummy/black.html',['utf8']);
        playVideo('./media/'+fname,cb );
        watchdogVideo = setTimeout(function(){
            util.log("watchdog Timeout expired, killing video process")
            stopVideo(); 
			
        },10*60*1000);  
    } else {
	   // browserSend('uri ./media/'+fname);
		browserSend('js '+jscript(fname));
		setTimeout(function(){
            util.log("setTimeout expired, browser")
            cb();
        },1000*duration)		//take from  playlist.json
    }
}

var jscript = function(url){
	//var html = 'document.getElementById("imagepart").setAttribute("src","../media/'+url+'");'
	html = "document.body.style.backgroundImage = 'url(../media/"+ url +")'";
	//console.log(window.innerWidth);
	//var html = "var img = new Image(); img.src ="+ url+"; console.log('hello');img.onload = function(){document.body.style.backgroundSize = (img.width > window.innerWidth) || (img.height > window.innerHeight) ? 'contain' : 'auto'; document.body.style.backgroundImage = 'url(../media/'"+ url +")';	}"
	//var  html =  'var i= new Image();'+' i.src=../media/'+url+';'+ 'console.log(i.src)';
	
	return html;
}
//browser and video utilities
function loadBrowser (url) {
    if (browser) {
        console.log('killing previous uzbl %s', browser.pid)
        browser.kill()
    }

    if (url)
        currentBrowserUrl = url;

    browser = spawn('uzbl',['-g','maximized','-c','-','--uri',currentBrowserUrl],{stdio : [ 'pipe', null, process.stderr ]})
    console.log('Browser loading %s. Running as PID %s.', currentBrowserUrl, browser.pid)

    browser.once('exit', function(code, signal) {
        browser = null;
        console.log("browser stopped with code %s, signal %s",code,signal)
    });

    browserSend(fs.readFileSync('./misc/uzblrc'));

    browserSend("uri ./dummy/black.html");
}

function browserSend(cmd) {
    //wait for stream availability, flush browser.next() if needed
    if (!cmd) {
        console.log("Browser: No command to issue")
    }
    if (browser) {
        try {
            browser.stdin.write(cmd + '\n', function(err){
                //console.log("uzbl command issued: "+cmd);
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

    omxProcess = spawn("omxplayer", ['-o', 'hdmi', file], {
        stdio : [ 'pipe', null, null ]
    });

    omxProcess.once('exit', function(code, signal) {
        exec('killall /usr/bin/omxplayer.bin');
        omxProcess = null;
        clearTimeout(watchdogVideo);
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
