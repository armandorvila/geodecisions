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
