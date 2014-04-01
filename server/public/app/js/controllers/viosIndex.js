'use strict';
angular.module('viosIndex.controllers', []).

controller('IndexCtrl', function($scope,$rootScope, $location, $http, viosUrls, $state, Auth) {

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

        $scope.loadState = function(state) {
            $state.go(state);
        }

        $scope.post = function(state) {
            $state.go(state);
        }

        $scope.$on('$stateChangeSuccess', function (event,toState,toParams,fromState,fromParams) {
            $scope.postEntityPrefix = toParams.entityId?"/entities/"+toParams.entityId:null;
            $scope.postPersonPrefix = toParams.personId?"/people/"+toParams.personId:null;
        });

});