
/**
 * Module dependencies
 */

var express = require('express'),
    fs = require('fs'),
    omx = require('omxcontrol'),
    exec = require('child_process').exec;
    
var child;
var playorpause = true;   

var config = {
    port: 8000,
    root: __dirname,
    uploadDir: './media'
}

var app = express();

app.use(allowCrossDomain);

app.use(omx());

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

function addRoutes(app) {
    var out= {};
    app.get('/media-list', function(req,res){
        fs.readdir(config.uploadDir,function (err,files) {
            if (err) {
                out.success= false;
                out.stat_message= "Error: "+err;
                out.data= [];
            } else {
                out.success= true;
                out.stat_message= "Sending Media files list";
                out.data= files;
            }
            res.contentType('json');
            return res.json(out);
        })
    })

    app.post('/play-file', function(req,res){
        var out = {};

        var link = config.uploadDir+'/'+req.param('file');
        child = exec('sh yt.sh '+link,
        function (error, stdout, stderr) {
           console.log('stdout: ' + stdout);
           console.log('stderr: ' + stderr);
           if (error !== null) {
               console.log('exec error: ' + error);
           }
        });
        out.success= true;
        out.stat_message= "Recived the file name for play: "+req.param('file');
        out.data= [];

        res.contentType('json');
        return res.json(out);

    })
    app.post('/key',function(req,res){
      
      if ((req.param('keypress')) == 'play') {
            omx.sendKey('p');
              
      }
      else{
        omx.quit();
      }
      
      
    console.log('pressed key'+ req.param('keypress'));
    
    })
    
    
}

    