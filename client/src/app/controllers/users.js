var users = angular.module('controllers.users', ['services.users']);

users.controller('UsersListCtrl', ['$scope', 'usersService', function($scope, usersService) {
    
    $scope.usersNum = 100;
    
    $scope.handler = {
        onError : function(response) {
            console.log('Something went wrong getting users:' + response);
            throw new Error('Something went wrong getting users' + response);
        },
        onSuccess : function(response) {
            $scope.users = response.data;
        }
    };
    
    usersService.getUsers($scope.handler);
}]);

users.controller('UserLoginCtrl', ['$scope', 'usersService', function($scope, $location, usersService) {
    
    $scope.login = function() {
        alert("Login User :" + $scope.user.email);
    };
    
}]);