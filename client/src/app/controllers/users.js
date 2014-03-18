angular.module('controllers.users', ['services.users'])
.controller('UsersCtrl',['$scope','usersService', function($scope, usersService) {

					$scope.createUser = function() {
						alert("New User :" + $scope.newUser.name + ' ' + $scope.newUser.lastname);
					};
					
					$scope.usersNum= 100;
					usersService.getUsers($scope);
					
} ]);
