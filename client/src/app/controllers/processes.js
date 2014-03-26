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
