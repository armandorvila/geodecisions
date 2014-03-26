var about = angular.module('controllers.admin', []);

about.controller('AdminCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    
    $rootScope.subheader.title = 'Geodecisions Admin';
    $rootScope.subheader.description = 'Explore all our current available decisions factors';
    
    $scope.selected = 'factors';
    $scope.select = function(li){
        selected = li;
    };
    
}]);