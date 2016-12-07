app.service("lrnItService", function ($http) {
    
    this.loggedInNav = false;

    this.setNav = function (bool) {
        console.log("AFTER" + this.loggedInNav);
        console.log('setnav');
        this.loggedInNav = bool;
        console.log("AFTER" + this.loggedInNav);
    }

    this.getNav = function () {
        return this.loggedInNav;
    }

    //categories

    this.categories = null;

    this.setCategories = function(category) {
        this.categories = category
    }
    
    this.getCategories = function () {
        return this.categories;

    }


    //users for a category

    this.usersInCategory = [];

    this.setUsersInCategory = function (users) {
        this.usersInCategory = users;
    }


    this.getUsersInCategory = function () {
        return this.usersInCategory;
    }

    //// SIGNED IN USER BELOW

    this.signedInUser = null;

    this.setSignedIn = function (user) {
        this.signedInUser = user
    }

    this.getSignedIn = function () {
        return this.signedInUser;
    }

    // Storing the user of the profile Im viewing
    this.profileViewUser = null;

    this.setProfileViewUser = function (user) {
        this.profileViewUser = user;
    }

    this.getProfileViewUser = function () {
        return this.profileViewUser;
    }

    //Bool to let me know if the current user Im viewing is the signed in one
    this.isProfileOfSignedInUser = null;

    this.setIsProfileOfSignedInUser = function () {
        if (this.profileViewUser == this.signedInUser) {
            this.isProfileOfSignedInUser = true;
        }
        else {
            this.isProfileOfSignedInUser = false;
        }
        }
    this.getIsProfileOfSignedInUser = function () {
        return this.isProfileOfSignedInUser;
    }

   

    //Set User to Message 

    this.userToMessage = null;

    this.setUserToMessage = function (user) {
        this.userToMessage = null;
        this.userToMessage = user;
    }

    this.getUserToMessage = function () {
        
        return this.userToMessage;
    }
    
    //Selected Conversation

    this.selectedConvo = null;

    this.setSelectedConvo = function (convo) {
        this.selectedConvo = null;
        this.selectedConvo = convo;
    }

    this.getSelectedConvo = function () {
        return this.selectedConvo;
    }

    //First and Last name of person you are conversing with

    this.fNameUserTalkingTo = null;

    this.setFNameUserTalkingTo = function (fName) {
        this.fNameUserTalkingTo = null;
        this.fNameUserTalkingTo = fName;
    }

    this.getFNameUserTalkingTo = function (fName) {
        return this.fNameUserTalkingTo;
    }

    this.lNameUserTalkingTo = null;

    this.setLNameUserTalkingTo = function (lName) {
        this.lNameUserTalkingTo = null;
        this.lNameUserTalkingTo = lName;
    }

    this.getLNameUserTalkingTo = function (lName) {
        return this.lNameUserTalkingTo;
    }
   
    //store tags for user we are viewing so we can use it for profile
    this.profileViewUserTags = null;
    
    this.setProfileViewUserTags = function (tags) {
        this.profileViewUserTags = null;
        this.profileViewUserTags = tags;
    }

    this.getProfileViewUserTags = function () {

        return this.profileViewUserTags;
    }
    
    //set expertise of users profile we are viewing
    this.profileViewExpertise = null;

    this.setProfileViewExpertise = function (expertise) {
        this.profileViewExpertise = null;
        this.profileViewExpertise = expertise;
    }

    this.getProfileViewExpertise = function () {
        return this.profileViewExpertise;
    }

    //set expertise that is selected for editing

    this.expertiseToEdit = null;

    this.setExpertiseToEdit = function (expertise) {
        this.expertiseToEdit = null;
        this.expertiseToEdit = expertise;
    }

    this.getExpertiseToEdit = function () {
        return this.expertiseToEdit;
    }


    //set current category/tag name

    this.currentTopic = null;

    this.setCurrentTopic = function (topic) {
        this.currentTopic = topic;
    }

    this.getCurrentTopic = function () {
        return this.currentTopic;
    }
})