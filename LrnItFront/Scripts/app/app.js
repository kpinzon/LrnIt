var app = angular.module("lrnitApp", ["ui.router","ngMessages"]);
    
app.directive("passwordVerify", function () {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(function () {
                var combined;

                if (scope.passwordVerify || ctrl.$viewValue) {
                    combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function (value) {
                if (value) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});

    app.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home')

        $stateProvider

            .state('home', {
                name: 'home',
                url: '/home',
                templateUrl: './LandingPage.html',
                controller: 'categoryController'

            })

            .state('signUp', {
                name: 'signUp',
                url: '/signUp',
                templateUrl: './SignUp.html',
                controller: 'userController'

            })

            .state('login', {
                name: 'login',
                url: '/login',
                templateUrl: './Login.html',
                controller: 'userController'
            })
            
            .state('accountSettings', {
                name: 'accountSettings',
                url: '/accountSettings',
                templateUrl: './AccountSettings.html',
                controller: 'userController'
            })
            

            .state('category', {
                name: 'category',
                url: '/category?id',
                templateUrl: './Categories.html',
                controller: 'categoryController'
            })

            .state('profile', {
                name: 'profile',
                url: '/profile?id',
                templateUrl: './Profile.html',
                controller: 'userController'
            })

            .state('sendMessage', {
                name: 'sendMessage',
                url: '/sendMessage',
                templateUrl: './SendMessage.html',
                controller: 'conversationController'
            })

            .state('viewConversations', {
                name: 'viewConversations',
                url: '/YourConversations',
                templateUrl: './YourConversations.html',
                controller: 'conversationController'
            })

         .state('conversation', {
             name: 'conversation',
             url: '/Conversation',
             templateUrl: './Conversation.html',
             controller: 'conversationController'
         })

         .state('editProfile', {
             name: 'editProfile',
             url: '/editProfile',
             templateUrl: './EditProfile.html',
             controller: 'userController'
         })

        .state('addExperience', {
            name: 'addExperience',
            url: '/addExperience',
            templateUrl: './ExperienceAdd.html',
            controller: 'userController'
        })

        .state('editExperience', {
            name: 'editExperience',
            url: '/editExperience',
            templateUrl: './ExperienceEdit.html',
            controller: 'userController'
        })

         .state('editAccountSettings', {
             name: 'editAccountSettings',
             url: '/editAccountSettings',
             templateUrl: './EditAccountSettings.html',
             controller: 'userController'
         })

})

