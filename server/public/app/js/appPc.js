'use strict';

angular.module('piServerApp', [
        'ngResource',
        'ngCookies',
        'ui.router',
        'ui.bootstrap',
        'piConfig',
        'piIndex.controllers',
        'piUser.controllers',
        'piUser.services',
        'pi.services'
    ])
    .config([ '$stateProvider', '$urlRouterProvider','$locationProvider','$httpProvider',
        function ($stateProvider,   $urlRouterProvider,$locationProvider,$httpProvider) {

        // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise)
        $urlRouterProvider.otherwise('/');

        // Use $stateProvider to configure your states.
        $stateProvider

            .state("home", {
                url: "/" ,
                templateUrl: '/app/partials/home/home-pc.html',
                controller: 'IndexCtrl'

                //resolve: {},
                //views: {}

            })

            .state("login", {
                url: "/login",
                templateUrl: '/app/partials/user/login.html',
                controller: 'LoginCtrl',

                noauthenticate: true
            })

            .state("signup", {
                url: "/signup",
                templateUrl: '/app/partials/user/signup.html',
                controller: 'SignupCtrl',

                noauthenticate: true
            })



        $locationProvider.html5Mode(true);

        // Intercept 401s and 403s and redirect you to login
        $httpProvider.interceptors.push(['$q', '$location','$rootScope', function ($q, $location,$rootScope) {

            var onlineStatus = false;

            return {
                'response': function(response) {
                    if (!onlineStatus) {
                        onlineStatus = true;
                        $rootScope.$broadcast('onlineStatusChange',onlineStatus);
                    }
                    return response || $q.when(response);
                },

                'responseError': function (response) {
                    if (onlineStatus) {
                        onlineStatus = false;
                        $rootScope.$broadcast('onlineStatusChange',onlineStatus);
                    }
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }
            };
        }]);



    }])
    .run(['$rootScope', '$state', '$stateParams','$location', 'Auth',
        function ($rootScope,$state, $stateParams, $location, Auth) {

            //add references so that you can access them from any scope within your applications
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;


            // Redirect to login if route requires auth and you're not logged in
            $rootScope.$on('$stateChangeStart', function (event, toState,toParams) {

                if (!toState.noauthenticate && !Auth.isLoggedIn()) {
                    $location.path('/login');
                }

            });
    }]);