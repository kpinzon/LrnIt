app.controller("conversationController", function ($scope, $http, $stateParams, lrnItService, $state) {
    $scope.signedInUser = lrnItService.signedInUser;
    $scope.userToMessage = lrnItService.getUserToMessage();
    $scope.convoSubject = "";
    $scope.convoMessage = "";
    $scope.convosSentToYou = null;
    $scope.convosYouSent = null;


   
    $scope.sendMessage = function () {
        $http.post('/api/Conversation', { Subject: $scope.convoSubject, RecipientId: $scope.userToMessage.Id, SenderId: $scope.signedInUser.Id })
            .then(function (response) {
                $scope.convo = response.data;

                $http.post('api/Message', { IsRead: false, Text: $scope.convoMessage, UserId: $scope.signedInUser.Id, ConversationId: $scope.convo.Id })
                    .then(function () {
                        $state.go('viewConversations');
                    })
            })
       
    }

    $http.get('/api/Conversation?recipientId=' + $scope.signedInUser.Id)
        .then(function (response) {
            
            $scope.convosSentToYou = response.data;
            for (var i = 0; i < $scope.convosSentToYou.length; i++) {
                $scope.convosSentToYou[i].Sender = getJsonNetObject($scope.convosSentToYou[i].Sender, response.data);
                for (var j = 0 ; j < $scope.convosSentToYou[i].Messages.length; j++) {
                    $scope.convosSentToYou[i].Messages[j] = getJsonNetObject($scope.convosSentToYou[i].Messages[j], response.data);
                    $scope.convosSentToYou[i].Messages[j].User = getJsonNetObject($scope.convosSentToYou[i].Messages[j].User, response.data);
                }
            }
            //console.log("CONVOS SENT TO YOU");
            //console.log($scope.convosSentToYou)

            $http.get('/api/Conversation?senderId=' + $scope.signedInUser.Id)
                .then(function (response) {
                    $scope.convosYouSent = response.data;

                    for (var i = 0; i < $scope.convosYouSent.length; i++) {
                        $scope.convosYouSent[i].Recipient = getJsonNetObject($scope.convosYouSent[i].Recipient, response.data);
                        for (var j = 0 ; j < $scope.convosYouSent[i].Messages.length; j++) {
                            $scope.convosYouSent[i].Messages[j] = getJsonNetObject($scope.convosYouSent[i].Messages[j], response.data);
                            $scope.convosYouSent[i].Messages[j].User = getJsonNetObject($scope.convosYouSent[i].Messages[j].User, response.data);
                        }
                        
                    }
                    //console.log("CONVOS YOU SEND");
                    //console.log($scope.convosYouSent)
                })
        })

    $scope.selectedConvo = lrnItService.getSelectedConvo();

    //When a convo is clicked: go through all the convos, match it with the Id of the convo we selected, set it to service selected convo
    // Also, set name of that user to use for the message page

    $scope.viewConversation = function (convoId, convoVar) {
        for (var i = 0; i < convoVar.length; i++) {
            if (convoVar[i].Id == convoId) {

                if (convoVar[i].Recipient.Id == lrnItService.signedInUser.Id) {
                $http.put('api/Message?id=' + convoVar[i].Messages[convoVar[i].Messages.length - 1].Id, { IsRead: true, Text: convoVar[i].Messages[convoVar[i].Messages.length - 1].Text, UserId: convoVar[i].Messages[convoVar[i].Messages.length - 1].UserId, ConversationId: convoVar[i].Messages[convoVar[i].Messages.length - 1].ConversationId, TimeSent: convoVar[i].Messages[convoVar[i].Messages.length - 1].TimeSent,  Id: convoVar[i].Messages[convoVar[i].Messages.length - 1].Id})

                }

                lrnItService.setSelectedConvo(convoVar[i])
                if (convoVar == $scope.convosSentToYou) {
                    lrnItService.setFNameUserTalkingTo(convoVar[i].Sender.Fname);
                    lrnItService.setLNameUserTalkingTo(convoVar[i].Sender.Lname);
                }
                if (convoVar == $scope.convosYouSent) {
                    lrnItService.setFNameUserTalkingTo(convoVar[i].Recipient.Fname);
                    lrnItService.setLNameUserTalkingTo(convoVar[i].Recipient.Lname);
                }
            }
        }
       
        
        $state.go('conversation');
    }

    $scope.userTalkingToFName = lrnItService.getFNameUserTalkingTo();
    $scope.userTalkingToLName = lrnItService.getLNameUserTalkingTo();

    

    $scope.messageToSend = null;
    $scope.sendMessageInConvo = function () {
        $http.post('api/Message', { IsRead: false, Text: $scope.messageToSend, UserId: $scope.signedInUser.Id, ConversationId: $scope.selectedConvo.Id })
        .then(function () {
            $scope.messageToSend = null;
            $state.go("viewConversations");
        })
    }

    var depth = 0;

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

})