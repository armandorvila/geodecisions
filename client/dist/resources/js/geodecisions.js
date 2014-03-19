angular.module('app', 
['ngRoute',
 'controllers.users',
 'controllers.projects']);

angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	  $locationProvider.html5Mode(true);
	  $routeProvider.
	  when('/login', {
        templateUrl: '/templates/login.html',
        controller: 'UserLoginCtrl'
      }).
      when('/users', {
          templateUrl: '/templates/users.html',
          controller: 'UsersListCtrl'
        }).
      when('/projects', {
          templateUrl: '/templates/projects.html',
          controller: 'ProjectsCtrl'
        }).
      when('/projects/:projectId', {
        templateUrl: 'templates/projct-detail.html',
        controller: 'ProjectDetailCtrl'
      }).
      otherwise({
        redirectTo: '/projects'
      });
}]);

angular.module('app').controller('AppCtrl', ['$scope', function($scope) {
	
	$scope.home = function () {
		 $location.path('/');
	 };
	 
	 $scope.isAuthenticated = function () {
		 return false;
	 };
	 
	 $scope.$on('$routeChangeError', function(event, current, previous, rejection){
		    i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
		  });
	  
}]);
var projects = angular.module('controllers.projects', ['services.projects' ,'services.users']);

projects.controller('ProjectsCtrl',['$scope','usersService', 'projectsService', function($scope, usersService, projectsService) {

					
}]);

projects.controller('ProjectDetail',['$scope','usersService', 'projectsService', function($scope, usersService, projectsService) {

	
}]);
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
angular.module('services.projects', []).factory('projectsService',
		function($http) {

			return {};
		});

angular.module('services.users', []).factory('usersService', function($http) {

	return {
		getUsers : function($scope) {
			var usersPromise = $http.get('/users/get');
			usersPromise.then(function(response) {
				$scope.users = response.data;
			
			}, function(response) {
				alert('Something went wrong getting users');
				throw new Error('Something went wrong getting users');
			});
		}
	};
});
