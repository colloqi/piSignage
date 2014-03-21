'use strict;'

angular.module('piassets.controllers', ['ui.bootstrap','ngRoute','ngSanitize','ngAnimate'])
    .controller('AssetsCtrl',['$scope','Navbar','piUrls','$http',
        function($scope, Navbar,piUrls,$http){
            $scope.navabar = Navbar;

            $scope.navabar.showPrimaryButton= true;
            $scope.navabar.primaryButtonText= "EDIT";

            $http.get(piUrls.files,{})
                .success(function(data, status) {
                    if (data.success) {
                        $scope.files = data.data;
                    }
                })
                .error(function(data, status) {
                });

            $scope.done = function(files, data) {
                if(data.data != null) {                    
                    data.data.forEach(function(itm){
                        if($scope.files.indexOf(itm.name) == -1)
                            $scope.files.push(itm.name);
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
                .post(piUrls.playFile+$scope.filedetails.name,param)
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
    controller('AssetsEditCtrl',['$scope', '$http', '$rootScope', 'piUrls', '$route','Navbar',
        function($scope, $http, $rootScope, piUrls, $route,Navbar){

            Navbar.showPrimaryButton= true;
            Navbar.primaryButtonText= "DONE";


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
        }])