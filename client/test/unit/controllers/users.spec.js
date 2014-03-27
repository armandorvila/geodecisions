// uses mocks/services.mocks.js in orser to mock services.

describe("Unit: Testing Users Controllers", function() {
    
    describe('UsersListtrl', function() {
        var scope = {};

        beforeEach(angular.mock.module('app'));
        
        beforeEach(angular.mock.inject(function($rootScope, $controller) {
            
            $rootScope.subheader = {};
            
            scope = $rootScope.$new();
            rootScope = $rootScope;
            
            $controller('UsersListCtrl', {
                $scope : scope,
                usersService : mockServices.mockUsersServices(),
            });
        }));
       
        
        it('should have pagging elements"', function() {
            expect(scope.totalUsers).not.toBe(null);
            expect(scope.currentPage).not.toBe(null);
        });
        
        it('should have users"', function() {
            expect(scope.users).not.toBe(null);
            expect(scope.users[0]).not.toBe(null);
            expect(scope.users[0].name).toBe('Armando');
        });
       
    });
    
});