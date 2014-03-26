var about = angular.module('controllers.admin', []);

about.controller('AdminCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    
    $rootScope.subheader.title = 'Geodecisions Admin';
    $rootScope.subheader.description = 'Explore all our current available decisions factors';
    
    $scope.selected = function(){
        return $location.hash() ? $location.hash() : 'factors';
    };
    
}]);