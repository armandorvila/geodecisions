var login = angular.module('controllers.signup', ['services.users']);

login.controller('SingupCtrl', ['$scope', 'usersService', '$rootScope', '$location',
    function($scope, usersService, $rootScope, $location) {
        
        $rootScope.subheader.title = 'Sign up for free';
        $rootScope.subheader.description = 'Start using Geodecisions for free now.';
      

        $scope.signup = function() {
            if ($scope.user.password === $scope.user.confirmPassword) {
                usersService.create($scope.user,function() {
                        $scope.signupError = 'Error creating user, try it again later.';
                    },function() {
                        usersService.login($scope.user.email, $scope.user.password, function(loggedUser) {
                            $rootScope.currentUser = loggedUser;
                            $location.path('/home');
                        }, function(message) {
                            $location.path('/login');
                        });
                    });
            } else {
                $scope.signupError = 'Passwords must be equals';
            }
        };
        
        $scope.clear = function() {
            $scope.user = {};
        };
        
        $scope.cancel = function() {
            $location.path('/');
        };
        
    }]);