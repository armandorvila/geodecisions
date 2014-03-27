var users = angular.module('controllers.users', ['services.users']);

users.controller('UsersListCtrl', ['$scope', 'usersService', function($scope, usersService) {
    
    $scope.totalUsers = 0;
    $scope.currentPage = 1;
    
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    
    usersService.getUsers().then(function(users) {
        $scope.users = users;
        $scope.totalUsers = users.length;
    });
    
}]);