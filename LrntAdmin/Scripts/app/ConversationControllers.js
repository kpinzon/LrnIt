 var  modules = modules || [];
(function () {
    'use strict';
    modules.push('Conversation');

    angular.module('Conversation',['ngRoute'])
    .controller('Conversation_list', ['$scope', '$http', function($scope, $http){

        $http.get('/Api/Conversation/')
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Conversation_details', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

        $http.get('/Api/Conversation/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Conversation_create', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $scope.data = {};
        
        $scope.save = function(){
            $http.post('/Api/Conversation/', $scope.data)
            .then(function(response){ $location.path("Conversation"); });
        }

    }])
    .controller('Conversation_edit', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $http.get('/Api/Conversation/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});

        
        $scope.save = function(){
            $http.put('/Api/Conversation/' + $routeParams.id, $scope.data)
            .then(function(response){ $location.path("Conversation"); });
        }

    }])
    .controller('Conversation_delete', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $http.get('/Api/Conversation/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});
        $scope.save = function(){
            $http.delete('/Api/Conversation/' + $routeParams.id, $scope.data)
            .then(function(response){ $location.path("Conversation"); });
        }

    }])

    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
            .when('/Conversation', {
                title: 'Conversation - List',
                templateUrl: '/Static/Conversation_List',
                controller: 'Conversation_list'
            })
            .when('/Conversation/Create', {
                title: 'Conversation - Create',
                templateUrl: '/Static/Conversation_Edit',
                controller: 'Conversation_create'
            })
            .when('/Conversation/Edit/:id', {
                title: 'Conversation - Edit',
                templateUrl: '/Static/Conversation_Edit',
                controller: 'Conversation_edit'
            })
            .when('/Conversation/Delete/:id', {
                title: 'Conversation - Delete',
                templateUrl: '/Static/Conversation_Delete',
                controller: 'Conversation_delete'
            })
            .when('/Conversation/:id', {
                title: 'Conversation - Details',
                templateUrl: '/Static/Conversation_Details',
                controller: 'Conversation_details'
            })
    }])
;

})();
