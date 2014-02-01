angular.module('cordova.services',[]).
    factory('cordovaReady', ['$document', '$location','$q',
        function($document,$location, $q) {


            var d = $q.defer(),
                resolved = false;

            document.addEventListener('deviceready', function() {

                installBackButtonHandler();

                resolved = true;
                d.resolve(window.cordova);
            });

            // Check to make sure we didn't miss the
            // event (just in case)
            setTimeout(function() {
                if (!resolved) {
                    if (window.cordova) {
                        installBackButtonHandler();
                        d.resolve(window.cordova);
                    }
                }
            }, 3000);

            return d.promise;

            function installBackButtonHandler() {
                document.addEventListener("backbutton", function(e){

                    if ($location.path() == '/') {
                        e.preventDefault();
                        navigator.app.exitApp();
                    }
                    else {
                        navigator.app.backHistory()
                    }
                }, false);
                console.log("adding back button listener");
            }

        }]).

    //https://github.com/anim/phonegap-push-angular/blob/master/phonegap-push.js
    factory('cordovaPush',['$rootScope','screenlog', function($rootScope, screenlog) {

        function getPhoneGapPath () {
            var path = window.location.pathname;
            var phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);
            return phoneGapPath;
        }

        var pushNotificationsFactory = function (gcmSenderId, registeredCallback, messageCallback) {

            var pushNotification;

            /* Setup and register device */

            // Check if phonegap and plugins are loaded
            if (typeof(window.plugins) === 'undefined') {
                screenlog.error('PhoneGap plugins not found');
                return false;
            }

            // Initialize push notifications
            pushNotification = window.plugins.pushNotification;
            if (typeof(pushNotification) === 'undefined') {
                screenlog.error('Push plugin not found');
                return false;
            }

            var gcmSuccessHandler = function (result) {
//                screenlog.info(
//                    'Successfully registered with GCM push server. ' +
//                        'Waiting for device registration ID via notification. ' +
//                        'Registration result:'+ result
//                );
            };

            var apnsSuccessHandler = function (deviceToken) {
                //screenlog.info('IOS Device token:'+ deviceToken);
                registeredCallback(deviceToken, 'ios');
            };

            var genericErrorHandler = function (error) {
                screenlog.error('Registration Error:'+ error);
            };

            // Register device with push server
            if (device.platform === 'Android') {
                pushNotification.register(gcmSuccessHandler, genericErrorHandler, {
                    'senderID': gcmSenderId,
                    'ecb': 'onNotificationGCM'
                });
            } else if (device.platform === 'iOS') {
                pushNotification.register(apnsSuccessHandler, genericErrorHandler, {
                    'badge': 'true',
                    'sound': 'true',
                    'alert': 'true',
                    'ecb': 'onNotificationAPN'
                });
            }

            /* Bind notification functions to window (called by phonegapPush plugin) */

            // iOS notification received
            window.onNotificationAPN = function (notification) {
                //screenlog.info('APNS push notification received:'+ notification);
                if ( notification.alert )
                {
                    //screenlog.info('APNS message:'+ notification.alert);
                    //navigator.notification.alert(notification.alert);
                }

                if ( notification.sound )   //default is possible in IOS
                {
                    var my_media = new Media(getPhoneGapPath() +"app/sound/purebell.mp3");
                    my_media.play();
                }

                if ( notification.badge )
                {
                    pushNotification.setApplicationIconBadgeNumber(gcmSuccessHandler, genericErrorHandler, notification.badge);
                }
                messageCallback(null,{message: notification.alert,msgcnt: notification.badge},'ios');
            };

            // Android notification received
            window.onNotificationGCM = function (notification) {
                switch (notification.event) {
                    case 'registered':
                        if (notification.regid.length > 0) {
                            //screenlog.info('Got GCM device registration ID:'+ notification.regid);
                            registeredCallback(notification.regid, 'android');
                        } else {
                            screenlog.error('Error: No device registration ID received');
                        }
                        break;

                    case 'message':
                        //screenlog.info('GCM push notification received (only payload forwarded):'+ JSON.stringify(notification));
                        if (notification.foreground) {
                            var my_media = new Media(getPhoneGapPath() + "app/sound/purebell.ogg");
                            my_media.play();
                        }
                        messageCallback(notification.collapse_key,notification.payload,'android');
                        break;

                    case 'error':
                        screenlog.error('Error while receiving GCM push notification:'+ notification);
                        break;

                    default:
                        screenlog.error('Unknown GCM push notification received:'+ notification);
                        break;
                }
            };

            return true;
        };

        return pushNotificationsFactory;
    }]);

//    factory('cordovaReady',['$document','$location', function($document,$location) {
//        return function (fn) {
//
//            var queue = [];
//
//            var impl = function () {
//                queue.push(Array.prototype.slice.call(arguments));
//            };
//
//            document.addEventListener('deviceready', function () {
//
//                document.addEventListener("backbutton", function(e){
//
//                    if ($location.path() == '/') {
//                        e.preventDefault();
//                        navigator.app.exitApp();
//                    }
//                    else {
//                        navigator.app.backHistory()
//                    }
//                }, false);
//
//                queue.forEach(function (args) {
//                    fn.apply(this, args);
//                });
//                impl = fn;
//            }, false);
//
//            return function () {
//                return impl.apply(this, arguments);
//            };
//        };
//    }]);