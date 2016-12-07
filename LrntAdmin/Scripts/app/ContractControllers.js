 var  modules = modules || [];
(function () {
    'use strict';
    modules.push('Contract');

    angular.module('Contract',['ngRoute'])
    .controller('Contract_list', ['$scope', '$http', function($scope, $http){

        $http.get('/Api/Contract/')
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Contract_details', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

        $http.get('/Api/Contract/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Contract_create', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $scope.data = {};
        
        $scope.save = function(){
            $http.post('/Api/Contract/', $scope.data)
            .then(function(response){ $location.path("Contract"); });
        }

    }])
    .controller('Contract_edit', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $http.get('/Api/Contract/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});

        
        $scope.save = function(){
            $http.put('/Api/Contract/' + $routeParams.id, $scope.data)
            .then(function(response){ $location.path("Contract"); });
        }

    }])
    .controller('Contract_delete', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $http.get('/Api/Contract/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});
        $scope.save = function(){
            $http.delete('/Api/Contract/' + $routeParams.id, $scope.data)
            .then(function(response){ $location.path("Contract"); });
        }

    }])

    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
            .when('/Contract', {
                title: 'Contract - List',
                templateUrl: '/Static/Contract_List',
                controller: 'Contract_list'
            })
            .when('/Contract/Create', {
                title: 'Contract - Create',
                templateUrl: '/Static/Contract_Edit',
                controller: 'Contract_create'
            })
            .when('/Contract/Edit/:id', {
                title: 'Contract - Edit',
                templateUrl: '/Static/Contract_Edit',
                controller: 'Contract_edit'
            })
            .when('/Contract/Delete/:id', {
                title: 'Contract - Delete',
                templateUrl: '/Static/Contract_Delete',
                controller: 'Contract_delete'
            })
            .when('/Contract/:id', {
                title: 'Contract - Details',
                templateUrl: '/Static/Contract_Details',
                controller: 'Contract_details'
            })
    }])
;

})();
