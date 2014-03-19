var users = angular.module('controllers.users', [ 'services.users' ]);

users.controller('UsersListCtrl', ['$scope','usersService',function($scope, usersService) {
			
			$scope.usersNum = 100;
			
			$scope.handler = {
					onError : function() {
						alert('Something went wrong getting users');
						throw new Error('Something went wrong getting users');
					},
					onSuccess : function(response) {
						$scope.users = response.data;
					}
				};
			
			usersService.getUsers($scope.handler);
		} ]);

users.controller('UserLoginCtrl', [ '$scope', 'usersService',
		function($scope, $location, usersService) {

			$scope.login = function() {
				alert("Login User :" + $scope.user.email);
			};

		} ]);

users.controller('UserSingupCtrl', [ '$scope', 'usersService',
		function($scope, usersService) {

			$scope.handler = {
				onError : function() {
					$scope.signupError = 'Error creating user';
				},
				onSuccess : function() {
					$scope.signupSuccess = 'User created';
					$location.path('/');
				}
			};

			$scope.signup = function() {
				if ($scope.user.password === $scope.user.confirmPassword) {
					usersService.create($scope.user, $scope.handler);
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

		} ]);

users.controller('UserLogoutController', [ '$scope', 'usersService',
		function($scope, usersService) {

			$scope.login = function() {
				alert("New User :");
			};

		} ]);