'use strict;'

angular.module('piassets.controllers',[])
    .controller('AssetsCtrl',['$scope','$rootScope','$location','Navbar','piUrls','$http',
        function($scope,$rootScope,$location, Navbar,piUrls,$http){
            $scope.navbar = Navbar;

            Navbar.showPrimaryButton= true;
            Navbar.primaryButtonText= "EDIT";
            Navbar.primaryButtonTypeClass= "btn-info";

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

            $scope.pbHandler = function(buttonText){
                if (buttonText == "EDIT") {
                    $location.path('/assets/edit');
                }
            }
    }]).
    controller('AssetViewCtrl',['$scope','$rootScope', '$http','piUrls', '$routeParams','Navbar',
        function($scope, $rootScope, $http, piUrls, $routeParams, Navbar){
            Navbar.showPrimaryButton= false;
            $http
            .get('files/'+$routeParams.file)
            .success(function(data, status) {
                if (data.success) {
                    $scope.filedetails = data.data;
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
    controller('AssetsEditCtrl',['$scope','$rootScope', '$http', 'piUrls', '$route','$location','Navbar',
        function($scope,$rootScope, $http, piUrls, $route,$location,Navbar){

            Navbar.showPrimaryButton= true;
            Navbar.primaryButtonText= "DONE";
            Navbar.primaryButtonTypeClass= "btn-success";
            
            $http
                .get(piUrls.files,{})
                .success(function(data, status) {
                    if (data.success) {
                        $scope.files = data.data;
                    }
                })
                .error(function(data, status) {
                });

            $scope.done = function(files, data) {
                if(data.data != null) {
                    $scope.files.push(data.data.name);
                }
            }            
            $scope.delete= function(file){
                $http
                    .delete('/files/'+file)
                    .success(function(data, status) {
                        if (data.success) {
                            $scope.files.splice($scope.files.indexOf(file),1);                        
                        }
                    })
                    .error(function(data, status) {            
                    });                            
            }            
            $scope.rename= function(file, index){
                $scope.filescopy= angular.copy($scope.files);
                $http
                    .post('/files/'+file, {  oldname: $scope.filescopy[index] })
                    .success(function(data, status) {
                        $scope.notify= true;
                        if (data.success) {
                            $scope.files.splice($scope.files.indexOf($scope.filescopy[index]), 1 , file); 
                            $route.reload();
                        }
                    })
                    .error(function(data, status) {            
                    });                                
            }

            $scope.pbHandler = function(buttonText){
                if (buttonText == "DONE") {
                    $location.path('/assets');
                }
            }
        }])