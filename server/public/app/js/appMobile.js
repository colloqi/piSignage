'use strict';

angular.module('swserverApp', [
        'ngResource',
        'ngCookies',
        'ui.router',
        'ui.bootstrap',
        'viosConfig',
        'viosNavbar.controllers',
        'viosUser.controllers',
        'viosEntity.controllers',
        'viosCircle.controllers',
        'viosPeople.controllers',
        'viosPost.controllers',
        'viosUser.services',
        'vios.services'
    ])
    .config([ '$stateProvider', '$urlRouterProvider','$locationProvider','$httpProvider',
        function ($stateProvider,   $urlRouterProvider,$locationProvider,$httpProvider) {

        // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise)
        $urlRouterProvider.otherwise('/newsfeed');

        // Use $stateProvider to configure your states.
        $stateProvider

            .state("home", {
                abstract: true,
                url: "",
                templateUrl: '/app/partials/home/home-mobile.html',
                controller: 'NavbarCtrl'

                //resolve: {},
                //views: {}

            })

            .state("home.wall", {
                url: "/wall",
                templateUrl: '/app/partials/post/_posts.html',
                controller: 'WallCtrl'
            })


            .state("home.wall_person", {
                url: "/people/:personId/wall?person",
                templateUrl: '/app/partials/post/_posts.html',
                controller: 'WallCtrl'
            })

            .state("home.wall_entity_person", {
                url: "/entities/:entityId/people/:personId/wall?person",
                templateUrl: '/app/partials/post/_posts.html',
                controller: 'WallCtrl'
            })


            .state("home.wall_entity", {
                url: "/entities/:entityId/wall?entity",
                templateUrl: '/app/partials/post/_posts.html',
                controller: 'WallCtrl'
            })

            .state("home.newsfeed", {
                url: "/newsfeed",
                templateUrl: '/app/partials/post/_posts.html',
                controller: 'NewsFeedCtrl',
                resolve: {
                    alertsStream: function($rootScope,viosAlert) {
                        //create stream
                        if ($rootScope.currentUser)
                            return viosAlert.save().$promise;
                        else
                            return;
                    }
                },
                onExit: function($rootScope,viosAlert,alertsStream) {            //resolve parameters are accessible here

                    if (alertsStream && alertsStream.data)
                        viosAlert.remove({id:alertsStream.data.id});
                }
            })

            .state("home.newsfeed_entity_person", {
                url: "/entities/:entityId/people/:personId/newsfeed?person",
                templateUrl: '/app/partials/post/_posts.html',
                controller: 'NewsFeedCtrl'
            })


            .state("home.newsfeed_entity", {
                url: "/entities/:entityId/newsfeed?entity",
                templateUrl: '/app/partials/post/_posts.html',
                controller: 'NewsFeedCtrl'
            })

            .state("home.vitals", {
                url: "/vitals",
                templateUrl: '/app/partials/post/_vitals.html',
                controller: 'VitalsFeedCtrl',
                resolve: {
                    vitalsStream: function($rootScope,viosVital) {
                        //create stream
                        if ($rootScope.currentUser)
                            return viosVital.save().$promise;
                        else
                            return;
                    }
                },
                onExit: function($rootScope,viosVital,vitalsStream) {            //resolve parameters are accessible here

                    if (vitalsStream && vitalsStream.data)
                        viosVital.remove({id:vitalsStream.data.id});
                }
            })

            .state("home.actions", {
                url: "/actions",
                templateUrl: '/app/partials/post/_actions.html',
                controller: 'ActionsCtrl'
            })

            .state("home.entities", {
                url: "/entities",
                templateUrl: '/app/partials/entity/_entities.html',
                controller: 'EntitiesCtrl'
            })

            .state("home.show_entity", {
                url: '/entities/show/:entityId',
                templateUrl: '/app/partials/entity/_show_entity.html',
                controller: 'ShowEntityCtrl'
            })

            .state("home.edit_entity", {
                url: '/entities/:entityId?mode',
                views: {
                    '': {
                        templateUrl: '/app/partials/entity/_edit_entity.html',
                        controller: 'EditEntityCtrl'
                    }
                }
            })

            .state("home.circles", {
                url: "/circles",
                templateUrl: '/app/partials/circle/_circles.html',
                controller: 'CirclesCtrl'
            })

            .state("home.show_circle", {
                url: '/circles/show/:circleId',
                templateUrl: '/app/partials/circle/_show_circle.html',
                controller: 'ShowCircleCtrl'
            })

            .state("home.edit_circle", {
                url: '/circles/:circleId',
                templateUrl: '/app/partials/circle/_edit_circle.html',
                controller: 'EditCircleCtrl'
            })

            .state("home.edit_entity_circle", {
                url: '/entities/:entityId/circles/:circleId',
                templateUrl: '/app/partials/circle/_edit_circle.html',
                controller: 'EditCircleCtrl'
            })

            .state("home.mycircles", {
                url: "/mycircles",
                templateUrl: '/app/partials/people/_mycircles.html',
                controller: 'MyCirclesCtrl'
            })

            .state("home.people", {
                url: "/people",
                templateUrl: '/app/partials/people/_people.html',
                controller: 'PeopleCtrl',
                resolve: {
                    circles: function(viosCircle) {
                        return viosCircle.query().$promise;
                    }
                }
            })

            .state("home.entity_people", {
                url: "/entities/:entityId/people?as",
                templateUrl: '/app/partials/people/_people.html',
                controller: 'PeopleCtrl',
                resolve: {
                    circles: function(viosEntityCircle,$stateParams) {
                        return viosEntityCircle.query({id:$stateParams.entityId}).$promise;
                    }
                }
            })

            .state("home.edit_person", {
                url: "/people/:personId?person",
                templateUrl: '/app/partials/people/_edit_person.html',
                controller: 'EditPersonCtrl',
                resolve: {
                    circles: function(viosCircle) {
                        return viosCircle.query().$promise;
                    }
                }
            })

            .state("home.edit_entity_person", {
                url: "/entities/:entityId/people/:personId?person&as",
                templateUrl: '/app/partials/people/_edit_person.html',
                controller: 'EditPersonCtrl',
                resolve: {
                    circles: function(viosEntityCircle,$stateParams) {
                        return viosEntityCircle.query({id:$stateParams.entityId}).$promise;
                    }
                }
            })

            .state("edit_post", {
                url: "/posts/:postId",
                templateUrl: '/app/partials/post/_edit_post.html',
                controller: 'EditPostCtrl',
                resolve: {
                    circles: function(viosCircle) {
                        return viosCircle.query().$promise;
                    }
                }

            })

            .state("edit_entity_post", {
                url: "/entities/:entityId/posts/:postId",
                templateUrl: '/app/partials/post/_edit_post.html',
                controller: 'EditPostCtrl',
                resolve: {
                    circles: function(viosEntityCircle,$stateParams) {
                        return viosEntityCircle.query({id:$stateParams.entityId}).$promise;
                    }
                }

            })


            .state("edit_person_post", {
                url: "/people/:personId/posts/:postId",
                templateUrl: '/app/partials/post/_edit_post.html',
                controller: 'EditPostCtrl',
                resolve: {
                    circles: function(viosCircle) {
                        return viosCircle.query().$promise;
                    }
                }

            })

            .state("edit_entity_person_post", {
                url: "/entities/:entityId/people/:personId/posts/:postId",
                templateUrl: '/app/partials/post/_edit_post.html',
                controller: 'EditPostCtrl',
                resolve: {
                    circles: function(viosEntityCircle,$stateParams) {
                        return viosEntityCircle.query({id:$stateParams.entityId}).$promise;
                    }
                }

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