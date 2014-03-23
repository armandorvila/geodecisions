var projects = angular.module('controllers.processes', ['services.processes', 'services.users']);

projects
        .controller(
                'ProcessesCtrl',
                [
                    '$scope',
                    'usersService',
                    'processesService', '$rootScope',
                    function($scope, usersService, processesService, $rootScope) {
                        
                        $rootScope.subheader.title = 'Making Decision Processes';
                        $rootScope.subheader.description = 'Create, continue and close your making decision processes.';
                        
                        $scope.selected = 'inProgress';
                        
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