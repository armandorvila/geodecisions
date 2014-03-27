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
