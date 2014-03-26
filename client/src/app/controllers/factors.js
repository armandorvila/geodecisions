var about = angular.module('controllers.factors', []);

about.controller('FactorsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    
    $rootScope.subheader.title = 'Geodecisions Factors';
    $rootScope.subheader.description = 'Explore all our current available decisions factors';
    
}]);