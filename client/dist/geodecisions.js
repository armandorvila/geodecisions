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



angular.module('controllers.users', ['services.users'])
.controller('UsersCtrl',['$scope','usersService', function($scope, usersService) {

					$scope.createUser = function() {
						alert("New User :" + $scope.newUser.name + ' ' + $scope.newUser.lastname);
					};
					
					$scope.usersNum= 100;
					usersService.getUsers($scope);
					
} ]);

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

angular.module('templates.app', []);

