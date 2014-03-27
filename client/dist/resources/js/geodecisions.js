angular.module('app', ['ngRoute', 'controllers.users', 'controllers.processes', 'controllers.about',
    'controllers.pricing', 'controllers.login', 'controllers.signup', 'controllers.dashboard',
    'controllers.factors', 'controllers.admin', 'services.users','services.factors', 'services.tags',
    'ui.bootstrap']);

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
            }).when('/factors', {
                templateUrl : '/templates/factors.html',
                controller : 'FactorsCtrl',
                user : true
            }).when('/admin', {
                templateUrl : '/templates/admin.html',
                controller : 'AdminCtrl',
                user : true,
                admin : true
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
                                                                                                                                                                                                                        // //
                                                                                                                                                                                                                        // found
                        }, function() {
                            if (!$rootScope.currentUser.admin && next.admin) {
                                $location.path('/home');
                            }
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
                        
                        $scope.isAdmin = function() {
                            if (!$rootScope.currentUser) {
                                return false;
                            }
                            return $rootScope.currentUser.admin;
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
var about = angular.module('controllers.admin', []);

about.controller('AdminCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    
    $rootScope.subheader.title = 'Geodecisions Admin';
    $rootScope.subheader.description = 'Explore all our current available decisions factors';
    
    $scope.selected = function(){
        return $location.hash() ? $location.hash() : 'factors';
    };
    
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
var factors = angular.module('controllers.factors', ['services.factors']);

factors.controller('FactorsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.subheader.title = 'Geodecisions Factors';
    $rootScope.subheader.description = 'Explore all our current available decisions factors';
}]);

factors.controller('FactorsListCtrl', ['$scope', '$rootScope', 'factorsService',
    function($scope, $rootScope, factorsService) {
        
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;
        
        $scope.start = function(page) {
            return (page * $scope.itemsPerPage) - ($scope.itemsPerPage - 1);
        };
        
        $scope.end = function(page) {
            return (page * $scope.itemsPerPage);
        };
        
        $scope.setPage = function(pageNo) {
            $scope.currentFactorsPage = pageNo;
        };
        
        $scope.paginate = function(page){
            console.log('Paginating for ' + $scope.start(page) + ' ' + $scope.end(page));

            factorsService.getFactors($scope.start(page) , $scope.end(page), function(factors) {
                $scope.factors = factors;
            });
        };
        
        factorsService.countFactors().then(function(count) {
            $scope.totalItems = count;
            $scope.paginate(1);
        });
        
   
    }]);

function NewFactorModalCtrl($scope, $modalInstance, factorsService) {
    
    $scope.factor = {};
    $scope.factor.layers = [];
    $scope.newLayerModel = {};
    
    $scope.factorError = {};
    $scope.layerError = {};
    
    $scope.addLayer = function(currentLayer) {
        if ($scope.factor.layers.indexOf(currentLayer) !== -1) {
            $scope.layerError.message = 'There is already one layer with such name';
        } else {
            $scope.newLayerModel.uri = '';
            $scope.factor.layers.push(currentLayer);
        }
    };
    
    $scope.removeLayer = function(layer) {
        var index = $scope.factor.layers.indexOf(layer);
        $scope.factor.layers.splice(index, 1);
    };
    
    $scope.ok = function() {
        if ($scope.factor.layers.length === 0) {
            $scope.factorError.message = 'You have to add at least one layer';
        } else {
            factorsService.createFactor($scope.factor, function() {
                $scope.factorCreated = 'Factor created successfully';
                $modalInstance.close($scope.factor);
            }, function() {
                $scope.factorError.message = 'Error creating factor';
            });
        }
    };
    
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}

factors.controller('NewFactorCtrl', ['$scope', '$rootScope', 'factorsService', '$modal', '$location',
    function($scope, $rootScope, factorsService, $modal, $location) {
        
        $scope.opts = {
            keyboard : true,
            backdrop : false,
            resolve : {
                factorsService : function() {
                    return factorsService;
                }
            },
            templateUrl : '/templates/factors/newFactorDialog.html',
            controller : NewFactorModalCtrl
        };
        
        $scope.newFactorDialog = function() {
            $modal.open($scope.opts).result.then(function(result) {
                if (result) {
                    alert('Factor ' + result.name + 'created succesfully');
                    $location.path('/admin');
                }
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });
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

projects.controller('ProcessesCtrl', ['$scope', 'processesService', '$rootScope',
    '$location', function($scope, processesService, $rootScope, $location) {
        
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
        
        processesService.getProcesses().then(function (processes){
            $scope.processes = processes;
        });
   
    }]);

projects.controller('ProcessDetailCtrl', ['$scope', 'usersService', 'processesService',
    function($scope, usersService, processesService) {

    }]);

function NewProcessFactorsCtrl($scope, $modalInstance, factors) {
    
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

projects.controller('NewProcessCtrl', ['$scope', 'usersService', 'processesService', 'tagsService', '$http',
    '$location', '$modal',
    function($scope, usersService, processesService, tagsService, $http, $location, $modal) {
        $scope.process = {};
        
        $scope.factors = ["Agricultura", "Ganadería", "Clima"];
        $scope.selectedTags = [];
        
        $scope.selectedTag = undefined;
        $scope.selectedLocation = undefined;
        
        $scope.addTag = function() {
            $scope.selectedTags.push($scope.selectedTag);
            $scope.selectedTag = undefined;
        };
        
        $scope.addTagOnIntro = function($event) {
            if ($event.keyCode === 13) {
                $scope.addTag();
            }
        };
        
        $scope.removeTag = function(tag) {
            var index = $scope.selectedTags.indexOf(tag);
            $scope.selectedTags.splice(index, 1);
        };
        
        $scope.getTags = function(val) {
            return tagsService.getTags(val);
        };
        
        $scope.getLocations = function(val) {
            return processesService.getLocations(val);
        };
        
        $scope.opts = {
            keyboard : true,
            backdrop : false,
            resolve : {
                factors : function() {
                    return $scope.factors;
                }
            },
            templateUrl : '/templates/processes/new-process-factors-dialog.html',
            controller : NewProcessFactorsCtrl
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
    
    $scope.totalUsers = 0;
    $scope.currentPage = 1;
    
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    
    usersService.getUsers().then(function(users) {
        $scope.users = users;
        $scope.totalUsers = users.length;
    });
    
}]);
angular.module('services.factors', []).factory('factorsService', function($http) {
    
    return {
        
        countFactors : function() {
            return $http.get('/factors/count').then(function(res) {
                return response.data;
            }, function(err) {
                console.log('Error counting factors ' + err);
                throw new Error('Something went wrong counting factors' + err);
            });
        },
        
        getFactors : function(start, end, callback) {
            $http.get('/factors/get/' + start + '/' + end).then(function(response) {
                callback(response.data);
            }, function(response) {
                console.log('Error getting factors ' + response);
                throw new Error('Something went wrong getting factors' + response);
            });
        },
        
        createFactor : function(factorModel, success, error) {
            var factor = {
                name : factorModel.name,
                description : factorModel.description,
                layers : factorModel.layers
            };
            
            $http.post('/factors/create', factor).then(function(response) {
                success();
            }, function(response) {
                error();
                throw new Error('Something went wrong creating user');
            });
        }
    };
});

angular.module('services.processes', []).factory('processesService', function($http) {
    
    return {
        getLocations : function(val) {
            
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params : {
                    address : val,
                    sensor : false
                }
            }).then(function(res) {
                return res.data.results;
            });
            
        },
        
        getProcesses : function() {
            return $http.get('/processes/get').then(function(response) {
                console.info('Resolving processes promise ' + JSON.stringify(response.data));
                console.info('First process is ' + response.data[0].name);
                return response.data;
            });
        }
    };
});

angular.module('services.tags', []).factory('tagsService', function($http) {
    
    return {
        
        getTags : function(term) {
            return $http.get('/tags/get/' + term).then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error getting tags ' + response);
                throw new Error('Something went wrong getting tags' + response);
            });
        },
    };
});

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
            console.info('Calling server for currrent user');
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
