 var  modules = modules || [];
(function () {
    'use strict';
    modules.push('Message');

    angular.module('Message',['ngRoute'])
    .controller('Message_list', ['$scope', '$http', function($scope, $http){

        $http.get('/Api/Message/')
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Message_details', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

        $http.get('/Api/Message/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Message_create', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $scope.data = {};
                $http.get('/Api/Conversation/')
        .then(function(response){$scope.ConversationId_options = response.data;});
                $http.get('/Api/User/')
        .then(function(response){$scope.UserId_options = response.data;});
        
        $scope.save = function(){
            $http.post('/Api/Message/', $scope.data)
            .then(function(response){ $location.path("Message"); });
        }

    }])
    .controller('Message_edit', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $http.get('/Api/Message/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});

                $http.get('/Api/Conversation/')
        .then(function(response){$scope.ConversationId_options = response.data;});
                $http.get('/Api/User/')
        .then(function(response){$scope.UserId_options = response.data;});
        
        $scope.save = function(){
            $http.put('/Api/Message/' + $routeParams.id, $scope.data)
            .then(function(response){ $location.path("Message"); });
        }

    }])
    .controller('Message_delete', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $http.get('/Api/Message/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});
        $scope.save = function(){
            $http.delete('/Api/Message/' + $routeParams.id, $scope.data)
            .then(function(response){ $location.path("Message"); });
        }

    }])

    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
            .when('/Message', {
                title: 'Message - List',
                templateUrl: '/Static/Message_List',
                controller: 'Message_list'
            })
            .when('/Message/Create', {
                title: 'Message - Create',
                templateUrl: '/Static/Message_Edit',
                controller: 'Message_create'
            })
            .when('/Message/Edit/:id', {
                title: 'Message - Edit',
                templateUrl: '/Static/Message_Edit',
                controller: 'Message_edit'
            })
            .when('/Message/Delete/:id', {
                title: 'Message - Delete',
                templateUrl: '/Static/Message_Delete',
                controller: 'Message_delete'
            })
            .when('/Message/:id', {
                title: 'Message - Details',
                templateUrl: '/Static/Message_Details',
                controller: 'Message_details'
            })
    }])
;

})();
