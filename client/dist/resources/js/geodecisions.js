angular.module('app', ['ngRoute', 'controllers.users', 'controllers.processes', 'controllers.about',
    'controllers.pricing', 'controllers.login', 'controllers.signup', 'controllers.home',
    'controllers.factors', 'controllers.admin', 'services.users', 'services.factors', 'services.tags',
    'ui.bootstrap', 'btford.socket-io','google-maps']);

angular.module('app').config(
        ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            
            $locationProvider.html5Mode(true);
            
            $routeProvider.when('/signup/', {
                templateUrl : '/templates/signup.html',
                controller : 'SingupCtrl',
                user : false
            }).when('/home/', {
                templateUrl : '/templates/home.html',
                controller : 'HomeCtrl',
                user : true
            }).when('/login/', {
                templateUrl : '/templates/login.html',
                controller : 'LoginCtrl',
                user : false
            }).when('/factors/', {
                templateUrl : '/templates/factors.html',
                controller : 'FactorsCtrl',
                user : true
            }).when('/admin/', {
                templateUrl : '/templates/admin/admin-factors.html',
                controller : 'AdminCtrl',
                user : true,
                admin : true
            }).when('/admin/factors/', {
                templateUrl : '/templates/admin/admin-factors.html',
                controller : 'AdminCtrl',
                user : true,
                admin : true
            }).when('/admin/users/', {
                templateUrl : '/templates/admin/admin-users.html',
                controller : 'AdminCtrl',
                user : true,
                admin : true
            }).when('/admin/tags/', {
                templateUrl : '/templates/admin/admin-tags.html',
                controller : 'AdminCtrl',
                user : true,
                admin : true
            }).when('/processes/', {
                templateUrl : '/templates/processes.html',
                controller : 'ProcessesCtrl',
                user : true
            }).when('/process/:processId/', {
                templateUrl : '/templates/processes/process-detail.html',
                controller : 'ProcessDetailCtrl',
                user : true
            }).when('/newProcess/', {
                templateUrl : '/templates/processes/new-process.html',
                controller : 'NewProcessCtrl',
                user : true
            }).when('/pricing/', {
                templateUrl : '/templates/pricing.html',
                controller : 'PricingCtrl',
                user : false
            }).when('/about/', {
                templateUrl : '/templates/about.html',
                controller : 'AboutCtrl',
                user : false
            }).when('/projects/:projectId', {
                templateUrl : 'templates/process-detail.html',
                controller : 'ProcessDetailCtrl',
                user : true
            }).otherwise({
                redirectTo : '/home/'
            });
        }]);

angular.module('app').factory('socket', function(socketFactory) {
    return socketFactory();
});

angular.module('app').filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});

angular.module('app').run(
        ['$rootScope', 'usersService', '$location', '$route',
            function($rootScope, usersService, $location, $route) {
                
                $rootScope.$on('$routeChangeStart', function(event, next, current) {
                    
                    if (!$rootScope.currentUser && next.user) {
                        usersService.getCurrentUser().then(function(user) {
                            if (user) {
                                $rootScope.currentUser = user;
                                
                                if (next.admin && !user.admin) {
                                    $location.path('/home');
                                }
                            } else {
                                $location.path('/login');
                            }
                        });
                    } else if (next.admin && !$rootScope.currentUser.admin) {
                        $location.path('/home');
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
                        $rootScope.subheader = {
                            title : 'Welcome to Geodecisions',
                            description : 'Geodecisions drives your decision making processes using geographic information.'
                        };
                        
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
        
        $scope.paginate = function(page) {
            factorsService.getFactors($scope.start(page), $scope.end(page)).then(function(factors) {
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

var home = angular.module('controllers.home', ['services.processes', 'services.users']);

home.controller('HomeCtrl', ['$scope', 'factorsService', 'processesService', '$rootScope', 'socket',
    function($scope, factorsService, processesService, $rootScope, socket) {
        $rootScope.subheader.title = 'Welcome to Geodecisions';
        $rootScope.subheader.description = 'Our community stream will help you to be up to date and have fresh ideas.';
        
        $scope.communityStream = [];
        
        $scope.addNotification = function(notification) {
            
            var duplicated = false;
            
            angular.forEach($scope.communityStream, function(value, key) {
                if ($scope.communityStream[key].name === notification.name) {
                    duplicated = true;
                }
            });
            
            if (!duplicated) {
                $scope.communityStream.push(notification);
                if ($scope.communityStream.length > 10) {
                    $scope.communityStream.shift();
                }
            }
        };
        
        socket.on('server:newFactor', function(notification) {
            if ($scope.communityStream.indexOf(notification) === -1) {
                console.log('Received server:newFactor' + JSON.stringify(notification));
                $scope.addNotification(JSON.parse(notification));
            }
        });
        
        socket.on('server:newProcess', function(notification) {
            console.log('Received server:newProcess' + JSON.stringify(notification));
            $scope.addNotification(JSON.parse(notification));
        });
        
        $scope.name = '';
        
        $scope.simulateNewFactor = function() {
            socket.emit('client:newFactor', {
                name : $scope.name,
                description : 'Mock factor sent from home to test the stream'
            });
        };
        
        $scope.simulateNewProcess = function() {
            socket.emit('client:newProcess', {
                name : $scope.name,
                description : 'Mock Process sent from home to test the stream'
            });
        };
        
    }]);
var login = angular.module('controllers.login', ['services.users']);

login.controller('LoginCtrl', [ '$scope', 'usersService', '$rootScope', '$location',
    function($scope, usersService, $rootScope, $location) {
        
        $rootScope.subheader.title = 'Welcome to Geodecisions';
        $rootScope.subheader.description = 'Geodecisions drives your decision making processes using geographic information.';
        
        $scope.authError = null;
        $scope.credentials = {};
        
        $scope.validateCredentials = function (){
            var email = $scope.credentials.email;
            var password = $scope.credentials.password;
            return  email && password && email !== '' && password !== '';
        };
        
        $scope.login = function() {
            if ($scope.validateCredentials()) {
                usersService.login($scope.credentials.email, $scope.credentials.password,
                        function(loggedUser) {
                            $rootScope.currentUser = loggedUser;
                            $location.path('/home');
                        }, function(message) {
                            $scope.authError = message;
                            $location.path('/login');
                        });
            } else {
                $scope.authError = 'username and password are empty.';
            }
        };
        
        $scope.logout = function() {
            usersService.logout(function() {
                $location.path('/');
            });
        };
        
        $scope.clearLogin = function() {
            $scope.credentials = {};
        };
        
    }]);
var pricing = angular.module('controllers.pricing', []);

pricing.controller('PricingCtrl',['$scope','$rootScope', function($scope , $rootScope) {
    
    $rootScope.subheader.title = 'Pricing';
    $rootScope.subheader.description = 'Free features could be extended upgrading your account to Geodecisions Enterprise';
}]);
var projects = angular.module('controllers.processes', ['services.processes', 'services.users']);

projects.controller('ProcessesCtrl', ['$scope', 'processesService', '$rootScope', '$location',
    function($scope, processesService, $rootScope, $location) {
        
        $rootScope.subheader.title = 'Making Decision Processes';
        $rootScope.subheader.description = 'Create, continue and close your making decision processes.';
        
        $scope.newProcess = function() {
            $location.path('/newProcess/');
        };
        
        processesService.getUserProcesses().then(function(processes) {
            $scope.processes = processes;
        });
    }]);

projects.controller('ProcessDetailCtrl', ['$scope', 'usersService', 'processesService', '$routeParams',
    function($scope, usersService, processesService, $routeParams) {
        
        $scope.map = {
            center : {
                latitude : 45,
                longitude : -73
            },
            zoom : 8
        };
        
        processesService.getProcessById($routeParams.processId).then(function(process) {
            $scope.process = process;
            $scope.map.latitude = process.location.lat;
            $scope.map.longitude = process.location.lng;
            $scope.map.refresh = true;
        });
        
    }]);

function NewProcessFactorsCtrl($scope, $modalInstance, factorsService) {
    
    $scope.inputFactor = '';
    
    $scope.getFactors = function(val) {
        return factorsService.getFactorsByName(val);
    };
    
    $scope.addFactor = function(inputFactor) {
        factorsService.getFactorByName(inputFactor).then(function(factor) {
            $scope.process.factors.push(factor);
            $scope.inputFactor = '';
        });
    };
    
    $scope.removeFactor = function(factor) {
        var index = $scope.selectedFactors.indexOf(factor);
        $scope.process.factors.splice(index, 1);
    };
    
    $scope.ok = function() {
        $modalInstance.close($scope.process);
    };
    
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}

projects.controller('NewProcessCtrl', ['$scope', '$rootScope', 'processesService', 'tagsService',
    'factorsService', '$location', '$modal',
    function($scope, $rootScope, processesService, tagsService, factorsService, $location, $modal) {
        
        $scope.process = {
            user : $rootScope.currentUser,
            tags : [],
            factors : []
        };
        $scope.inputLocation = '';
        $scope.inputTag = '';
        
        $scope.getLocations = function(val) {
            return processesService.getLocations(val);
        };
        
        $scope.getTags = function(val) {
            return tagsService.getTags(val);
        };
        
        $scope.addLocation = function() {
            processesService.getLocation($scope.inputLocation).then(function(location) {
                $scope.process.location = location;
                console.info('Got location for ' + location.address);
            });
        };
        
        $scope.checkInputTag = function() {
            if ($scope.process.tags.indexOf($scope.inputTag) !== -1) {
                alert('Tag is already added');
                return false;
            }
            return true;
        };
        
        $scope.addTag = function() {
            if ($scope.checkInputTag()) {
                tagsService.getTagByName($scope.inputTag).then(function(tag) {
                    $scope.process.tags.push(tag);
                    $scope.inputTag = '';
                });
            }
        };
        
        $scope.addTagOnIntro = function($event) {
            if ($event.keyCode === 13 && $scope.checkInputTag()) {
                tagsService.createTag($scope.inputTag).then(function(newTag) {
                    $scope.process.tags.push(newTag);
                    console.info('Created new tag ' + newTag);
                    $scope.inputTag = '';
                });
            }
        };
        
        $scope.removeTag = function(tag) {
            var index = $scope.process.tags.indexOf(tag);
            $scope.process.tags.splice(index, 1);
        };
        
        // Dialog for factors
        $scope.opts = {
            keyboard : true,
            backdrop : false,
            scope : $scope,
            resolve : {
                factorsService : function() {
                    return factorsService;
                },
            },
            templateUrl : '/templates/processes/new-process-factors.html',
            controller : NewProcessFactorsCtrl
        };
        
        $scope.factorsPopup = function() {
            $modal.open($scope.opts).result.then(function(process) {
                processesService.createProcess(process).then(function(process) {
                    alert(process.name + ' Created !!!');
                });
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
        
        $scope.cancel = function() {
            $location.path('/processes');
        };
        
    }]);

var login = angular.module('controllers.signup', ['services.users']);

login.controller('SingupCtrl', ['$scope', 'usersService', '$rootScope', '$location',
    function($scope, usersService, $rootScope, $location) {
        
        $rootScope.subheader.title = 'Sign up for free';
        $rootScope.subheader.description = 'Start using Geodecisions for free now.';
      

        $scope.signup = function() {
            if ($scope.user.password === $scope.user.confirmPassword) {
                usersService.create($scope.user,function() {
                        $scope.signupError = 'Error creating user, try it again later.';
                    },function() {
                        usersService.login($scope.user.email, $scope.user.password, function(loggedUser) {
                            $rootScope.currentUser = loggedUser;
                            $location.path('/home');
                        }, function(message) {
                            $location.path('/login');
                        });
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
angular.module('services.factors', []).factory('factorsService', function($http, socket) {
    
    return {
        
        countFactors : function() {
            return $http.get('/factors/count').then(function(res) {
                return res.data;
            }, function(err) {
                console.log('Error counting factors ' + err);
                throw new Error('Something went wrong counting factors' + err);
            });
        },
        
        getFactors : function(start, end) {
            return $http.get('/factors/get/' + start + '/' + end).then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error getting factors ' + response);
                throw new Error('Something went wrong getting factors' + response);
            });
        },
        
        getFactorsByName : function(term) {
            return $http.get('/factors/getFactorsByName/' + term).then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error getting factors ' + response);
                throw new Error('Something went wrong getting factors' + response);
            });
        },
        
        getFactorByName : function(name) {
            return $http.get('/factors/getFactorByName/' + name).then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error getting factor ' + name);
                throw new Error('Something went wrong getting factor' + name);
            });
        },
        
        createFactor : function(factorModel, success, error) {
            var factor = {
                name : factorModel.name,
                description : factorModel.description,
                layers : factorModel.layers
            };
            
            $http.post('/factors/create', factor).then(function(response) {
                socket.emit('client:newFactor', {
                    name : factor.name,
                    description : factor.description
                });
                success();
            }, function(response) {
                error();
                throw new Error('Something went wrong creating user');
            });
        }
    };
});

angular.module('services.processes', []).factory('processesService', function($http, socket) {
    
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
        
        getLocation : function(formattedAddress) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params : {
                    address : formattedAddress,
                    sensor : false
                }
            }).then(function(res) {
                var loc = res.data.results[0];
                return {
                    address : loc.formatted_address,
                    lat : loc.geometry.location.lat,
                    lng : loc.geometry.location.lng
                };
            });
        },
        
        createProcess : function(process) {
            return $http.post('/processes/create', process).then(function(response) {
                
                socket.emit('client:newFactor', {
                    name : process.name,
                    description : process.description
                });
                
                return response.data;
            });
        },
        
        getProcessById : function(id) {
            return $http.get('/processes/getById/' + id).then(function(response) {
                return response.data;
            });
        },
        
        getUserProcesses : function() {
            return $http.get('/processes/currentUser').then(function(response) {
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
        
        getTagByName : function(name) {
            return $http.get('/tags/getByName/' + name).then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error getting tag ' + name);
                throw new Error('Error getting tag ' + name);
            });
        },
        
        createTag : function (tagName) {
            return $http.post('/tags/create', { name : tagName}).then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error creating tag ' + tagName);
                throw new Error('Something went wrong creating tag ' + tagName + ' - ' + response);
            });
        }
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
