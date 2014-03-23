var about = angular.module('controllers.about', []);

about.controller('AboutCtrl',['$scope','$rootScope', function($scope, $rootScope) {
    
    $rootScope.subheader.title = 'Ablout Geodecisions';
    $rootScope.subheader.description = 'What is Geodecisions intended for? Can I take advantage of Geodecisions?';
    
		
}]);