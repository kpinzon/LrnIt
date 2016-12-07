 var  modules = modules || [];
(function () {
    'use strict';
    modules.push('Tag');

    angular.module('Tag',['ngRoute'])
    .controller('Tag_list', ['$scope', '$http', function($scope, $http){

        $http.get('/Api/Tag/')
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Tag_details', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

        $http.get('/Api/Tag/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Tag_create', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $scope.data = {};
                $http.get('/Api/Category/')
        .then(function(response){$scope.CategoryId_options = response.data;});
        
        $scope.save = function(){
            $http.post('/Api/Tag/', $scope.data)
            .then(function(response){ $location.path("Tag"); });
        }

    }])
    .controller('Tag_edit', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $http.get('/Api/Tag/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});

                $http.get('/Api/Category/')
        .then(function(response){$scope.CategoryId_options = response.data;});
        
        $scope.save = function(){
            $http.put('/Api/Tag/' + $routeParams.id, $scope.data)
            .then(function(response){ $location.path("Tag"); });
        }

    }])
    .controller('Tag_delete', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){

        $http.get('/Api/Tag/' + $routeParams.id)
        .then(function(response){$scope.data = response.data;});
        $scope.save = function(){
            $http.delete('/Api/Tag/' + $routeParams.id, $scope.data)
            .then(function(response){ $location.path("Tag"); });
        }

    }])

    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
            .when('/Tag', {
                title: 'Tag - List',
                templateUrl: '/Static/Tag_List',
                controller: 'Tag_list'
            })
            .when('/Tag/Create', {
                title: 'Tag - Create',
                templateUrl: '/Static/Tag_Edit',
                controller: 'Tag_create'
            })
            .when('/Tag/Edit/:id', {
                title: 'Tag - Edit',
                templateUrl: '/Static/Tag_Edit',
                controller: 'Tag_edit'
            })
            .when('/Tag/Delete/:id', {
                title: 'Tag - Delete',
                templateUrl: '/Static/Tag_Delete',
                controller: 'Tag_delete'
            })
            .when('/Tag/:id', {
                title: 'Tag - Details',
                templateUrl: '/Static/Tag_Details',
                controller: 'Tag_details'
            })
    }])
;

})();
