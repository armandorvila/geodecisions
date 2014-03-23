var dashboard = angular.module('controllers.dashboard', ['services.processes', 'services.users']);

dashboard.controller('DashboardCtrl', ['$scope', 'usersService', 'processesService', '$rootScope',
    function($scope, usersService, processesService, $rootScope) {
        
        $rootScope.subheader.title = 'Geodecisions Dashboard';
        $rootScope.subheader.description = 'Check your latest and favorite processes and take a look to the latest decisions in the community.';
   
        $scope.selected='latest';
        
        $scope.latest = function(){
            $scope.selected='latest';
        };
        
        $scope.favorites = function(){
            $scope.selected='favorites';
        };
        
        $scope.stream = function(){
            $scope.selected='stream';
        };
        
        $scope.notifications = function(){
            $scope.selected='notifications';
        };
        
        $scope.settings = function(){
            $scope.selected='settings';
        };
}]);