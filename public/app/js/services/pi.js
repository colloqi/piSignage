'use strict';

//ims Admin services

angular.module('piathome.services',[]).

    //https://github.com/logicbomb/lvlFileUpload
    factory('fileUploader', ['$rootScope', '$q', function($rootScope, $q) {
        var svc = {
            post: function(files, data, progressCb) {

                return {
                    to: function(uploadUrl)
                    {
                        var deferred = $q.defer()
                        if (!files || !files.length) {
                            deferred.reject("No files to upload");
                            return;
                        }

                        var xhr = new XMLHttpRequest();
                        xhr.upload.onprogress = function(e) {
                            $rootScope.$apply (function() {
                                var percentCompleted;
                                if (e.lengthComputable) {
                                    percentCompleted = Math.round(e.loaded / e.total * 100);
                                    if (progressCb) {
                                        progressCb(percentCompleted);
                                    } else if (deferred.notify) {
                                        deferred.notify(percentCompleted);
                                    }
                                }
                            });
                        };

                        xhr.onload = function(e) {
                            $rootScope.$apply (function() {
                                var ret = {
                                    files: files,
                                    data: angular.fromJson(xhr.responseText)
                                };
                                deferred.resolve(ret);
                            })
                        };

                        xhr.upload.onerror = function(e) {
                            var msg = xhr.responseText ? xhr.responseText : "An unknown error occurred posting to '" + uploadUrl + "'";
                            $rootScope.$apply (function() {
                                deferred.reject(msg);
                            });
                        }

                        var formData = new FormData();

                        if (data) {
                            Object.keys(data).forEach(function(key) {
                                formData.append(key, data[key]);
                            });
                        }

                        for (var idx = 0; idx < files.length; idx++) {
                            formData.append(files[idx].name, files[idx]);
                        }

                        xhr.open("POST", uploadUrl);
                        xhr.send(formData);

                        return deferred.promise;
                    }
                };
            }
        };

        return svc;
    }]).

    factory('screenlog', ['$timeout',  function($timeout) {

        var scope = angular.element(document.querySelector("#screenlogelement")).scope();
        scope.screenlogclass = "hide";
        var debugFlag = false,
            timeout = 15000;

        return  {
            enableDebug: function(flag) {
                debugFlag = flag;
            },
            debug: function(msg) {
                if (!debugFlag) return;

                scope.screenlogclass = "alert-success";
                $timeout(function(){scope.screenlogclass = "hidden"; },timeout);
                scope.screenlog = msg;
            },
            error: function(msg) {
                scope.screenlogclass = "alert-danger";
                $timeout(function(){scope.screenlogclass = "hidden"; },timeout);
                scope.screenlog = msg;
            },
            warn: function(msg){
                scope.screenlogclass = "alert-warning";
                $timeout(function(){scope.screenlogclass = "hidden"; },timeout);
                scope.screenlog = msg;
            },
            info: function(msg){
                scope.screenlogclass = "alert-info";
                $timeout(function(){scope.screenlogclass = "hidden"; },timeout);
                scope.screenlog = msg;
            }
        }
    }]).

    factory('onlineStatusInterceptor', ['$q','$rootScope',function($q,$rootScope) {

        var onlineStatus = false;
        return {
            'response': function(response) {
                if (!onlineStatus) {
                    onlineStatus = true;
                    $rootScope.$broadcast('onlineStatusChange',onlineStatus);
                }
                return response || $q.when(response);
            },

            'responseError': function(rejection) {
                if (onlineStatus) {
                    onlineStatus = false;
                    $rootScope.$broadcast('onlineStatusChange',onlineStatus);
                }
                return $q.reject(rejection);
            }
        };
    }]);
