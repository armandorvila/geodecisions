describe("Unit: Testing usersService", function() {
    
    var usersService = {};
    var $httpBackend = {};
    
    beforeEach(angular.mock.module('app'));
    
    beforeEach(angular.mock.inject(function($injector) {
        usersService = $injector.get('usersService');
        $httpBackend = $injector.get('$httpBackend');
    }));
    
    beforeEach(function() {
        // Using the templates cache system this is
        // avoided.
        $httpBackend.expectGET('/users/current').respond(200);
        $httpBackend.expectGET('/templates/home.html').respond(200);
        $httpBackend.expectGET('/templates/login.html').respond(200);
    });
    
    it('should contain a usersService', function() {
        expect(usersService).not.toBe(null);
    });
    
    describe("usersService getUsers", function() {
        
        beforeEach(function() {
            $httpBackend.whenGET('/users/get').respond(200, [{
                name : 'Armando'
            }]);
        });
        
        it('Get users must return only Armando', function() {
            usersService.getUsers().then(function(users) {
                expect(users).not.toBe(null);
                expect(users.length).toBe(1);
                expect(users[0]).not.toBe(null);
                expect(users[0]).toBe('Armando');
            });
        });
    });
});