var pricing = angular.module('controllers.pricing', []);

pricing.controller('PricingCtrl',['$scope','$rootScope', function($scope , $rootScope) {
    
    $rootScope.subheader.title = 'Pricing';
    $rootScope.subheader.description = 'Free features could be extended upgrading your account to Geodecisions Enterprise';
    
			
}]);