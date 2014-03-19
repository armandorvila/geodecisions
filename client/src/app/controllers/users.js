var users = angular.module('controllers.users', ['services.users']);

users.controller('UsersListCtrl',['$scope','usersService', function($scope, usersService) {

					$scope.createUser = function() {
						alert("New User :" + $scope.newUser.name + ' ' + $scope.newUser.lastname);
					};
					
					$scope.usersNum= 100;
					usersService.getUsers($scope);		
}]);

users.controller('UserLoginCtrl',['$scope','usersService', function($scope, usersService) {

	$scope.login = function() {
		alert("Login User :" + $scope.user.email);
	};
		
}]);

users.controller('UserLogoutController',['$scope','usersService', function($scope, usersService) {
	
	$scope.login = function() {
		alert("New User :");
	};
		
}]);