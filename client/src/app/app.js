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