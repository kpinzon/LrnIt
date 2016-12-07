 var  modules = modules || [];
(function () {
    'use strict';
    modules.push('Category');

    angular.module('Category',['ngRoute'])
    .controller('Category_list', ['$scope', '$http', function($scope, $http){

        $http.get('/Api/Category/')
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Category_details', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

        $http.get('/Api/Category/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Category_create', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $scope.data = {};
        
        $scope.save = function(){
            $http.post('/Api/Category/', $scope.data)
            .then(function(response){ $location.path("Category"); });
        }

    }])
    .controller('Category_edit', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $http.get('/Api/Category/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});

        
        $scope.save = function(){
            $http.put('/Api/Category/' + $routeParams.id, $scope.data)
            .then(function(response){ $location.path("Category"); });
        }

    }])
    .controller('Category_delete', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $http.get('/Api/Category/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});
        $scope.save = function(){
            $http.delete('/Api/Category/' + $routeParams.id, $scope.data)
            .then(function(response){ $location.path("Category"); });
        }

    }])

    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
            .when('/Category', {
                title: 'Category - List',
                templateUrl: '/Static/Category_List',
                controller: 'Category_list'
            })
            .when('/Category/Create', {
                title: 'Category - Create',
                templateUrl: '/Static/Category_Edit',
                controller: 'Category_create'
            })
            .when('/Category/Edit/:id', {
                title: 'Category - Edit',
                templateUrl: '/Static/Category_Edit',
                controller: 'Category_edit'
            })
            .when('/Category/Delete/:id', {
                title: 'Category - Delete',
                templateUrl: '/Static/Category_Delete',
                controller: 'Category_delete'
            })
            .when('/Category/:id', {
                title: 'Category - Details',
                templateUrl: '/Static/Category_Details',
                controller: 'Category_details'
            })
    }])
;

})();
