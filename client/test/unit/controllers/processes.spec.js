// uses mocks/services.mocks.js in orser to mock services.

describe("Unit: Testing Processes Controllers", function() {
    
    describe('ProcessesCtrl', function() {
        var scope = {};
        var rootScope = {};
        
        beforeEach(angular.mock.module('app'));
        
        beforeEach(angular.mock.inject(function($rootScope, $controller, $location) {
            
            $rootScope.subheader = {};
            
            scope = $rootScope.$new();
            rootScope = $rootScope;
            
            $controller('ProcessesCtrl', {
                $scope : scope,
                processesService : mockServices.mockProcessesServices(),
                $rootScope : $rootScope,
                $location : $location
            });
        }));
        
        it('should have selected = "In progress"', function() {
            expect(scope.selected).toBe('inProgress');
        });
        
        it('should have subheader title = "Making Decision Processes"', function() {
            expect(rootScope.subheader.title).toBe('Making Decision Processes');
        });
        
        it('should have one process = "Mock Process"', function() {
            expect(scope.processes).not.toBe(null);
            expect(scope.processes.length).toBe(1);
            expect(scope.processes[0].name).toBe('Mock Process');
        });
        
    });
    
});