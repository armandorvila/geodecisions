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

        it('should have subheader title = "Making Decision Processes"', function() {
            expect(rootScope.subheader.title).toBe('Making Decision Processes');
        });
        
        it('should have one process = "Mock Process"', function() {
            expect(scope.processes).not.toBe(null);
            expect(scope.processes.length).toBe(1);
            expect(scope.processes[0].name).toBe('Mock Process');
        });
        
    });
    
    describe('NewProcessCtrl', function() {
        var scope = {};
        var rootScope = {};
        
        beforeEach(angular.mock.module('app'));
        
        beforeEach(angular.mock.inject(function($rootScope, $controller, $location, $modal) {
            $rootScope.subheader = {};
            
            scope = $rootScope.$new();
            rootScope = $rootScope;
            
            $controller('NewProcessCtrl', {
                $scope : scope,
                processesService : mockServices.mockProcessesServices(),
                tagsService : mockServices.mockTagsServices(),
                $rootScope : $rootScope,
                $location : $location,
                $modal : $modal
            });
        }));
        
        it('should have subheader text', function() {
            expect(rootScope.subheader.title).not.toBe(null);
            expect(rootScope.subheader.description).not.toBe(null);
        });
        
        describe('Should get tags ', function() {
            
            it('should get Mock tag when getTags', function() {
                scope.getTags('M').then(function(tags) {
                    expect(tags).not.toBe(null);
                    expect(tags[0]).not.toBe(null);
                    expect(tags[0].name).toBe('Mock Tag');
                });
            });
        });
        
        describe('Should add tag on intro', function() {
            
            scope.selectedTag = 'New';
            
            it('should get a Mock tag when create tag', function() {
                scope.addTagOnIntro({keyCode : 13});
                expect(scope.process.tags.length).toBe(1);
            });
        });
        
        describe('Should get locations ', function() {
            
            it('should have subheader text', function() {
                scope.getLocations('M').then(function(locations) {
                    expect(locations).not.toBe(null);
                    expect(locations[0]).not.toBe(null);
                    expect(locations[0].formatted_address).toBe('Mock Location');
                });
            });
        });
        
    });
    
});