angular.module('services.users', []).factory('usersService', function($http, $rootScope) {
    
    return {
        getUsers : function() {
            return $http.get('/users/get').then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error getting users ' + response);
                throw new Error('Something went wrong getting users' + response);
            });
        },
        
        create : function(userModel, error, success) {
            var user = {
                name : userModel.name,
                lastname : userModel.lastname,
                email : userModel.email,
                password : userModel.password
            };
            
            $http.post('/users/create', user).then(function(response) {
                success();
            }, function(response) {
                error();
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
        
        getCurrentUser : function() {
            console.info('Calling server for currrent user');
            
            return $http.get('/users/current').then(function(response) {
                return (response.data && response.data.user !== false) ? response.data : null;
            }, function(response) {
                console.log('Error getting current user');
                throw new Error(response);
            });
        }
    };
});
