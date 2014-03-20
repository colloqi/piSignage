'use strict';

angular.module('piathome',
        [
            'piConfig', 'ui.sortable',
            'piathome.controllers','piathome.services','piathome.directives', 'piathome.filters',
            'cordova.services'
        ]).

    config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {

        $httpProvider.interceptors.push('onlineStatusInterceptor');

        $routeProvider.

            //home route
            when('/', {
                templateUrl: 'app/partials/home/_home.html'
            }).
            when('/assets', {
                controller: 'assetsCtrl',
                templateUrl: 'app/partials/assets/_assets.html'
            }).
            when('/playlist', {
                templateUrl: 'app/partials/playlist.html',
                controller: 'playlistCtrl'
            }).
            when('/setting', {
                templateUrl: 'app/partials/setting.html'
            }).
            when('/reports', {
                templateUrl: 'app/partials/reports.html'
            }).          
            when('/assets/edit/', {
                templateUrl: 'app/partials/assets/_edit.html',
                controller: 'assetsEditCtrl'
            }).
            when('/assets/notice/', {
                templateUrl: 'app/partials/assets/_notice.html',
                controller: 'assetsNoticeCtrl'
            }).
            when('/assets/notice/:file', {
                templateUrl: 'app/partials/assets/_notice.html',
                controller: 'assetsNoticeCtrl'
            }).
            when('/assets/:file', {
                templateUrl: 'app/partials/assets/_details.html',
                controller: 'assetViewCtrl'
            }).
            //default route
            otherwise({redirectTo:'/'});
    }]);

