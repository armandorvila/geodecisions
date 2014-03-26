var users = angular.module('controllers.users', ['services.users']);

users.controller('UsersListCtrl', ['$scope', 'usersService', function($scope, usersService) {
    
    $scope.totalUsers = 0;
    $scope.currentPage = 1;
    
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    usersService.getUsers(function(response) {
        $scope.users = response.data;
        $scope.totalUsers = response.data.length;
    });
}]);

users.controller('UserLoginCtrl', ['$scope', 'usersService', function($scope, $location, usersService) {
    
    $scope.login = function() {
        alert("Login User :" + $scope.user.email);
    };
    
}]);