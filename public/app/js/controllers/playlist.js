'use strict;'

angular.module('piplaylist.controllers', [])
    .controller('PlaylistCtrl',['$scope', '$http', '$rootScope', 'piUrls',
        '$location', '$document', '$window', 'Navbar', '$route',
        function($scope, $http, $rootScope, piUrls, $location, $document, $window, Navbar,$route){

            Navbar.showPrimaryButton= true;
            $http.get(piUrls.getStatus,{}).success(function(data,status){
                Navbar.primaryButtonText= (data.data.playlistOn)? 'STOP': 'PLAY';
            });
            $scope.$parent.title='Playlist';
            $scope.videos=[];
            $scope.$watch('playlistform.$dirty', function(newVal, oldVal) {
                if(newVal) {
                    Navbar.primaryButtonText= "SAVE";
                }
            });

            $http
            .get('/files', {params: {withplaylist: true} })
            .success(function(data, status) {
                if (data.success) {
                    $scope.playlist=[];
                    if(data.data){
                        data.data.forEach(function(itm){
                            $scope.playlist.push({
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
                    Navbar.primaryButtonText= "SAVE";
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

            $scope.pbHandler = function(buttonText){
                if (buttonText == "SAVE") {
                    $scope.notify= true;
                    var createplaylist=[];
                    $scope.playlist.forEach(function(itm){
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
                    Navbar.primaryButtonText = "PLAY";
                } else if (buttonText == "PLAY") {
                    Navbar.primaryButtonText = "WAIT";
                    $http
                        .post('/play/playlists/'+'default', { play: true})
                        .success(function(data,success){
                            if (data.success) {
                                $location.path('/');
                                Navbar.primaryButtonText = "STOP";
                            }else {
                            }
                        })
                        .error(function(data,status){
                            console.log('playall request failed');
                        })
                } else if (buttonText == "STOP") {
                    Navbar.primaryButtonText = "WAIT";
                    $http
                        .post('/play/playlists/'+'default', { stop: true})
                        .success(function(data,success){
                            if (data.success) {
                                Navbar.primaryButtonText = "PLAY";
                            }else {

                            }
                        })
                }
            }
    }])