'use strict;'

angular.module('pinotice.controllers', ['ui.bootstrap','ngRoute','ngSanitize','ngAnimate'])
    .controller('AssetsNoticeCtrl',['$scope','$http','piUrls', '$location', '$rootScope', '$route', '$routeParams',
        function($scope, $http, piUrls, $location, $rootScope, $route, $routeParams){           
        $scope.$parent.showEditButton= false;
        $scope.atterr= false;            
        $scope.notice={};
        //$scope.previewimagepath= null;            
        
        if($routeParams.file){                
            $http
            .get('/notice/'+$routeParams.file)                
            .success(function(data, status) {
                if (data.success) {
                    var dta= data.data;
                    $scope.notice= {
                        title: dta.title,
                        description: dta.description,
                        filename: dta.filename
                    }
                    $scope.previewimagepath= (dta.image != 'undefined')? decodeURIComponent(dta.image) : null;
                }
            })
            .error(function(data, status) {            
            });
        }
        
        var htmlfiles=[];
        $rootScope.files.forEach(function(name){
            if(name.match(/^notice\d+\.html$/g)){
                htmlfiles.push(name);
            }
        });            
        $scope.notice.filename= (!htmlfiles.length)? "notice1": "notice"+(htmlfiles.length+1);
        
        $scope.noticedone= function(files, data){                
            if($scope.previewimagepath){
                $http
                .delete('/notice/'+$scope.previewimagepath.split('/')[2])                    
                .success(function(data, status) {
                    if (data.success) {
                        console.log(data.stat_message); 
                    }
                })
                .error(function(data, status) {            
                });
            }
            $scope.previewimagepath= "/media/"+encodeURIComponent(data.data[0].name);
        }
        $scope.savePage= function(){
            $scope.errorcls= (htmlfiles.indexOf($scope.notice.filename+".html") != -1)? true: false;
            var formdata= {
                title: $scope.notice.title,
                description: $scope.notice.description,
                imagepath: encodeURIComponent($scope.previewimagepath) || '',
                filename: $scope.notice.filename
            };
            if (!$scope.error){
               $http
               .post('/notice/save', { formdata: formdata } )
               .success(function(data, status) {
                    if (data.success){
                        if($rootScope.files.indexOf(data.data.file) == -1)
                            $rootScope.files.push(data.data.file);
                        $location.path('/assets/');                        
                    }
                })
               .error(function(data, status) {
                });
            }                
        }            
        $scope.err= function(file, msg){
            $scope.errmsg= msg+" ("+file+")";
            $scope.$apply(function () {
                $scope.atterr = "true";
                setTimeout(function () {                                            
                    $scope.$apply(function () {
                        $scope.atterr= false;
                    });
                }, 4000);
            });                
        }                       
}])