// uses mocks/services.mocks.js in orser to mock services.

describe("Unit: Testing DashboardCtrl", function() {
    
    var scope = {};
    var rootScope = {};
    
    beforeEach(angular.mock.module('app'));
    
    beforeEach(angular.mock.inject(function($rootScope, $controller, $location) {
        
        $rootScope.subheader = {};
        
        scope = $rootScope.$new();
        rootScope = $rootScope;
        
        $controller('DashboardCtrl', {
            $scope : scope,
            processesService : mockServices.mockProcessesServices(),
            usersService : mockServices.mockUsersServices(),
            $rootScope : $rootScope,
        });
    }));
    
    describe('DashboardCtrl', function() {
        
        it('should have subheader texts"', function() {
            expect(rootScope.subheader.title).not.toBe(null);
            expect(rootScope.subheader.description).not.toBe(null);
        });
        
        
        it('should have navigation functons"', function() {
            expect(scope.latest).not.toBe(null);
            expect(scope.favorites).not.toBe(null);
            expect(scope.stream).not.toBe(null);
            expect(scope.notifications).not.toBe(null);
            expect(scope.settings).not.toBe(null);
        });
        
    });
    
});