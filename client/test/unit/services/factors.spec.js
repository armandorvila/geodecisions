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
        $httpBackend.whenGET('/users/current').respond(200);
        $httpBackend.whenGET('/templates/home.html').respond(200);
        $httpBackend.whenGET('/templates/login.html').respond(200);
    });
    
    it('should contain a factorsService', function() {
        expect(factorsService).not.toBe(null);
    });
    
    describe("factorsService count", function() {
        
        beforeEach(function() {
            $httpBackend.whenGET('/factors/count').respond(200, 10);
        });
        
        it('Count factors must return 10', function() {
            factorsService.countFactors().then(function(count) {
                expect(count).toBe(10);
                
            });
            $httpBackend.flush();
        });
    });
    
    describe("factorsService getFactors", function() {
        
        beforeEach(function() {
            $httpBackend.whenGET('/factors/get/1/2').respond(200, [{
                name : 'F1'
            }, {
                name : 'F2'
            }]);
        });
        
        it('getFactors(1,2) must return 2 factors', function() {
            factorsService.getFactors(1, 2).then(function(factors) {
                expect(factors).not.toBe(null);
                expect(factors.length).toBe(2);
                expect(factors[0]).not.toBe(null);
                expect(factors[0].name).toBe('F1');
            });
            $httpBackend.flush(); 
        });
    });
    
    describe("factorsService createFactor", function() {
        
        beforeEach(function() {
            $httpBackend.whenPOST('/factors/create').respond(200);
        });
        
        it('createFactor must run OK', function() {
            factorsService.createFactor({
                name : 'F1',
                description : 'Fac1',
                layers : ['Layer1']
            }, function() {}, function() {});
            $httpBackend.flush();
        });
    });
});