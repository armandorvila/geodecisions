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
