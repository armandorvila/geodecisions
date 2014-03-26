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
