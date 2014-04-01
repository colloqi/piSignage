'use strict';

angular.module('viosUser.controllers',[])

    .controller('LoginCtrl', ['$scope', 'Auth', '$location', '$window','viosUrls',
        function ($scope, Auth, $location,$window,viosUrls) {

            $scope.user = {};
            $scope.errors = {};

            $scope.forgoturl = function() {
                $window.open(viosUrls.forgot, '_system','location=yes');
            }

            $scope.login = function(form) {
                $scope.submitted = true;

                if(form.$valid) {
                    Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then( function() {
                        // Logged in, redirect to home
                        $location.path('/');
                    })
                    .catch( function(err) {
                        err = err.data;
                        $scope.errors.other = err.message;
                    });
                }
            };
    }])

    .controller('SignupCtrl', function ($scope, Auth, $location) {
        $scope.user = {role:'User'};
        $scope.errors = {};
        $scope.roles = ['Physician','Nurse','Support Staff','User'];

        $scope.register = function(form) {
            if(form.$valid) {
                Auth.createUser($scope.user)
                .then( function() {
                    // Account created, redirect to home
                    $location.path('/');
                })
                .catch( function(err) {
                    err = err.data;
                    $scope.serverErrors = '';

                    // Update validity of form fields that match the mongoose errors
                    angular.forEach(err.errors, function(error, field) {
                        //form[field].$setValidity('mongoose', false);
                        $scope.serverErrors += field + ':' +error.type + String.fromCharCode(13);
                    });
                });
            }
        };

        $scope.checkPassword = function() {
            $scope.signinForm.retype_password.$error.dontmatch
                = $scope.user.password !== $scope.user.retype_password;
        };
    }).

    controller('SettingsCtrl', function ($scope, User, Auth) {
        $scope.errors = {};

        $scope.changePassword = function(form) {
            $scope.submitted = true;

            if(form.$valid) {
                Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
                    .then( function() {
                        $scope.message = 'Password successfully changed.';
                    })
                    .catch( function() {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                    });
            }
        };
    });
