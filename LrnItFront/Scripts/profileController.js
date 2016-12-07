app.controller("profileController", function ($scope, $http) {
    console.log("profile controller");

        $http.get('api/User')
        .then(function (response) {


        })
    
});