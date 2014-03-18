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
