// uses mocks/services.mocks.js in orser to mock services.

describe("Unit: Testing SingupCtrl", function() {
    
    var scope = {};
    var rootScope = {};
    
    beforeEach(angular.mock.module('app'));
    
    beforeEach(angular.mock.inject(function($rootScope, $controller, $location) {
        
        $rootScope.subheader = {};
        
        scope = $rootScope.$new();
        rootScope = $rootScope;
       
        
        $controller('SingupCtrl', {
            $scope : scope,
            usersService : mockServices.mockUsersServices(),
            $rootScope : $rootScope,
            $location : $location
        });
    }));
    
    describe('SingupCtrl Initial State shoud be', function() {
        
        it('should have subheader title"', function() {
            expect(rootScope.subheader.title).not.toBe(null);
            expect(rootScope.subheader.title).toBe('Sign up for free');
            expect(rootScope.subheader.description).not.toBe(null);
        });
        
        it('should have cancel and clear"', function() {
            expect(scope.clear).not.toBe(null);
            expect(scope.cancel).not.toBe(null);
        });
        
        it('should have signup"', function() {
            expect(scope.signup).not.toBe(null);
        });
        
    });
    
    describe('SingupCtrl operations shoud run', function() {

        it('sign up with not matching passwords"', function() {
            scope.user = {};
            scope.user.password = 'A'; 
            scope.user.confirmPassword = 'B'; 
            scope.signup();
            expect(scope.signupError).not.toBe(null);
        });
        
       
        
        it('sign up with user"', function() {
            scope.user = {};
            scope.user.name = 'A'; 
            scope.user.lastname = 'A'; 
            scope.user.email = 'A'; 
            scope.user.password = 'A'; 
            scope.user.confirmPassword = 'A';
            
            scope.signup();
           
            expect(scope.signupError).toBe(undefined);
        });
    });
    
});