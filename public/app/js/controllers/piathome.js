'use strict;'

angular.module('piathome.controllers', ['ui.bootstrap','ngRoute','ngSanitize','ngAnimate'])
    .factory('Navbar', function() {
        return({showPrimaryButton:false,primaryButtonText:null})
    })
    .controller('NavbarCtrl', ['$scope','$rootScope', '$location','$window','$http','piUrls',
                    'cordovaReady' ,'cordovaPush','$interval','$timeout','screenlog','$route','Navbar',
        function($scope,$rootScope, $location,$window,$http,piUrls,cordovaReady,cordovaPush,$interval,$timeout,screenlog, $route,Navbar) {

            $scope.navbar = Navbar;

            $scope.playingStatus;
            cordovaReady.then(function() {
                screenlog.debug("Cordova Service is Ready");
            });
            
            $rootScope.playlist=[];            

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

                $scope.navbar.showPrimaryButton = false;

                var subpath = next.slice(next.indexOf('#')+2);
                $scope.showBackButton = subpath.indexOf('/') >= 0;
                $scope.showSearchButton = false;

                if (subpath.length == 0) {
                    $scope.showSearchField = false;
                    $scope.search = null;
                }               

            })            

            $scope.$on('onlineStatusChange',function(event,status){
                $scope.onlineStatus = status?"green":"red";
            })            


            $scope.primaryButtonClick = function() {
                switch ($scope.navbar.primaryButtonText) {
                    case 'SAVE':
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
                            $scope.navbar.primaryButtonText = "PLAY";
                        break;
                    case 'EDIT': $location.path($location.path()+"/edit/");
                        break;
                    case 'PLAY':
                        $scope.$parent.playingStatus= true;
                        $http
                            .post('/play/playlists/'+'default', { play: true})
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
                    case 'STOP':
                        $scope.$parent.playingStatus= false;
                        $http
                            .post('/play/playlists/'+'default', { stop: true})
                            .success(function(data,success){
                                if (data.success) {

                                }else {

                                }
                            })

                    default:  $scope.goBack();
                }
            }
    }]).
    controller('HomeCtrl', ['$scope','$http','piUrls',function($scope,$http,piUrls) {

        $http.get(piUrls.diskSpace,{}).success(function(data,status){

            $scope.diskSpaceUsed = data.data.diskspace;
            $scope.diskSpaceAvailable = data.data.available;

        })

    }]).
    controller('ReportsCtrl',['$scope',function($scope){
        $scope.$parent.$parent.title='Reports';
        $scope.$parent.$parent.button='edit';
    }]).
    controller('SettingsCtrl',['$scope',function($scope){
        $scope.$parent.$parent.title='Setting';        
    }])
