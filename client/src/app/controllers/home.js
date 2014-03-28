var dashboard = angular.module('controllers.home', ['services.processes', 'services.users']);

dashboard.controller('HomeCtrl', ['$scope', 'factorsService', 'processesService', '$rootScope', 'socket',
    function($scope, factorsService, processesService, $rootScope, socket) {
        
        $rootScope.subheader.title = 'Welcome to Geodecisions';
        $rootScope.subheader.description = 'Our community stream will help you to be up to date.';
        
        $scope.notifications = [];
        $scope.processNotifications = [];
        
        $scope.newFactor = '';
        $scope.sendNewFactor = function() {
            socket.emit('client:newFactor', $scope.newFactor);
        };
        
        socket.on('server:newFactor', function(data) {
            if ($scope.notifications.indexOf(data) === -1) {
                $scope.notifications.push(data);
            }
        });
        
        $scope.newProcess = '';
        $scope.sendNewProcess = function() {
            socket.emit('client:newProcess', $scope.newProcess);
        };
        
        socket.on('server:newProcess', function(data) {
            if ($scope.processNotifications.indexOf(data) === -1) {
                $scope.processNotifications.push(data);
            }
        });
        
    }]);