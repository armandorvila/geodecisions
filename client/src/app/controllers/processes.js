var projects = angular.module('controllers.processes', ['services.processes', 'services.users']);

projects.controller('ProcessesCtrl', ['$scope', 'processesService', '$rootScope', '$location',
    function($scope, processesService, $rootScope, $location) {
        
        $rootScope.subheader.title = 'Making Decision Processes';
        $rootScope.subheader.description = 'Create, continue and close your making decision processes.';
        
        $scope.newProcess = function() {
            $location.path('/newProcess');
        };
        
        processesService.getUserProcesses().then(function(processes) {
            $scope.processes = processes;
        });
    }]);

projects.controller('ProcessDetailCtrl', ['$scope', 'usersService', 'processesService',
    function($scope, usersService, processesService) {

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
