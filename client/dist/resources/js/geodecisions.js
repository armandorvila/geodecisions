angular.module('app', 
['ngRoute', 
 'controllers.users', 
 'controllers.proceses', 
 'controllers.about',
 'controllers.pricing', 
 'controllers.login',
 'controllers.signup', 
 'controllers.dashboard', 
 'services.users']);

angular.module('app').config(
        ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            
            $locationProvider.html5Mode(true);
            
            $routeProvider.when('/signup', {
                templateUrl : '/templates/signup.html',
                controller : 'SingupCtrl',
                user: false
            }).when('/home', {
                templateUrl : '/templates/home.html',
                controller : 'DashboardCtrl',
                user: true
            }).when('/login', {
                templateUrl : '/templates/login.html',
                controller : 'LoginCtrl',
                user: false
            }).when('/users', {
                templateUrl : '/templates/users.html',
                controller : 'UsersListCtrl',
                user: true
            }).when('/proceses', {
                templateUrl : '/templates/proceses.html',
                controller : 'ProcesesCtrl',
                user: true
            }).when('/pricing', {
                templateUrl : '/templates/pricing.html',
                controller : 'PricingCtrl',
                user: false
            }).when('/about', {
                templateUrl : '/templates/about.html',
                controller : 'AboutCtrl',
                user: false
            }).when('/projects/:projectId', {
                templateUrl : 'templates/process-detail.html',
                controller : 'ProcessDetailCtrl',
                user: true
            }).otherwise({
                redirectTo : '/home'
            });
        }]);

angular.module('app').run(
        ['$rootScope', 'usersService', '$location', '$route', function($rootScope, usersService, $location, $route) {
            
            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                
                if (!$rootScope.currentUser && next.user) {
                    usersService.loadCurrentUser(function() {
                         $location.path('/login'); // Exec if not user found 
                    });
                }
            });
        }]);

angular
        .module('app')
        .controller(
                'AppCtrl',
                [
                    '$scope',
                    'usersService',
                    '$rootScope',
                    '$location',
                    function($scope, usersService, $rootScope, $location) {
                        $rootScope.subheader = {};
                        $rootScope.subheader.title = 'Welcome to Geodecisions';
                        $rootScope.subheader.description = 'Geodecisions drives your decision making processes using geographic information.';
                    
                        $scope.isAuthenticated = function() {
                            return !!$rootScope.currentUser;
                        };
                        
                        $scope.logout = function() {
                            usersService.logout(function(){
                                $location.path('/login');
                            });
                        };
                    
                    }]);

var about = angular.module('controllers.about', []);

about.controller('AboutCtrl',['$scope','$rootScope', function($scope, $rootScope) {
    
    $rootScope.subheader.title = 'Ablout Geodecisions';
    $rootScope.subheader.description = 'What is Geodecisions intended for? Can I take advantage of Geodecisions?';
    
		
}]);
var dashboard = angular.module('controllers.dashboard', ['services.projects' ,'services.users']);

dashboard.controller('DashboardCtrl',['$scope','usersService', 'projectsService', 
                                    function($scope, usersService, projectsService) {

					
}]);
var login = angular.module('controllers.login', ['services.users']);

login.controller('LoginCtrl', [
    '$scope',
    'usersService',
    '$rootScope',
    '$location',
    function($scope, usersService, $rootScope, $location) {
        
        $rootScope.subheader.title = 'Welcome to Geodecisions';
        $rootScope.subheader.description = 'Geodecisions drives your decision making processes using geographic information.';
        
        $scope.authError = null;
        $scope.credentials = {};
        
        $scope.login = function() {
            if ($scope.credentials.email && $scope.credentials.password) {
                usersService.login($scope.credentials.email, $scope.credentials.password,
                        function(loggedUser) {
                            $rootScope.currentUser = loggedUser;
                            $location.path('/home');
                        }, function(message) {
                            $scope.authError = message;
                            $location.path('/login');
                        });
            } else {
                authError = 'username and password are empty.';
            }
        };
        
        $scope.logout = function() {
            usersService.logout(function() {
                $location.path('/');
            });
        };
        
        $scope.clearLogin = function() {
            $scope.credentials = {};
            alert();
        };
        
    }]);
var pricing = angular.module('controllers.pricing', []);

pricing.controller('PricingCtrl',['$scope','$rootScope', function($scope , $rootScope) {
    
    $rootScope.subheader.title = 'Pricing';
    $rootScope.subheader.description = 'Free features could be extended upgrading your account to Geodecisions Enterprise';
    
			
}]);
var projects = angular.module('controllers.proceses', ['services.projects' ,'services.users']);

projects.controller('ProcesesCtrl',['$scope','usersService', 'projectsService', function($scope, usersService, projectsService) {

					
}]);

projects.controller('ProcessDetailCtrl',['$scope','usersService', 'projetsService', function($scope, usersService, projectsService) {

	
}]);
var login = angular.module('controllers.signup', ['services.users']);

login.controller('SingupCtrl', ['$scope', 'usersService', '$rootScope', '$location',
    function($scope, usersService, $rootScope, $location) {
        
        $rootScope.subheader.title = 'Sign up for free';
        $rootScope.subheader.description = 'Start using Geodecisions for free now.';
        
        /* usersService.login($scope.user.email, $scope.user.password,
                                function(loggedUser) {
                                    $rootScope.currentUser = loggedUser;
                                    $location.path('/home');
                                }, function(message) {
                                    $location.path('/login');
                                });*/

        $scope.signup = function() {
            if ($scope.user.password === $scope.user.confirmPassword) {
                usersService.create($scope.user, {
                    onError : function() {
                        $scope.signupError = 'Error creating user, try it again later.';
                    },
                    onSuccess : function() {
                        usersService.login($scope.user.email, $scope.user.password, function(loggedUser) {
                            $rootScope.currentUser = loggedUser;
                            $location.path('/home');
                        }, function(message) {
                            $location.path('/login');
                        });
                    }
                });
            } else {
                $scope.signupError = 'Passwords must be equals';
            }
        };
        
        $scope.clear = function() {
            $scope.user = {};
        };
        
        $scope.cancel = function() {
            $location.path('/');
        };
        
    }]);
var users = angular.module('controllers.users', ['services.users']);

users.controller('UsersListCtrl', ['$scope', 'usersService', function($scope, usersService) {
    
    $scope.usersNum = 100;
    
    $scope.handler = {
        onError : function(response) {
            console.log('Something went wrong getting users:' + response);
            throw new Error('Something went wrong getting users' + response);
        },
        onSuccess : function(response) {
            $scope.users = response.data;
        }
    };
    
    usersService.getUsers($scope.handler);
}]);

users.controller('UserLoginCtrl', ['$scope', 'usersService', function($scope, $location, usersService) {
    
    $scope.login = function() {
        alert("Login User :" + $scope.user.email);
    };
    
}]);
angular.module('services.projects', []).factory('projectsService',
		function($http) {

			return {};
		});

angular.module('services.users', []).factory('usersService', function($http, $rootScope) {
    
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
        
        loadCurrentUser : function(goToLogin) {
            $http.get('/users/current').then(function(response) {
                if (response.data && response.data.user !== false) {
                    $rootScope.currentUser = response.data;
                } else {
                    goToLogin();
                }
            }, function(response) {
                console.log('Error getting current user');
            });
        }
    };
});
