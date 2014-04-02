angular.module('piConfig', []).
    constant('piUrls', (function() {
        var base,protocol;
        //IE fix !
        if (!window.location.origin) {
            window.location.origin =
                window.location.protocol + "//" + window.location.hostname +
                    (window.location.port ? ':' + window.location.port: '');
        }
        protocol = window.location.protocol.toLowerCase();
        if (protocol.indexOf("http") != -1 )
            base = window.location.origin+'/';
        else
            base = 'http://localhost/';
        console.log("api base: ",base);
        return {
            files:           base + 'files/' ,
            playFile:        base + 'play/playfiles/',
            fileUpload:      base + 'file-upload/',
            fileDetail:      base + 'file-detail/',
            fileDelete:      base + 'file-delete/',
            fileRename:      base + 'file-rename/',
            playListWrite:   base + 'file-playlist/',
            noticeSave:      base + 'notice-save/',
            diskSpace:       base + 'cmd/disk-space/',
            getStatus:       base + 'status/',
            settings:        base + 'settings/'
        }
    })());