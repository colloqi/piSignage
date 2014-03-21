'use strict;'

angular.module('piplaylist.controllers', ['ui.bootstrap','ngRoute','ngSanitize','ngAnimate'])
    .controller('PlaylistCtrl',['$scope', '$http', '$rootScope', 'piUrls',
        '$location', '$document', '$window', 'Navbar',
        function($scope, $http, $rootScope, piUrls, $location, $document, $window, Navbar){
        Navbar.showPrimaryButton= true;
        if(Navbar.primaryButtonText != 'STOP') Navbar.primaryButtonText= "PLAY";
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
    }])