var home = angular.module('controllers.home', ['services.processes', 'services.users']);

home.controller('HomeCtrl', ['$scope', 'factorsService', 'processesService', '$rootScope', 'socket',
    function($scope, factorsService, processesService, $rootScope, socket) {
        $rootScope.subheader.title = 'Welcome to Geodecisions';
        $rootScope.subheader.description = 'Our community stream will help you to be up to date and have fresh ideas.';
        
        $scope.communityStream = [];
        
        $scope.addNotification = function(notification) {
            
            var duplicated = false;
            
            angular.forEach($scope.communityStream, function(value, key) {
                if ($scope.communityStream[key].name === notification.name) {
                    duplicated = true;
                }
            });
            
            if (!duplicated) {
                $scope.communityStream.push(notification);
                if ($scope.communityStream.length > 10) {
                    $scope.communityStream.shift();
                }
            }
        };
        
        socket.on('server:newFactor', function(notification) {
            if ($scope.communityStream.indexOf(notification) === -1) {
                console.log('Received server:newFactor' + JSON.stringify(notification));
                $scope.addNotification(JSON.parse(notification));
            }
        });
        
        socket.on('server:newProcess', function(notification) {
            console.log('Received server:newProcess' + JSON.stringify(notification));
            $scope.addNotification(JSON.parse(notification));
        });
        
        $scope.name = '';
        
        $scope.simulateNewFactor = function() {
            socket.emit('client:newFactor', {
                name : $scope.name,
                description : 'Mock factor sent from home to test the stream'
            });
        };
        
        $scope.simulateNewProcess = function() {
            socket.emit('client:newProcess', {
                name : $scope.name,
                description : 'Mock Process sent from home to test the stream'
            });
        };
        
    }]);