angular.module('services.users', []).factory('usersService', function($http) {

	return {
		currentUser: null,
		
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

			var usersPromise = $http.post('/users/create', user);

			usersPromise.then(function(response) {
				handler.onSuccess();
			}, function(response) {
				handler.onError();
				throw new Error('Something went wrong creating user');
			});
		},

		login : function(email, password, callback) {
			var promise = $http.post('/login', {
				email : email,
				password : password
			});

			return promise.then(function(response) {
				this.currentUser = response.data;
				callback(this.currentUser);
			});
		},

		logout : function(callback) {
			$http.post('/logout').then(function() {
				this.currentUser = null;
				callback();
			});
		},

		isAuthenticated : function() {
			return !!this.currentUser;
		},

		getCurrentUser : function() {
			return this.currentUser;
		}
	};
});
