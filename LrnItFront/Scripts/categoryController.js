app.controller("categoryController", function ($scope, $http, $stateParams, lrnItService, $state) {
    $scope.users = lrnItService.usersInCategory;
    $scope.topicName = lrnItService.getCurrentTopic();
    $scope.lrnItService = lrnItService;
    


    $scope.getUsersInCateg = function (Id, name) {
        $http.get('api/User?CategoryId=' + Id)
        .then(function (response) {
            lrnItService.setCurrentTopic(name);
            $scope.tempResponse = response.data;
           
                for (var i = 0; i < $scope.tempResponse.length; i++) {

                    for (var j = 0; j < $scope.tempResponse[i].Tags.length; j++) {
                        $scope.tempResponse[i].Tags[j] = getJsonNetObject($scope.tempResponse[i].Tags[j], response.data);
                    }
                }
            
            
            

            lrnItService.setUsersInCategory($scope.tempResponse);
            

            $state.go('category')

            

        })

        
    }

    $scope.viewProfile = function (user, id) {

        
            lrnItService.setProfileViewUser(user);
            lrnItService.setIsProfileOfSignedInUser();
            
                $http.get('api/User?ProfileId=' + id)
                .then(function (response) {
                    lrnItService.setProfileViewUser(response.data);

                    $http.get('api/Tag?UserId=' + id)
                        .then(function (response) {
                            lrnItService.setProfileViewUserTags(response.data);
                           
                            $http.get('api/Expertise?UserId=' + id)
                                .then(function (response) {
                           lrnItService.setProfileViewExpertise(response.data);
                           $state.go('profile');
                                 })
                        })
                })
            
        
    }

    $scope.signedIn = lrnItService.signedInUser;
    
    $http.get('api/Category?$expand=Tags')
    .then(function (response) {

        $scope.tempCategory = response.data;

        for (var i = 0; i < $scope.tempCategory.length; i++) {
            for (var j = 0; j < $scope.tempCategory[i].Tags.length; j++) {
                $scope.tempCategory[i].Tags[j] = getJsonNetObject($scope.tempCategory[i].Tags[j], response.data)
            }
        }
        $scope.categories = $scope.tempCategory;
        lrnItService.setCategories($scope.categories);
          lrnItService.categories;
        
    })

    $scope.sendMessage = function (user) {
        lrnItService.setUserToMessage(user);
        $state.go('sendMessage');
    }

    //get users when clicking a tag

    $scope.goToUsersInTopic = function (query, Id, name) {
        lrnItService.setUsersInCategory(null);
        $http.get('api/User' + query + Id)
        .then(function (response) {
            lrnItService.setCurrentTopic(name);
            $scope.tempResponse = response.data;

            $http.get('Api/Tag/')
            .then(function (response) {
                for (var i = 0; i < $scope.tempResponse.length; i++) {

                    for (var j = 0; j < $scope.tempResponse[i].Tags.length; j++) {
                        $scope.tempResponse[i].Tags[j] = getJsonNetObject($scope.tempResponse[i].Tags[j], response.data);
                    }
                }

            })


            lrnItService.setUsersInCategory($scope.tempResponse)
            $state.go('category', {}, { reload: true })



        })

    }

    // function to return a JSON object form a JSON.NET serialized object with $id/$ref key-values
    // obj: the obj of interest.
    // parentObj: the top level object containing all child objects as serialized by JSON.NET.
    function getJsonNetObject(obj, parentObj) {
        // check if obj has $id key.
        var objId = obj["$id"];
        if (typeof (objId) !== "undefined" && objId != null) {
            // $id key exists, so you have the actual object... return it
            return obj;
        }
        // $id did not exist, so check if $ref key exists.
        objId = obj["$ref"];
        if (typeof (objId) !== "undefined" && objId != null) {
            // $ref exists, we need to get the actual object by searching the parent object for $id
            return getJsonNetObjectById(parentObj, objId, 0);
        }
        // $id and $ref did not exist... return null
        return null;
    }

    // function to return a JSON object by $id
    // parentObj: the top level object containing all child objects as serialized by JSON.NET.
    // id: the $id value of interest
    function getJsonNetObjectById(parentObj, id, depth) {

        if (depth > 15) {
            return null;
        }

        var objId = parentObj["$id"];
        if (typeof (objId) !== "undefined" && objId != null && objId == id) {
            // $id key exists, and the id matches the id of interest, so you have the object... return it
            return parentObj;
        }
        for (var i in parentObj) {
            if (typeof (parentObj[i]) == "object" && parentObj[i] != null) {
                //going one step down in the object tree
                var result = getJsonNetObjectById(parentObj[i], id, depth + 1);
                if (result != null) {
                    // return found object
                    return result;
                }
            }
        }
        return null;
    }
});