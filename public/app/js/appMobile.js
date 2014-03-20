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
                controller: 'AssetsCtrl',
                templateUrl: 'app/partials/assets/_assets.html'
            }).
            when('/playlists', {
                templateUrl: 'app/partials/playlist.html',
                controller: 'PlaylistCtrl'
            }).
            when('/settings', {
                templateUrl: 'app/partials/_settings.html',
                controller: 'SettingsCtrl'
            }).
            when('/reports', {
                templateUrl: 'app/partials/_reports.html',
                controller: 'ReportsCtrl'
            }).          
            when('/assets/edit/', {
                templateUrl: 'app/partials/assets/_edit.html',
                controller: 'AssetsEditCtrl'
            }).
            when('/assets/notice/', {
                templateUrl: 'app/partials/assets/_notice.html',
                controller: 'AssetsNoticeCtrl'
            }).
            when('/assets/notice/:file', {
                templateUrl: 'app/partials/assets/_notice.html',
                controller: 'AssetsNoticeCtrl'
            }).
            when('/assets/:file', {
                templateUrl: 'app/partials/assets/_details.html',
                controller: 'AssetViewCtrl'
            }).
            //default route
            otherwise({redirectTo:'/'});
    }]);

