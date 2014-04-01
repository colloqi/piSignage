'use strict';

angular.module('piNavbar.controllers', [])
    .controller('NavbarCtrl', function ($scope,$state, $location,$anchorScroll, Auth) {

        $scope.navbarTitle = "";


        $scope.logout = function () {
            Auth.logout()
                .then(function () {
                    $location.path('/login');
                });
        };

        $scope.loadState = function(state) {
            $scope.showMenu = false;
            $state.go(state);
        }

        $scope.showMenu = false;
        $scope.toggleMenu = function(value) {
            if (value)
                $scope.showMenu = value;
            else
                $scope.showMenu = !$scope.showMenu;

            $location.hash("canvas-menu");
            $anchorScroll();
        }

        $scope.$on('$stateChangeSuccess', function (event,toState,toParams,fromState,fromParams) {
            $scope.showMenu = false;
        });

        $scope.$on('onlineStatusChange',function(event,status){
            $scope.onlineStatus = status?"green":"red";
            console.log ("online Status Change: "+status);
        })
    });
