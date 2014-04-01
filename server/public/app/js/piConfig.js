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
            base = 'https://biocon.nodeims.com/';
        console.log("api base: ",base);
        return {
            getMyDetails:       base + 'get-my-details/',
            appLogin:           base + 'app-login/',
            events:             base + 'events/',
            groups:             base + 'groups/',
            fileupload:         base + 'fileupload',
            entities:           base + 'api/entities/',
            circles:            base + 'api/users/me/circles/',
            persons:            base + 'api/users/me/persons/',
            friends:            base + 'api/users/me/friends/',
            posts:              base + 'api/posts/',
            wall:               base + 'api/posts/me/wall',
            newsfeed:           base + 'api/posts/me/newsfeed',
            actions:            base + 'api/posts/me/actions',
            userEntity:         base + 'user-entity',
            roles:              base + 'roles/',
            cities:             base + 'cities/',
            logout:             base + 'logout',
            forgot:             base + 'forgot',
            signup:             base + 'signup',
            vitals:             base + 'api/mqtt/vitals/',
            alerts:             base + 'api/mqtt/alerts/'
        }
    })());