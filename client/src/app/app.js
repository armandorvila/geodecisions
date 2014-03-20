angular.module('app', 
['ngRoute',
 'controllers.users',
 'controllers.projects', 'directives.numbers']);

//TODO directives dosen't work, fix it

angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	  $locationProvider.html5Mode(true);
	  $routeProvider.
      when('/signup', {
          templateUrl: '/templates/signup.html',
          controller: 'UserSingupCtrl'
        }).
      when('/home', {
            templateUrl: '/templates/home.html',
            controller: 'UsersListCtrl'
      }).
      when('/users', {
          templateUrl: '/templates/users.html',
          controller: 'UsersListCtrl'
        }).
      when('/projects', {
          templateUrl: '/templates/projects.html',
          controller: 'AppCtrl'
        }).
      when('/projects/:projectId', {
        templateUrl: 'templates/projct-detail.html',
        controller: 'ProjectDetailCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
}]);

angular.module('app').controller('AppCtrl', ['$scope', function($scope,$location) {
	
	$scope.homeActive =  true;
	$scope.projectsActive =  false;
	$scope.usersActive =  false;
	
	$scope.home = function () {
		$scope.homeActive =  true;
		$scope.projectsActive =  false;
		$scope.usersActive =  false;
	};
	$scope.projects = function () {
		$scope.homeActive =  false;
		$scope.projectsActive =  true;
		$scope.usersActive =  false;
	};
     $scope.users = function () {
		$scope.homeActive =  false;
		$scope.projectsActive =  false;
		$scope.usersActive =  true;
	 };
	 
	 $scope.isAuthenticated = function () {
		 return false;
	 };
	 
	 $scope.$on('$routeChangeError', function(event, current, previous, rejection){
		    i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
	 });
	  
}]);