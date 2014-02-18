'use strict;'

angular.module('piathome.controllers', ['ui.bootstrap','ngRoute','ngSanitize','ngAnimate'])
    .controller('MainCtrl', ['$scope','$rootScope', '$location','$window','$http','piUrls',
                    'cordovaReady' ,'cordovaPush','$interval','$timeout','screenlog',
        function($scope,$rootScope, $location,$window,$http,piUrls,cordovaReady,cordovaPush,$interval,$timeout,screenlog) {

            cordovaReady.then(function() {
                screenlog.debug("Cordova Service is Ready");
            });
            
            

            $http.get(piUrls.mediaList,{}).success(function(data, status) {
                if (data.success) {
                    $rootScope.files = data.data;
                }
            }).error(function(data, status) {

            });
            
            $http.get('/indicator',{}).success(function(data,status){
                data = data.split(" ");
                
                console.log("memory used=" + data[data.length-2]);
                $scope.used= data[data.length-2];
                
            }).error(function(data , status){
                cosnole.log('failed to  get indicator data');
                
                });

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
                if (subpath.length == 0) {
                    $scope.showSearchField = false;
                    $scope.search = null;
                }
            })

            $scope.$on('onlineStatusChange',function(event,status){
                $scope.onlineStatus = status?"green":"red";
            })
            
            $scope.edit= function(){
                if ($location.path() == "/") {
                    $location.path('/assets/edit/').replace();
                }
            }

            
    }]).
/*    controller('playerkey',['$scope','$routeParams','$http',function($scope,$routeParams,$http){
      $scope.filename= ($routeParams.file).slice(1,($routeParams.file).length);
      
      $scope.play= function(ent){
      $scope.buttonshow = !$scope.buttonshow  ;
      $scope.buttonhide = !$scope.buttonhide ;
        $http.post('/key',{ keypress : 'play' }).success(function(data,status){
            if (data.success) {
               console.log(data); 
            }
        }).error(function(data,status){
            console.log(status);
        });
      }
      
        $scope.stopplay= function(){
            $http.post('/key',{ keypress : 'stop' }).success(function(data,status){
                if (data.success) {
                   console.log(data); 
                }
            }).error(function(data,status){
                console.log(status);
            });
        }
    }]). */
    controller('reportCtrl',['$scope',function($scope){
        $scope.$parent.$parent.title='Reports';
        $scope.$parent.$parent.button='edit';
    }]).
    controller('assetsCtrl',['$scope','$rootScope',
        function($scope, $rootScope){
            $scope.done = function(files, data) {
                if(data.data != null) {
                    $rootScope.files.push(data.data.name);
                }
            }  
    }]).
    controller('assetViewCtrl',['$scope','$rootScope', '$http','piUrls', '$routeParams',
        function($scope, $rootScope, $http, piUrls, $routeParams){
            
            $http.get(piUrls.fileDetail,{ params: { file: $routeParams.file} }).success(function(data, status) {
            if (data.success) {
                $rootScope.filedetails = data;
                }
            }).error(function(data, status) {            
            });
            $scope.buttonshow = true;
            $scope.buttonhide = false;
            
            $scope.playFile = function(file) {
                console.log(file);
                $scope.buttonshow = !$scope.buttonshow  ;
                $scope.buttonhide = !$scope.buttonhide ;
                $http.post(piUrls.playFile,{file : file , state :$scope.buttonshow }).success(function(data, status) {
                    if (data.success) {
                        console.log(data.stat_message);
                    }
                }).error(function(data, status) {
                        console.log(status);
                    });
            }
            $scope.stopplay = function(){
                    $http.post(piUrls.playFile,{ playing : 'stop' }).success(function(data, status) {
                            if (data.success) {
                                console.log(data.stat_message);
                            }
                        }).error(function(data, status) {
                                console.log(status);
                            });
            }
    }]).
    controller('assetsEditCtrl',['$scope', '$http', '$rootScope',
        function($scope, $http, $rootScope){          
            $scope.done = function(files, data) {
                if(data.data != null) {
                    $rootScope.files.push(data.data.name);
                }
            }
    }]).
    controller('assetsDeleteCtrl',['$scope','$location', '$http', '$rootScope', '$routeParams', 'piUrls',
        function($scope, $location, $http, $rootScope, $routeParams, piUrls){
            var file= $routeParams.file;
            if (file) {
                $http.get(piUrls.fileDelete,{ params: { file: file} }).success(function(data, status) {
                    if (data.success) {
                        $rootScope.files.splice($rootScope.files.indexOf(file),1);                        
                        $location.path("/").replace();
                    }
                }).error(function(data, status) {            
                });
            }           
    }])
    
