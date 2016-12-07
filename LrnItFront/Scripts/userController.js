app.controller("userController", function ($scope, $http, $stateParams, lrnItService, $state) {
    $('#signInModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

    $scope.user = [];
    $scope.data = {};
    $scope.focusUser = {}

    $http.get('api/User')
    .then(function (response) {
        
        $scope.user = response.data;
        
    })

   

    // For SignUp Page
    $scope.signUp = function () {
        $http.post('api/User', $scope.data)
        .then(function (response) {
            $state.go('home', {}, { reload: true });
        })
    };

    //From Login Controller
    $scope.username = "";
    $scope.password = "";
    $scope.signedInUser = lrnItService.signedInUser;
    



    $scope.Login = function () {
        $http.get('api/User?username=' + $scope.username + "&password=" + $scope.password)
           .error(function (response) {
               if (response.status != 200) {
                   alert("bad");
               }
           })
           .then(function (response) {
               
               
               lrnItService.setNav(true);
               $scope.signedInUser = response.data;
               $scope.tempUser = getJsonNetObject($scope.signedInUser, response.data);
              
               for (var i = 0; i < $scope.tempUser.Tags.length; i++) {
                  
                   $scope.tempUser.Tags[i] = getJsonNetObject($scope.tempUser.Tags[i], response.data);
               }
               

               lrnItService.setSignedIn($scope.tempUser);
               



               $state.go('home');


           })

    }


    //Get user for current Profile Click
    $scope.profileUserTags = lrnItService.profileViewUserTags;
    $scope.profileExpertise = lrnItService.profileViewExpertise;

    $scope.viewProfile = function () {
        $http.get('api/User?ProfileId=' + $scope.profileUser.Id)
        .then(function (response) {
            lrnItService.setProfileViewUser(response.data);

            $http.get('api/Tag?UserId=' + $scope.profileUser.Id)
                .then(function (response) {
                    lrnItService.setProfileViewUserTags(response.data);

                    $http.get('api/Expertise?UserId=' + $scope.profileUser.Id)
                        .then(function (response) {
                            lrnItService.setProfileViewExpertise(response.data);
                            $state.Go('profile');
                        })
                    
                })
        })
    }
        
        

    //Get user for current Profile Click
    $scope.profileUser = lrnItService.profileViewUser;

    $scope.isOwnProfile = lrnItService.isProfileOfSignedInUser;

    $scope.signedInUserTags = null;
    
    
    
    $scope.editProfileCategPlaceholder = "Select Category";
    $scope.editProfileTagPlaceholder = "Select Tag";
    //Get categories for adding tags to user
    $scope.allCategories = lrnItService.categories;
    
    $scope.tagsForCategory = null;
    //Save the category that they pick and get the tags for it
    $scope.getTagsForSelectedCategory = function (cat) {
        $scope.editProfileCategPlaceholder = cat.Name;

        $http.get('api/Tag?CategoryId=' + cat.Id)
        .then(function (response) {
            $scope.tagsForCategory = response.data;
        })
    }

    //Save the tag that they pick to add to their profile
    $scope.tagToAdd = null

    $scope.storeTagToAdd = function (tag) {
        $scope.editProfileTagPlaceholder = tag.Name;
        $scope.tagToAdd = tag;
        console.log("Tag to Store" + tag);
    }

    $scope.removeTag = function (tag) {
        var index = $scope.tempUser.Tags.indexOf(tag);
        $scope.tempUser.Tags.splice(index, 1);
        console.log($scope.tempUser.Tags);

    }


    //Add Tag to TempUser, Display on Page. Not saved until they click save
    $scope.addTagToUser = function (tag) {
        $scope.tempUser.Tags.push(tag);
        $scope.tagToAdd = null;
    }

    //Edit Profile Page Get Data
    $scope.editProfile = function () {

        $state.go('editProfile')

    }

    //Editing Fields in Profile, then PUTing it
    $scope.tempUser = lrnItService.signedInUser;

    $scope.saveChangesToProfile = function () {
        var userToSave = angular.copy($scope.tempUser);
        userToSave.Tags = [];

        for (var i = 0; i < $scope.tempUser.Tags.length; i++) {
            userToSave.Tags.push({
                Id: $scope.tempUser.Tags[i].Id,
                CategoryId: $scope.tempUser.Tags[i].CategoryId,
                Name: $scope.tempUser.Tags[i].Name
            });

            
        }
        $http.put('api/User?id=' + $scope.signedInUser.Id, userToSave)
        .then(function () {
            $scope.tempUser = lrnItService.signedInUser;
            $state.go('profile', {}, { reload: true });
        })
        
            
    }
    
    //Adding Experience/Expertise to User
    $scope.experienceToAdd = {};

    $scope.clickAddExperience = function () {
        $scope.experienceToAdd = {};
        $state.go('addExperience');
    }

    $scope.experienceToAddName = "";
    $scope.experienceToAddYearsExperience = null;
    $scope.experienceToAddDescription = "";
    

    $scope.addExperience = function () {
        $http.post('/api/Expertise', { Name: $scope.experienceToAddName, YearsExperience: $scope.experienceToAddYearsExperience, Description: $scope.experienceToAddDescription, UserId: lrnItService.signedInUser.Id })
            .then(function () {
                $state.go('profile', {}, { reload: true });
            })
    }

    //Delete Expertise from User
    $scope.deleteExpertise = function (id, expertise) {
        $http.delete('/api/Expertise/' + id, expertise)
        .then(function() {
            $http.get('api/Expertise?UserId=' + lrnItService.signedInUser.Id)
                        .then(function (response) {
                            lrnItService.setProfileViewExpertise(response.data);
                            $scope.profileExpertise = lrnItService.profileViewExpertise;
                        })
        })
    }
    //////////////////////////
    //Edit Expertise for User//
    //////////////////////////
    $scope.experienceEdit = lrnItService.getExpertiseToEdit();
    //Clicking Edit, Saves current data, and takes you to edit page
    $scope.editExperience = function (expertise) {
        lrnItService.setExpertiseToEdit(expertise);
        
        $state.go('editExperience');
        
    }

    //Save experience after editing

    $scope.saveEditExperience = function () {
        $http.put('api/Expertise/' + $scope.experienceEdit.Id, $scope.experienceEdit)
            .then(function () {
                $state.go('profile', {}, { reload: true });
            })
    }

    //Account Settings Edit

   

  

    //clicking "Message" When viewing a users profile
    $scope.sendMessage = function () {
        lrnItService.setUserToMessage(lrnItService.profileViewUser);
        $state.go('sendMessage');
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