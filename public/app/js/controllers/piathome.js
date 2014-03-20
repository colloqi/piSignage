'use strict;'

angular.module('piathome.controllers', ['ui.bootstrap','ngRoute','ngSanitize','ngAnimate'])
    .controller('MainCtrl', ['$scope','$rootScope', '$location','$window','$http','piUrls',
                    'cordovaReady' ,'cordovaPush','$interval','$timeout','screenlog','$route',
        function($scope,$rootScope, $location,$window,$http,piUrls,cordovaReady,cordovaPush,$interval,$timeout,screenlog, $route) {
            $scope.playingStatus;
            $scope.playingSince;
            cordovaReady.then(function() {
                screenlog.debug("Cordova Service is Ready");
            });
            
            $rootScope.playlist=[];            
            
            $http.get('/files',{})
            .success(function(data, status) {
                if (data.success) {
                    $rootScope.files = data.data;
                }
            })
            .error(function(data, status) {
            });
            
            $http.get('/cmd/disk-space',{}).success(function(data,status){

                $scope.diskSpaceUsed = data.data.diskspace;
                $scope.diskSpaceAvailable = data.data.available;

            })
            

            $scope.goBack = function() {
                $window.history.back();
            };
            $scope.goHome = function() {
                $location.path('/');
            };
            $scope.doSearch = function() {
                $scope.showSearchField=!$scope.showSearchField;
                if (!$scope.showSearchField)
                    $scope.search = null;
            };
            
            $rootScope.$on('$locationChangeStart', function(scope, next, current){ 
                var subpath = next.slice(next.indexOf('#')+2);
                $scope.showBackButton = subpath.indexOf('/') >= 0;
                $scope.showSearchButton = false;
                $scope.showGroupButton = false;
                $scope.playbutton= false;
                $scope.pausebutton=false;
                $scope.showEditButton= false;                
                    
                if (subpath.length == 0) {
                    $scope.showSearchField = false;
                    $scope.search = null;
                }               
                
                if (~next.indexOf('assets')) {
                    $scope.showEditButton= true;
                    $scope.editButtonText= 'Edit';
                }                
                if (~next.indexOf('edit')) {
                    $scope.editButtonText= "Done";
                }
                if (~next.indexOf('playlist')) {
                    $scope.showEditButton= false;
                    $scope.editButtonText= "Save";
                    
                    $scope.playbutton= true;
                    $scope.pausebutton=false;
                    $scope.playall= function(key){
                        var condition= (key == 'play')? { play: true} : { stop: true};
                        $scope.playbutton= !$scope.playbutton;
                        $scope.pausebutton= !$scope.pausebutton;
                        $scope.$parent.playingStatus= (key == 'play');
                        $http
                        .post('/play/playlists/'+'default', condition)
                        .success(function(data,success){
                            if (data.success) {
                                if (data.data.since != null) {
                                    $scope.interval= setInterval(function(){                    
                                        $http
                                        .get('/status')
                                        .success(function(data){
                                            //$scope.$parent.playingSince= data.data.since;
                                        })
                                        .error(function(data){
                                            
                                        });
                                    }, 1000);
                                }
                                else{
                                    clearInterval($scope.interval);
                                }
                                $location.path('/');
                                console.log('playall request sent');                                
                            }else {
                                //$scope.$parent.playingStatus= !data.data.status;
                                //$scope.$parent.playermsg1= "Playlist empty! Stop to Create a new Playlist!";
                            }
                        })
                        .error(function(data,status){                                
                                console.log('playall request failed');
                        })                        
                    }
                }
            })            

            $scope.$on('onlineStatusChange',function(event,status){
                $scope.onlineStatus = status?"green":"red";
            })            

            $scope.edit= function(e){
                if (e.target.innerText=='Save' && $location.path().indexOf('playlist') != '-1') {
                    $scope.notify= true;                    
                    var createplaylist=[];
                    $rootScope.playlist.forEach(function(itm){                        
                        if(itm.selected == true) createplaylist.push(itm);
                    });                    
                    $http
                    .post('/playlists', { playlist: (createplaylist.length)? createplaylist : '' })
                    .success(function(data, status) {
                        if (data.success) {
                            //console.log(data.stat_message);
                            $route.reload();
                        }
                    })
                    .error(function(data, status) {
                        console.log(status);
                        });
                    $scope.playbutton= true;
                    $scope.showEditButton= $scope.pausebutton= false;
                }
                else if (e.target.innerText=='Edit' && $location.path().indexOf('assets') != '-1') {
                    $location.path($location.path()+"/edit/");
                }else{
                    $scope.goBack();
                }
            }
    }]).
    controller('ReportsCtrl',['$scope',function($scope){
        $scope.$parent.$parent.title='Reports';
        $scope.$parent.$parent.button='edit';
    }]).
    controller('AssetsCtrl',['$scope','$rootScope',
        function($scope, $rootScope){
            $scope.$parent.$parent.title='Assets';
            $scope.$parent.$parent.showEditButton= true;   
            $scope.done = function(files, data) {                             
                if(data.data != null) {                    
                    data.data.forEach(function(itm){
                        if($rootScope.files.indexOf(itm.name) == -1)
                            $rootScope.files.push(itm.name);   
                    });
                };
            }            
    }]).
    controller('AssetViewCtrl',['$scope','$rootScope', '$http','piUrls', '$routeParams',
        function($scope, $rootScope, $http, piUrls, $routeParams){
            $scope.$parent.$parent.showEditButton= false;
            $http
            .get('files/'+$routeParams.file)
            .success(function(data, status) {
                if (data.success) {
                    $rootScope.filedetails = data.data;
                }
            })
            .error(function(data, status) {            
            });

            $scope.play = false;

            $scope.playButtonPressed = function() {
                $scope.play = !$scope.play;
                var param = $scope.play?{play:true}:{stop:true}

                $http
                post(piUrls.playFile+$scope.filedetails.name,param)
                .success(function(data, status) {
                    if (data.success) {
                        console.log(data.stat_message);
                    }
                })
                .error(function(data, status) {
                    console.log(status);
                });
            }
            $scope.imageSrc= function(nme){
                return (nme)? (nme.match(/(jpg|jpeg|png|gif)$/gi)) ? "/media/"+nme : '/media/noimage.jpg': '';
            }            
    }]).
    controller('AssetsEditCtrl',['$scope', '$http', '$rootScope', 'piUrls', '$route',
        function($scope, $http, $rootScope, piUrls, $route){            
            $scope.done = function(files, data) {
                if(data.data != null) {
                    $rootScope.files.push(data.data.name);
                }
            }            
            $scope.delete= function(file){
                $http
                .delete('/files/'+file)
                .success(function(data, status) {
                    if (data.success) {
                        $rootScope.files.splice($rootScope.files.indexOf(file),1);                        
                    }
                })
                .error(function(data, status) {            
                });                            
            }            
            $scope.rename= function(file, index){
                $scope.filescopy= angular.copy($rootScope.files);
                $http
                .post('/files/'+file, {  oldname: $scope.filescopy[index] })
                .success(function(data, status) {
                    $scope.notify= true;
                    if (data.success) {
                        $rootScope.files.splice($rootScope.files.indexOf($scope.filescopy[index]), 1 , file); 
                        $route.reload();
                    }
                })
                .error(function(data, status) {            
                });                                
            }
    }]).
    controller('PlaylistCtrl',['$scope', '$http', '$rootScope', 'piUrls', '$location', '$document', '$window',
        function($scope, $http, $rootScope, piUrls, $location, $document, $window){
        $scope.$parent.title='Playlist';        
        $scope.videos=[];
        $scope.$watch('playlistform.$dirty', function(newVal, oldVal) {
            if(newVal) {
                $scope.$parent.playbutton= $scope.$parent.pausebutton= false;                
                $scope.$parent.showEditButton= true;
            }
        });               
        
        $http
        .get('/files', {params: {cururl: $location.path()} })
        .success(function(data, status) {
            if (data.success) {                
                $scope.$parent.$parent.playingStatus= data.playStatus.playingStatus;
                $scope.$parent.playbutton= (data.playStatus.playingStatus)? false: true;
                $scope.$parent.pausebutton= !$scope.$parent.playbutton;                
                //if(data.playStatus.playingStatus) $scope.$parent.getTime(data.playStatus.since);
                
                $rootScope.playlist=[];
                if(data.data){
                    data.data.forEach(function(itm){
                        $rootScope.playlist.push({
                            filename: itm.filename || itm,
                            duration: itm.duration || 10,
                            selected: itm.selected || 'false',
                            deleted: itm.deleted || false
                        });                    
                    });
                }
            }
        })
        .error(function(data, status) {
        });
        
        $scope.sortableOptions = {
            update: function(e, ui) {
                $scope.$parent.playbutton= $scope.$parent.pausebutton= false;                
                $scope.$parent.showEditButton= true;
            }
        };        
        
        $scope.imgChk= function(name){
            if(name.match(/(jpg|jpeg|png|gif|html)$/gi)){
                $scope.noimg= false;
                return true;
            }else{
                $scope.noimg=true                           
                return false;
            }            
        }
    }]).
    controller('SettingsCtrl',['$scope',function($scope){
        $scope.$parent.$parent.title='Setting';        
    }]).
    controller('AssetsNoticeCtrl',['$scope','$http','piUrls', '$location', '$rootScope', '$route', '$routeParams',
            function($scope, $http, piUrls, $location, $rootScope, $route, $routeParams){           
            $scope.$parent.showEditButton= false;
            $scope.atterr= false;            
            $scope.notice={};
            //$scope.previewimagepath= null;            
            
            if($routeParams.file){                
                $http
                .get('/notice/'+$routeParams.file)                
                .success(function(data, status) {
                    if (data.success) {
                        var dta= data.data;
                        $scope.notice= {
                            title: dta.title,
                            description: dta.description,
                            filename: dta.filename
                        }
                        $scope.previewimagepath= (dta.image != 'undefined')? decodeURIComponent(dta.image) : null;
                    }
                })
                .error(function(data, status) {            
                });
            }
            
            var htmlfiles=[];
            $rootScope.files.forEach(function(name){
                if(name.match(/^notice\d+\.html$/g)){
                    htmlfiles.push(name);
                }
            });            
            $scope.notice.filename= (!htmlfiles.length)? "notice1": "notice"+(htmlfiles.length+1);
            
            $scope.noticedone= function(files, data){                
                if($scope.previewimagepath){
                    $http
                    .delete('/notice/'+$scope.previewimagepath.split('/')[2])                    
                    .success(function(data, status) {
                        if (data.success) {
                            console.log(data.stat_message); 
                        }
                    })
                    .error(function(data, status) {            
                    });
                }
                $scope.previewimagepath= "/media/"+encodeURIComponent(data.data[0].name);
            }
            $scope.savePage= function(){
                $scope.errorcls= (htmlfiles.indexOf($scope.notice.filename+".html") != -1)? true: false;
                var formdata= {
                    title: $scope.notice.title,
                    description: $scope.notice.description,
                    imagepath: encodeURIComponent($scope.previewimagepath) || '',
                    filename: $scope.notice.filename
                };
                if (!$scope.error){
                   $http
                   .post('/notice/save', { formdata: formdata } )
                   .success(function(data, status) {
                        if (data.success){
                            if($rootScope.files.indexOf(data.data.file) == -1)
                                $rootScope.files.push(data.data.file);
                            $location.path('/assets/');                        
                        }
                    })
                   .error(function(data, status) {
                    });
                }                
            }            
            $scope.err= function(file, msg){
                $scope.errmsg= msg+" ("+file+")";
                $scope.$apply(function () {
                    $scope.atterr = "true";
                    setTimeout(function () {                                            
                        $scope.$apply(function () {
                            $scope.atterr= false;
                        });
                    }, 4000);
                });                
            }                       
    }])
