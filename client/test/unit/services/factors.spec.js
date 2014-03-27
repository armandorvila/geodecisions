describe("Unit: Testing factorsService", function() {
    
    var factorsService = {};
    var $httpBackend = {};
    
    beforeEach(angular.mock.module('app'));
    
    beforeEach(angular.mock.inject(function($injector) {
        factorsService = $injector.get('factorsService');
        $httpBackend = $injector.get('$httpBackend');
    }));
    
    beforeEach(function() {
        // Using the templates cache system this is
        // avoided.
        $httpBackend.expectGET('/users/current').respond(200);
        $httpBackend.expectGET('/templates/home.html').respond(200);
        $httpBackend.expectGET('/templates/login.html').respond(200);
    });
    
    it('should contain a factorsService', function() {
        expect(factorsService).not.toBe(null);
    });
    
    describe("factorsService count", function() {
        
        beforeEach(function() {
            $httpBackend.expectGET('/factors/count').respond(200, 10);
        });
        
        it('Count factors must return 10', function() {
            factorsService.countFactors().then(function(count) {
                expect(count).toBe(10);
                
            });
        });
    });
});