// uses mocks/services.mocks.js in orser to mock services.

describe("Unit: Testing Factors Controllers", function() {
    
    describe('FactorsCtrl', function() {
        
        beforeEach(angular.mock.module('app'));
        
        var rootScope = {};
        
        beforeEach(angular.mock.inject(function($rootScope, $controller) {
            
            $rootScope.subheader = {};
            rootScope = $rootScope;
            
            $controller('AboutCtrl', {
                $scope : $rootScope.$new(),
                $rootScope : $rootScope
            });
        }));
        
        it('should have subheader texts"', function() {
            expect(rootScope.subheader.title).not.toBe(null);
            expect(rootScope.subheader.description).not.toBe(null);
        });
        
    });
    
    describe('FactorsListCtrl', function() {
        
        var scope = {};
        
        beforeEach(angular.mock.module('app'));
        
        beforeEach(angular.mock.inject(function($rootScope, $controller, $location) {
            
            $rootScope.subheader = {};
            
            scope = $rootScope.$new();
            
            $controller('FactorsListCtrl', {
                $scope : scope,
                $rootScope : $rootScope,
                factorsService : mockServices.mockFactorsService(),
            });
        }));
        
        it('should have pagination"', function() {
            expect(scope.start).not.toBe(null);
            expect(scope.end).not.toBe(null);
            expect(scope.setPage).not.toBe(null);
            expect(scope.paginate).not.toBe(null);
            expect(scope.end).not.toBe(null);
        });
        
        it('should call factors.count"', function() {
            expect(scope.totalItems).not.toBe(null);
            expect(scope.totalItems).toBe(10);
        });
        
        it('should call factors.get once"', function() {
            expect(scope.factors).not.toBe(null);
            expect(scope.factors[0]).not.toBe(null);
            expect(scope.factors[0].name).toBe('Mock Factor');
        });
        
    });
    
});