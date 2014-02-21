'use strict';

angular.module('piathome',
        [
            'piConfig',
            'piathome.controllers','piathome.services','piathome.directives', 'piathome.filters',
            'cordova.services'
        ]).

    config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {

        $httpProvider.interceptors.push('onlineStatusInterceptor');

        $routeProvider.

            //home route
            when('/assets', {
                templateUrl: 'app/partials/home/_home.html'
            }).
            when('/playlist', {
                templateUrl: 'app/partials/playlist.html'
            }).
            when('/setting', {
                templateUrl: 'app/partials/setting.html'
            }).
            when('/reports', {
                templateUrl: 'app/partials/reports.html'
            }).          
            when('/assets/edit/', {
                templateUrl: 'app/partials/assets/edit.html',
                controller: 'assetsEditCtrl'
            }).         
            when('/assets/:file', {
                templateUrl: 'app/partials/assets/details.html',
                controller: 'assetViewCtrl'
            }).
            //default route
            otherwise({redirectTo:'/assets'});
    }]);

