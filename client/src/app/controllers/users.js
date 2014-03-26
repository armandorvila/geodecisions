var users = angular.module('controllers.users', ['services.users']);

users.controller('UsersListCtrl', ['$scope', 'usersService', function($scope, usersService) {
    
    usersService.getUsers(function(response) {
        $scope.users = response.data;
    });
}]);

users.controller('UserLoginCtrl', ['$scope', 'usersService', function($scope, $location, usersService) {
    
    $scope.login = function() {
        alert("Login User :" + $scope.user.email);
    };
    
}]);