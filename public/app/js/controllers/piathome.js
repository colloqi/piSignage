'use strict;'

angular.module('piathome.controllers', [])
    .factory('Navbar', function() {
        return({showPrimaryButton:false,primaryButtonText:null})
    })
    .controller('NavbarCtrl', ['$scope','$rootScope', '$location','$window','cordovaReady' ,'screenlog','$route','Navbar',
        function($scope,$rootScope, $location,$window,cordovaReady,screenlog, $route,Navbar) {

            $scope.navbar = Navbar;

            cordovaReady.then(function() {
                screenlog.debug("Cordova Service is Ready");
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

                $scope.navbar.showPrimaryButton = false;
                $scope.showSearchButton = false;

                var subpath = next.slice(next.indexOf('#')+2);
                $scope.showBackButton = subpath.indexOf('/') >= 0;

                if (subpath.length == 0) {
                    $scope.showSearchField = false;
                    $scope.search = null;
                }               
            })

            $scope.$on('onlineStatusChange',function(event,status){
                $scope.onlineStatus = status?"green":"red";
            })            

            $scope.primaryButtonClick = function() {
                $route.current.scope.pbHandler($scope.navbar.primaryButtonText);
            }
    }]).
    controller('HomeCtrl', ['$scope','$http','piUrls',function($scope,$http,piUrls) {

        $http.get(piUrls.diskSpace,{}).success(function(data,status){

            $scope.diskSpaceUsed = data.data.diskspace;
            $scope.diskSpaceAvailable = data.data.available;

        })

    }]).
    controller('ReportsCtrl',['$scope',function($scope){

    }]).
    controller('SettingsCtrl',['$scope',function($scope){

    }])
