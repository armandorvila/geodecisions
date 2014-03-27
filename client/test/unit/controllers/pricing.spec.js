// uses mocks/services.mocks.js in orser to mock services.

describe("Unit: Testing PricingCtrl", function() {
    
    var scope = {};
    var rootScope = {};
    
    beforeEach(angular.mock.module('app'));
    
    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        
        $rootScope.subheader = {};
        
        scope = $rootScope.$new();
        rootScope = $rootScope;
        
        $controller('PricingCtrl', {
            $scope : scope,
            $rootScope : $rootScope,
        });
    }));
    
    describe('PricingCtrl state should be', function() {
        
        it('should have subheader texts"', function() {
            expect(rootScope.subheader.title).not.toBe(null);
            expect(rootScope.subheader.description).not.toBe(null);
        });
        
    });
    
});