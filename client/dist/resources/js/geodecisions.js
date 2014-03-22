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
var projects = angular.module('controllers.proceses', ['services.projects' ,'services.users']);

projects.controller('ProcesesCtrl',['$scope','usersService', 'projectsService', function($scope, usersService, projectsService) {

					
}]);

projects.controller('ProcessDetailCtrl',['$scope','usersService', 'projetsService', function($scope, usersService, projectsService) {

	
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
angular.module('services.projects', []).factory('projectsService',
		function($http) {

			return {};
		});

angular.module('services.users', []).factory('usersService',
	function($http, $rootScope) {

	    return {
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

		    var usersPromise = $http.post('/users/new', user);

		    usersPromise.then(function(response) {
			handler.onSuccess();
		    }, function(response) {
			handler.onError();
			throw new Error('Something went wrong creating user');
		    });
		},

		login : function(email, password, goToHome, goToLogin) {
		    var promise = $http.post('/users/login', {
			email : email,
			password : password
		    });

		    return promise.then(function(response) {
			$rootScope.currentUser = response.data;
			if(response.data){
			    goToHome();
			}
			else {
			    goToLogin();
			}
		    });
		},

		logout : function(callback) {
		    $http.post('/users/logout').then(function() {
			$rootScope.currentUser = null;
			callback();
		    });
		},

		loadCurrentUser : function(goToLogin) {
		    $http.get('/users/current').then(function(response) {
			if (response.data && response.data.user !== false) {
			    $rootScope.currentUser = response.data;
			}
			else {
			    goToLogin();
			}
		    }, function(response) {
			console.log('Error getting current user');
		    });
		}
	    };
	});
