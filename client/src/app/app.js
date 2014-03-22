angular.module('app', [ 'ngRoute', 'controllers.users', 'controllers.proceses',
	'services.users' ]);

angular.module('app').config(
	[ '$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
		    $locationProvider.html5Mode(true);

		    $routeProvider.when('/signup', {
			templateUrl : '/templates/signup.html',
			controller : 'UserSingupCtrl'
		    }).when('/home', {
			templateUrl : '/templates/home.html',
			controller : 'AppCtrl'
		    }).when('/login', {
			templateUrl : '/templates/login.html',
			controller : 'AppCtrl'
		    }).when('/users', {
			templateUrl : '/templates/users.html',
			controller : 'UsersListCtrl'
		    }).when('/proceses', {
			templateUrl : '/templates/proceses.html',
			controller : 'ProcesesCtrl'
		    }).when('/pricing', {
			templateUrl : '/templates/pricing.html',
			controller : 'AppCtrl'
		    }).when('/about', {
			templateUrl : '/templates/about.html',
			controller : 'AppCtrl'
		    })
		    .when('/projects/:projectId', {
			templateUrl : 'templates/process-detail.html',
			controller : 'ProcessDetailCtrl'
		    }).otherwise({
			redirectTo : '/home'
		    });
		} ]);

angular.module('app').run(['$rootScope','usersService','$location', function($rootScope, usersService, $location) {
		    $rootScope.$on('$routeChangeSuccess', function(event, current, previous, rejection) {
			if (!$rootScope.currentUser) {
			    usersService.loadCurrentUser(function() {
				if(current.originalPath !== '/pricing' &&
					current.originalPath !== '/about' && 
					current.originalPath !== '/signup'){ 
				    $location.path('/login'); }
			    });
			}
		    });}]);

angular.module('app').controller('AppCtrl',[
		'$scope',
		'usersService',
		'$rootScope',
		'$location',
		function($scope, usersService, $rootScope, $location) {
		    
		    $scope.isAuthenticated = function() {
			return !!$rootScope.currentUser;
		    };

		    $scope.authError = null;
		    $scope.credentials = {};

		    $scope.login = function() {
			if ($scope.credentials.email && $scope.credentials.password) {
			    usersService.login($scope.credentials.email,
				    $scope.credentials.password, function() {
					$location.path('/home');
				    }, function() {
					$location.path('/login');
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
			$scope.credentials = {};
			alert();
		    };

		} ]);