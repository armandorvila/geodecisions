angular.module('services.users', []).factory('usersService', function($http, $rootScope) {
    
    return {
        getUsers : function(callback) {
            $http.get('/users/get').then(function(response) {
                callback(response);
            }, function(response) {
                console.log('Error getting users ' + response);
                throw new Error('Something went wrong getting users' + response);
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
        
        login : function(email, password, goToHome, goToLogin) {
            var promise = $http.post('/users/login', {
                email : email,
                password : password
            });
            
            return promise.then(function(response) {
                if (response.data.result) {
                    goToHome(response.data.result);
                } else {
                    goToLogin(response.data.message);
                }
            });
        },
        
        logout : function(callback) {
            $http.post('/users/logout').then(function() {
                $rootScope.currentUser = null;
                callback();
            });
        },
        
        loadCurrentUser : function(goToLogin, checkAdmin) {
            $http.get('/users/current').then(function(response) {
                if (response.data && response.data.user !== false) {
                    $rootScope.currentUser = response.data;
                    checkAdmin();
                } else {
                    goToLogin();
                }
            }, function(response) {
                console.log('Error getting current user');
            });
        }
    };
});
