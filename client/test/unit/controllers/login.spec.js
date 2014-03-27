// uses mocks/services.mocks.js in orser to mock services.

describe("Unit: Testing LoginCtrl", function() {
    
    var scope = {};
    var rootScope = {};
    
    beforeEach(angular.mock.module('app'));
    
    beforeEach(angular.mock.inject(function($rootScope, $controller, $location) {
        $rootScope.subheader = {};
        
        scope = $rootScope.$new();
        rootScope = $rootScope;
        
        $controller('LoginCtrl', {
            $scope : scope,
            usersService : mockServices.mockUsersServices(),
            $rootScope : $rootScope,
            $location : $location
        });
    }));
    
    describe('LoginCtrl state should be', function() {
        it('should have subheader texts"', function() {
            expect(rootScope.subheader.title).not.toBe(null);
            expect(rootScope.subheader.description).not.toBe(null);
        });
        
        it('should have login, logout and clear"', function() {
            expect(scope.login).not.toBe(null);
            expect(scope.logout).not.toBe(null);
            expect(scope.clearLogin).not.toBe(null);
        });
        
    });
    
    describe('LoginCtrl login should run', function() {
        
        scope.credentials = {};
        
        it('should give error when no email or password"', function() {
            scope.credentials.email = '';
            scope.credentials.password = '';
            scope.login();
            expect(scope.authError).not.toBe(null);
            expect(rootScope.currentUser).toBe(undefined);
        });
        
        it('should give a user for correct email and password"', function() {
            scope.credentials.email = 'A';
            scope.credentials.password = 'B';
            scope.login();
            expect(scope.authError).toBe(null);
            expect(rootScope.currentUser).not.toBe(undefined);
            expect(rootScope.currentUser).not.toBe(null);
            expect(rootScope.currentUser.name).toBe('Armando');
        });
    });
});