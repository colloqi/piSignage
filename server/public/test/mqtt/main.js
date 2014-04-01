
angular.module('app',
                ['ngResource',
                 'ngSanitize'])
.controller("MainCtrl", function($scope, $http){
    $scope.stream_id= "";
    $scope.log= "";
    $scope.messages= [];
    
    $scope.listenforServerMessages= function(url){
        var es = new EventSource(url);
        es.onmessage = function(e) {
            $scope.$apply(function(){
                $scope.messages.push(e.data);
            });
        };
    };
    
    $scope.getMQTTSubscriptions= function(input){
        var patient_ids= input.split(",");
        if (patient_ids.length == 0) {
            patient_ids[0]= "*";
        }
        var subscriptions= { "vitals":[], "alerts":[]};
        for (var i=0; i< patient_ids.length; i++) {
            subscriptions["vitals"].push(patient_ids[i]);
            subscriptions["alerts"].push(patient_ids[i]);
        }
        return {subscriptions: subscriptions};
    };

    $scope.subscribe= function(){
        $http.post("/subscribe", $scope.getMQTTSubscriptions($scope.subscriptions))
        .success(function(data){
            $scope.stream_id= data.id
            $scope.listenforServerMessages('/stream/'+$scope.stream_id);
        });
    };
    
    $scope.unsubscribe= function(){
        $http.post("/unsubscribe/"+$scope.stream_id, $scope.getMQTTSubscriptions($scope.unsubscriptions))
        .success(function(data){
            
        });
    };
});
