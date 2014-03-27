var login = angular.module('controllers.login', ['services.users']);

login.controller('LoginCtrl', [ '$scope', 'usersService', '$rootScope', '$location',
    function($scope, usersService, $rootScope, $location) {
        
        $rootScope.subheader.title = 'Welcome to Geodecisions';
        $rootScope.subheader.description = 'Geodecisions drives your decision making processes using geographic information.';
        
        $scope.authError = null;
        $scope.credentials = {};
        
        $scope.validateCredentials = function (){
            var email = $scope.credentials.email;
            var password = $scope.credentials.password;
            return  email && password && email !== '' && password !== '';
        };
        
        $scope.login = function() {
            if ($scope.validateCredentials()) {
                usersService.login($scope.credentials.email, $scope.credentials.password,
                        function(loggedUser) {
                            $rootScope.currentUser = loggedUser;
                            $location.path('/home');
                        }, function(message) {
                            $scope.authError = message;
                            $location.path('/login');
                        });
            } else {
                $scope.authError = 'username and password are empty.';
            }
        };
        
        $scope.logout = function() {
            usersService.logout(function() {
                $location.path('/');
            });
        };
        
        $scope.clearLogin = function() {
            $scope.credentials = {};
        };
        
    }]);