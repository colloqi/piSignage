'use strict';
angular.module('piIndex.controllers', []).

controller('IndexCtrl', function($scope,$rootScope, $location, $http, $state, Auth) {

        $scope.getClass = function(state) {
            if ($state.current.name == state) {
                return "active"
            } else {
                return ""
            }
        }

        $scope.navbarTitle = "";


        $scope.logout = function () {
            Auth.logout()
                .then(function () {
                    $location.path('/login');
                });
        };

});