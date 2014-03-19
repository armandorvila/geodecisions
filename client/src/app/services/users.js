angular.module('services.users', []).factory('usersService', function($http) {

	return {
		getUsers : function(handler) {
			var usersPromise = $http.get('/users/get');
			usersPromise.then(function(response) {
				handler.onSuccess(response);
			
			}, function(response) {
				handler.onError();
			});
		},
		
		create: function(userModel, handler){
			var user = {};
			
			user.name = userModel.name;
			user.lastname = userModel.lastname;
			user.email = userModel.email;
			user.password = userModel.password;
			
			var usersPromise = $http.post('/users/create',user);
			usersPromise.then(function(response) {
				handler.onSuccess();
			}, function(response) {
				handler.onError();
				throw new Error('Something went wrong creating user');
			});
		}
	};
});
