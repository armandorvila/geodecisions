angular.module('services.users', []).factory('usersService', function($http) {

	return {
		getUsers : function($scope) {
			var usersPromise = $http.get('http://geodecisions.herokuapp.com/users/get');
			usersPromise.then(function(response) {
				$scope.users = response.data;
			
			}, function(response) {
				alert('Something went wrong getting users');
				throw new Error('Something went wrong getting users');
			});
		}
	};
});
