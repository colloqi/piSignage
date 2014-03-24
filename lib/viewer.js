'use strict';
var spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    util = require('util'),
    fs= require('fs');

var config = require('../config');

var browser, currentBrowserUrl,
    omxProcess, videoPaused,watchdogVideo,browserTimer;

var BLANK_HTML = "./views/blank.html";

var playlistOn = false; //used locally in this file

var omxCommands = {
        'pause' : 'p',
        'quit' : 'q'
    };
    
//load the browser instance
loadBrowser();

//browser utilities
function loadBrowser (url) {
    if (browser) {
        util.log('killing previous uzbl %s', browser.pid)
        browser.kill()
    }

    if (url)
        currentBrowserUrl = url;
    else
        currentBrowserUrl = BLANK_HTML;

    browser = spawn('uzbl',['-g','maximized','-c','-','--uri',currentBrowserUrl],{stdio :  'pipe'})
    util.log('Browser loading %s. Running as PID %s.', currentBrowserUrl, browser.pid)

    browser.once('exit', function(code, signal) {
        browser = null;
        util.log("browser stopped with code %s, signal %s",code,signal)
    });

    browser.stdout.on('data', function(data){
        console.log("***stdout pipe***")
        console.log(data);
    })

    browser.stderr.on('data', function(data){
        console.log("***stderr pipe***")
        console.log(data.toString('utf8'));
    })

    browserSend(fs.readFileSync('./misc/uzblrc'));

    browserDefault();

}

function browserSend (cmd) {
    if (!cmd) {
        util.log("Browser: No command to issue")
        
    }
    util.log("Browser command: "+cmd)
    if (browser) {
        try {
            browser.stdin.write(cmd + '\n', function(err){
                if (err) util.log("uzbl command callback error: "+err)
            })
        } catch (e) {
            util.log("browser stdin write exception: "+e.code);
        }
    } else {
        util.log("No browser instance, restarting the browser")
        loadBrowser();
    }
}

function browserDefault() {
    clearTimeout(browserTimer);
    if (currentBrowserUrl != BLANK_HTML) {
        browserSend("uri "+BLANK_HTML);
        currentBrowserUrl = BLANK_HTML;
    }
}

function loadImage(path) {
    browserDefault();
    browserSend('js window.setimg("'+path+'")');
    //browserSend('js '+ 'document.body.style.backgroundImage = "url(\'.'+ path +"')\"" ) ;
}

//omxplayer utilities

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
                util.log("omxplayer command callback error: "+err);
            });
        } catch (err) {
            util.log("omxplayer stdin write exception: "+err);
        }
    } else {
        util.log("No omxplayer instance or omxplayer command not found: "+action);
    }
};

function playVideo (file,cb,restart) {
    browserDefault();
    util.log("play video: "+file)
    if (restart)
        stopVideo();        //kill the current video
    if (omxProcess) {
        if (!videoPaused) {
            return false;
        }
        omxSend('pause');
        videoPaused = false;
        return true;
    } else {
        openOmxPlayer(file,cb);
        return true;
    }
};

function pauseVideo () {
    if (videoPaused) {
        return false;
    } else {
        omxSend('pause');
        videoPaused = true;
        return true;
    }
};


function stopVideo() {
    if (!omxProcess) {
        return false;
    } else {
        util.log("stop video")
        //omxSend('quit');
        omxProcess.kill();
        omxProcess = null;
        return true;
    }
};

function displayNext(fname, duration,cb) {
    //check for video
    if (!duration || duration < 3)
        duration = 3;
    util.log("playing next file: "+fname +' time = ' + duration);
    if(fname.match(/(mp4|mov)$/i)){
        playVideo('./media/'+fname,cb, true );
        watchdogVideo = setTimeout(function(){
            util.log("watchdog Timeout expired, killing video process")
            stopVideo();
        },10*60*1000);
    } else if(fname.match(/(jpg|jpeg|png|gif)$/i)) {
        loadImage('../media/'+fname)
        browserTimer = setTimeout(function(){
            util.log("image duration expired")
            cb();
        },1000*duration)
    } else {
        browserSend("uri ./media/"+fname);
        currentBrowserUrl = "./media/"+fname;
        browserTimer = setTimeout(function(){
            util.log("html duration expired")
            cb();
        },1000*duration)
    }
}

exports.startPlay = function (files)  {
    var i,len;

    var callback = function (err) {
        if (playlistOn) {
            i = (i +1) % len;
            displayNext(files[i].filename,files[i].duration,callback);
        }
    }

    playlistOn = true;

    i=0;
    len = files.length;

    if (len > 0) {
        displayNext(files[i].filename,files[i].duration ,callback);
        return;
    } else {
        playlistOn = false;
        return ("No files to Play");
    }
}

exports.stopPlay = function (files)  {
    playlistOn = false;
    browserDefault();
    stopVideo();
    return;
}

exports.config = function loadConfig() {
    fs.readFile(config.mediaPath+'_config.json', 'utf8', function (err, data) {
        if (err) throw err;
        return data;
    });    
}