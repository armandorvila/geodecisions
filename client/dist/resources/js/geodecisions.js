angular.module('app', ['ngRoute', 'controllers.users', 'controllers.processes', 'controllers.about',
    'controllers.pricing', 'controllers.login', 'controllers.signup', 'controllers.dashboard',
    'services.users','ui.bootstrap']);

angular.module('app').config(
        ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            
            $locationProvider.html5Mode(true);
            
            $routeProvider.when('/signup', {
                templateUrl : '/templates/signup.html',
                controller : 'SingupCtrl',
                user : false
            }).when('/home', {
                templateUrl : '/templates/home.html',
                controller : 'DashboardCtrl',
                user : true
            }).when('/login', {
                templateUrl : '/templates/login.html',
                controller : 'LoginCtrl',
                user : false
            }).when('/users', {
                templateUrl : '/templates/users.html',
                controller : 'UsersListCtrl',
                user : true
            }).when('/processes', {
                templateUrl : '/templates/processes.html',
                controller : 'ProcessesCtrl',
                user : true
            }).when('/newProcess', {
                templateUrl : '/templates/processes/new-process.html',
                controller : 'NewProcessCtrl',
                user : true
            }).when('/pricing', {
                templateUrl : '/templates/pricing.html',
                controller : 'PricingCtrl',
                user : false
            }).when('/about', {
                templateUrl : '/templates/about.html',
                controller : 'AboutCtrl',
                user : false
            }).when('/projects/:projectId', {
                templateUrl : 'templates/process-detail.html',
                controller : 'ProcessDetailCtrl',
                user : true
            }).otherwise({
                redirectTo : '/home'
            });
        }]);

angular.module('app').run(
        ['$rootScope', 'usersService', '$location', '$route',
            function($rootScope, usersService, $location, $route) {
                
                $rootScope.$on('$routeChangeStart', function(event, next, current) {
                    
                    if (!$rootScope.currentUser && next.user) {
                        usersService.loadCurrentUser(function() {
                            $location.path('/login'); // Exec
                                                                                                                                                                                                                        // if
                                                                                                                                                                                                                        // not
                                                                                                                                                                                                                        // user
                                                                                                                                                                                                                        // found
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
                            usersService.logout(function() {
                                $location.path('/login');
                            });
                        };
                        
                    }]);

var about = angular.module('controllers.about', []);

about.controller('AboutCtrl',['$scope','$rootScope', function($scope, $rootScope) {
    
    $rootScope.subheader.title = 'About Geodecisions';
    $rootScope.subheader.description = 'What is Geodecisions intended for? Can I take advantage of Geodecisions?';
    
		
}]);
var dashboard = angular.module('controllers.dashboard', ['services.processes', 'services.users']);

dashboard.controller('DashboardCtrl', ['$scope', 'usersService', 'processesService', '$rootScope',
    function($scope, usersService, processesService, $rootScope) {
        
        $rootScope.subheader.title = 'Geodecisions Dashboard';
        $rootScope.subheader.description = 'Check your latest and favorite processes and take a look to the latest decisions in the community.';
   
        $scope.selected='latest';
        
        $scope.latest = function(){
            $scope.selected='latest';
        };
        
        $scope.favorites = function(){
            $scope.selected='favorites';
        };
        
        $scope.stream = function(){
            $scope.selected='stream';
        };
        
        $scope.notifications = function(){
            $scope.selected='notifications';
        };
        
        $scope.settings = function(){
            $scope.selected='settings';
        };
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
var projects = angular.module('controllers.processes', ['services.processes', 'services.users']);

projects
        .controller(
                'ProcessesCtrl',
                [
                    '$scope',
                    'usersService',
                    'processesService',
                    '$rootScope',
                    '$location',
                    function($scope, usersService, processesService, $rootScope, $location) {
                        
                        $rootScope.subheader.title = 'Making Decision Processes';
                        $rootScope.subheader.description = 'Create, continue and close your making decision processes.';
                        
                        $scope.selected = 'inProgress';
                        
                        $scope.newProcess = function() {
                            $location.path('/newProcess');
                        };
                        
                        $scope.inProgress = function() {
                            $scope.selected = 'inProgress';
                        };
                        
                        $scope.closed = function() {
                            $scope.selected = 'closed';
                        };
                        
                        $scope.all = function() {
                            $scope.selected = 'all';
                        };
                        
                        $scope.processes = [
                            {
                                name : 'Madrid car buying',
                                description : 'I need buy a car in the city of Madrid, and I need a price reference also a litlle of infor about the enviorment.',
                                factors : [{
                                    id : 1,
                                    name : 'enviorment'
                                }, {
                                    id : 2,
                                    name : 'car industry'
                                }],
                                tags : [{
                                    id : 1,
                                    name : 'Cars'
                                }, {
                                    id : 2,
                                    name : 'Enviorment'
                                }]
                            },
                            {
                                name : 'Madrid house selling',
                                description : 'I need buy a car in the city of Madrid, and I need a price reference also a litlle of infor about the enviorment.',
                                factors : [{
                                    id : 1,
                                    name : 'employment'
                                }, {
                                    id : 2,
                                    name : 'demography'
                                }],
                                tags : [{
                                    id : 1,
                                    name : 'Houses'
                                }, {
                                    id : 2,
                                    name : 'Selling'
                                }]
                            }];
                        
                    }]);

projects.controller('ProcessDetailCtrl', ['$scope', 'usersService', 'processesService',
    function($scope, usersService, processesService) {

    }]);

function ModalInstanceCtrl($scope, $modalInstance, factors) {
    
    $scope.factors = factors;
    $scope.selectedFactors = ['Agricultura'];
    $scope.selectedFactor = undefined;
    
    $scope.addFactor = function(selectedFactor) {
        $scope.selectedFactors.push(selectedFactor);
        $scope.selectedFactor = undefined;
    };
    
    $scope.removeFactor = function(factor) {
        var index = $scope.selectedFactors.indexOf(factor);
        $scope.selectedFactors.splice(index, 1);
    };
    
    $scope.ok = function() {
        $modalInstance.close($scope.selectedFactors);
    };
    
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}

projects.controller('NewProcessCtrl', ['$scope', 'usersService', 'processesService', '$http', '$location',
    '$modal', function($scope, usersService, processesService, $http, $location, $modal) {
        $scope.process = {};
        
       // $scope.selectedFactors = ['Agricultura'];
        $scope.factors = ["Agricultura", "Ganadería", "Clima"];
        
        $scope.selectedTag = undefined;
        $scope.selectedTags = [];
        $scope.tags = ["Comida", "Hambre", "What the fuck"];
        
        $scope.addTag = function() {
            $scope.selectedTags.push($scope.selectedTag);
            $scope.selectedTag = undefined;
        };
        
        $scope.removeTag = function(tag) {
            var index = $scope.selectedTags.indexOf(tag);
            $scope.selectedTags.splice(index, 1);
        };
        
        $scope.getLocation = function(val) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params : {
                    address : val,
                    sensor : false
                }
            }).then(function(res) {
                var addresses = [];
                angular.forEach(res.data.results, function(item) {
                    addresses.push(item.formatted_address);
                });
                return addresses;
            });
        };
        
        $scope.opts = {
            keyboard : true,
            backdrop : false,
            resolve : {
                factors : function() {
                    return $scope.factors;
                }
            },
            templateUrl : 'myModalContent.html',
            controller : 'ModalInstanceCtrl'
        };
        
        $scope.continueToFactors = function() {
            $modal.open($scope.opts).result.then(function(result) {
                if (result) {
                    alert('dialog closed with result: ' + result);
                }
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        
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
angular.module('services.processes', []).factory('processesService', function($http) {
    
    return {
        getLocations : function(val, callback){
            promise = $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params : {
                    address : val,
                    sensor : false
                }
            });
            
            return promise.then(function(res) {
                callback(res.data.results);
            });
        }
    };
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
