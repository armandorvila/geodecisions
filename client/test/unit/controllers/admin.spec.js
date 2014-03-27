// uses mocks/services.mocks.js in orser to mock services.

describe("Unit: Testing AdminCtrl", function() {
    
    var scope = {};
    var rootScope = {};
    
    beforeEach(angular.mock.module('app'));
    
    beforeEach(angular.mock.inject(function($rootScope, $controller, $location) {
        
        $rootScope.subheader = {};
        
        scope = $rootScope.$new();
        rootScope = $rootScope;
        
        $controller('AdminCtrl', {
            $scope : scope,
            $rootScope : $rootScope,
            $location : $location
        });
    }));
    
    describe('AdminCtrl', function() {
        
        it('should have subheader texts"', function() {
            expect(rootScope.subheader.title).not.toBe(null);
            expect(rootScope.subheader.description).not.toBe(null);
        });
        
        it('should have naivation function"', function() {
            expect(scope.select).not.toBe(null);
        });
        
    });
    
});