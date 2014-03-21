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