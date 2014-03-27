describe("Unit: Testing usersService", function() {
    
    var usersService = {};
    var $httpBackend = {};
    
    beforeEach(angular.mock.module('app'));
    
    beforeEach(angular.mock.inject(function($injector) {
        usersService = $injector.get('usersService');
        $httpBackend = $injector.get('$httpBackend');
    }));
    
    beforeEach(function() {
        // Using the templates cache system this is not
        // necessary
        $httpBackend.whenGET('/users/current').respond(200);
        $httpBackend.whenGET('/templates/home.html').respond(200);
        $httpBackend.whenGET('/templates/login.html').respond(200);
    });
    
    it('should contain a usersService', function() {
        expect(usersService).not.toBe(null);
    });
    
    describe("usersService getUsers", function() {
        
        beforeEach(function() {
            $httpBackend.expectGET('/users/get').respond(200, [{
                name : 'Armando'
            }]);
        });
        
        it('Get users must return only Armando', function() {
            usersService.getUsers().then(function(users) {
                expect(users).not.toBe(null);
                expect(users.length).toBe(1);
                expect(users[0]).not.toBe(null);
                expect(users[0].name).toBe('Armando');
            });
            $httpBackend.flush(); // Important
        });
    });
    
    describe("usersService loadCurrentUser", function() {
        
        beforeEach(function() {
            $httpBackend.expectGET('/users/current').respond(200, [{
                name : 'Armando'
            }]);
        });
        
        it('load current user must return Armando', function() {
            usersService.loadCurrentUser(function() {}, function() {});
            $httpBackend.flush(); // Important
        });
    });
    
    describe("usersService login", function() {
        
        beforeEach(function() {
            $httpBackend.expectPOST('/users/login', {
                email : 'u@gmail.com',
                password : 'secret'
            }).respond(200, {
                email : 'u@gmail.com'
            });
        });
        
        it('Get users must return only Armando', function() {
            usersService.login('u@gmail.com', 'secret', function(currentUser) {
                expect(currentUser).not.toBe(null);
                expect(currentUser.email).toBe('u@gmail.com');
            }, function(mess) {});
            $httpBackend.flush();
        });
    });
    
    describe("usersService logout", function(callback) {
        beforeEach(function() {
            $httpBackend.expectPOST('/users/logout').respond(200);
        });
        
        it('Logout must run fine', function() {
            usersService.logout(function() {});
            $httpBackend.flush();
        });
    });
    
    describe("usersService createUser", function() {
        
        beforeEach(function() {
            $httpBackend.expectPOST('/users/create').respond(200);
        });
        
        it('Get users must return only Armando', function() {
            usersService.create({
                name : 'U1',
                lastname : 'U1',
                email : 'u1@g.com',
                password : 'u1'
            }, function() {}, function() {});
            $httpBackend.flush();
        });
    });
});