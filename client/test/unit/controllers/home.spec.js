// uses mocks/services.mocks.js in orser to mock services.

describe("Unit: Testing HomeCtrl", function() {
    
    var scope = {};
    
    beforeEach(angular.mock.module('app'));
    
    beforeEach(angular.mock.inject(function($rootScope, $controller, $location) {
        
        $rootScope.subheader = {};
        
        scope = $rootScope.$new();
        rootScope = $rootScope;
        
        $controller('HomeCtrl', {
            $scope : scope,
            processesService : mockServices.mockProcessesServices(),
            usersService : mockServices.mockUsersServices(),
            $rootScope : $rootScope,
        });
    }));
    
    describe('HomeCtrl', function() {
        

        
    });
    
});