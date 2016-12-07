 var  modules = modules || [];
(function () {
    'use strict';
    modules.push('Expertise');

    angular.module('Expertise',['ngRoute'])
    .controller('Expertise_list', ['$scope', '$http', function($scope, $http){

        $http.get('/Api/Expertise/')
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Expertise_details', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

        $http.get('/Api/Expertise/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Expertise_create', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $scope.data = {};
                $http.get('/Api/User/')
        .then(function(response){$scope.UserId_options = response.data;});
        
        $scope.save = function(){
            $http.post('/Api/Expertise/', $scope.data)
            .then(function(response){ $location.path("Expertise"); });
        }

    }])
    .controller('Expertise_edit', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $http.get('/Api/Expertise/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});

                $http.get('/Api/User/')
        .then(function(response){$scope.UserId_options = response.data;});
        
        $scope.save = function(){
            $http.put('/Api/Expertise/' + $routeParams.id, $scope.data)
            .then(function(response){ $location.path("Expertise"); });
        }

    }])
    .controller('Expertise_delete', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $http.get('/Api/Expertise/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});
        $scope.save = function(){
            $http.delete('/Api/Expertise/' + $routeParams.id, $scope.data)
            .then(function(response){ $location.path("Expertise"); });
        }

    }])

    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
            .when('/Expertise', {
                title: 'Expertise - List',
                templateUrl: '/Static/Expertise_List',
                controller: 'Expertise_list'
            })
            .when('/Expertise/Create', {
                title: 'Expertise - Create',
                templateUrl: '/Static/Expertise_Edit',
                controller: 'Expertise_create'
            })
            .when('/Expertise/Edit/:id', {
                title: 'Expertise - Edit',
                templateUrl: '/Static/Expertise_Edit',
                controller: 'Expertise_edit'
            })
            .when('/Expertise/Delete/:id', {
                title: 'Expertise - Delete',
                templateUrl: '/Static/Expertise_Delete',
                controller: 'Expertise_delete'
            })
            .when('/Expertise/:id', {
                title: 'Expertise - Details',
                templateUrl: '/Static/Expertise_Details',
                controller: 'Expertise_details'
            })
    }])
;

})();
