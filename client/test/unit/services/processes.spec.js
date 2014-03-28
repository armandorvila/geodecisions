describe("Unit: Testing ProcessesService", function() {
    
    var processesService = {};
    var $httpBackend = {};
    
    beforeEach(angular.mock.module('app'));
    
    beforeEach(angular.mock.inject(function($injector) {
        processesService = $injector.get('processesService');
        $httpBackend = $injector.get('$httpBackend');
    }));
    
    beforeEach(function() {
        // Using the templates cache system this is
        // avoided.
        $httpBackend.whenGET('/users/current').respond(200);
        $httpBackend.whenGET('/templates/home.html').respond(200);
        $httpBackend.whenGET('/templates/login.html').respond(200);
    });
    
    it('should contain a processesService', function() {
        expect(processesService).not.toBe(null);
    });
    
    describe("ProcessesService.getProcesses:", function() {
        
        beforeEach(function() {
            $httpBackend.whenGET('/processes/currentUser').respond(200, [{
                name : 'mockProcess'
            }]);
        });
        
        it('should contain a processesService', function() {
            expect(processesService).not.toBe(null);
        });
        
        it('Get processes', function() {
            
            var promise = processesService.getUserProcesses();
            $httpBackend.flush();
            promise.then(function(processes){
                expect(processes.length).toBe(1);
                expect(processes[0].name).toBe('mockProcess');
            });
            
        });
    });
    
    describe("ProcessesService.getLocations:", function() {
        
        beforeEach(function() {
            $httpBackend.whenGET('http://maps.googleapis.com/maps/api/geocode/json?address=Ma&sensor=false')
                    .respond(200, [{
                        formatted_address : 'Madrid'
                    }]);
        });
        
        it('Get Locations', function() {
            var addresses = processesService.getLocations('Ma');
            $httpBackend.flush();
            
            addresses.then(function(addresses){
                expect(addresses).not.toBe(null);
                expect(addresses[0]).toBe('Madrid');
            });
        });
    });
});