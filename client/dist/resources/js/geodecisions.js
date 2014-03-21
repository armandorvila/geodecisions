angular.module('app', [ 'ngRoute', 'controllers.users', 'controllers.projects',
		'services.users', 'directives.numbers' ]);

// TODO directives dosen't work, fix it[

angular.module('app').config(
		['$routeProvider', '$locationProvider',
				function($routeProvider, $locationProvider) {
					$locationProvider.html5Mode(true);
					$routeProvider.when('/signup', {
						templateUrl : '/templates/signup.html',
						controller : 'UserSingupCtrl'
					}).when('/home', {
						templateUrl : '/templates/home.html',
						controller : 'AppCtrl'
					}).when('/users', {
						templateUrl : '/templates/users.html',
						controller : 'UsersListCtrl'
					}).when('/projects', {
						templateUrl : '/templates/projects.html',
						controller : 'ProjectsCtrl'
					}).when('/projects/:projectId', {
						templateUrl : 'templates/projct-detail.html',
						controller : 'ProjectDetailCtrl'
					}).otherwise({
						redirectTo : '/home'
					});
				} ]);

angular.module('app').controller(
		'AppCtrl',['$scope','usersService', function($scope, usersService, $location) {

					$scope.homeActive = true;
					$scope.projectsActive = false;
					$scope.usersActive = false;

					$scope.home = function() {
						$scope.homeActive = true;
						$scope.projectsActive = false;
						$scope.usersActive = false;
					};
					$scope.projects = function() {
						$scope.homeActive = false;
						$scope.projectsActive = true;
						$scope.usersActive = false;
					};
					$scope.users = function() {
						$scope.homeActive = false;
						$scope.projectsActive = false;
						$scope.usersActive = true;
					};

					$scope.isAuthenticated = function() {
						return usersService.isAuthenticated();
					};

					$scope.authError = null;
					$scope.credentials = {};

					$scope.login = function() {
						if ($scope.credentials.email && $scope.credentials.password) {
							usersService.login($scope.credentials.email, $scope.credentials.password, function(user) {
										$scope.currentUser = user;
							});
						} else {
							authError = 'username and password are empty.';
						}
					};

					$scope.logout = function() {
						usersService.logout(function() {
							$location.path('/');
						});
					};

					$scope.clearLogin = function() {
						$scope.user = {};
					};

				} ]);
var projects = angular.module('controllers.projects', ['services.projects' ,'services.users']);

projects.controller('ProjectsCtrl',['$scope','usersService', 'projectsService', function($scope, usersService, projectsService) {

					
}]);

projects.controller('ProjectDetail',['$scope','usersService', 'projectsService', function($scope, usersService, projectsService) {

	
}]);
var users = angular.module('controllers.users', [ 'services.users' ]);

users.controller('UsersListCtrl', ['$scope','usersService',function($scope, usersService) {
			
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
angular.module('directives.numbers', []).directive('integer', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				alert('directive');
				if (/^\-?\d+$/.test(viewValue)) {
					// it is valid
					ctrl.$setValidity('integer', true);
					return viewValue;
				} else {
					// it is invalid, return undefined (no model update)
					ctrl.$setValidity('integer', false);
					return undefined;
				}
			});
		}
	};
});

angular.module('directives.numbers', []).directive('smart-float', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				alert('directive');
				if (/^\-?\d+((\.|\,)\d+)?$/.test(viewValue)) {
					ctrl.$setValidity('float', true);
					return parseFloat(viewValue.replace(',', '.'));
				} else {
					ctrl.$setValidity('float', false);
					return undefined;
				}
			});
		}
	};
});

angular.module('services.projects', []).factory('projectsService',
		function($http) {

			return {};
		});

angular.module('services.users', []).factory('usersService', function($http) {

	return {
		currentUser: null,
		
		getUsers : function(handler) {
			var usersPromise = $http.get('/users/get');
			usersPromise.then(function(response) {
				handler.onSuccess(response);
			}, function(response) {
				handler.onError(response);
			});
		},

		create : function(userModel, handler) {
			var user = {};

			user.name = userModel.name;
			user.lastname = userModel.lastname;
			user.email = userModel.email;
			user.password = userModel.password;

			var usersPromise = $http.post('/users/create', user);

			usersPromise.then(function(response) {
				handler.onSuccess();
			}, function(response) {
				handler.onError();
				throw new Error('Something went wrong creating user');
			});
		},

		login : function(email, password, callback) {
			var promise = $http.post('/login', {
				email : email,
				password : password
			});

			return promise.then(function(response) {
				this.currentUser = response.data;
				callback(this.currentUser);
			});
		},

		logout : function(callback) {
			$http.post('/logout').then(function() {
				this.currentUser = null;
				callback();
			});
		},

		isAuthenticated : function() {
			return !!this.currentUser;
		},

		getCurrentUser : function() {
			return this.currentUser;
		}
	};
});
