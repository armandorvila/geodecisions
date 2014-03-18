angular.module('app', ['ngRoute', 'controllers.users']);


angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	  $locationProvider.html5Mode(true);
	  $routeProvider.otherwise({redirectTo:'/projectsinfo'});
}]);


angular.module('app').controller('AppCtrl', ['$scope', function($scope) {
	
	$scope.name = "Armando";
	
	$scope.home = function () {
		alert("Hi " + $scope.name);
	  };

}]);


