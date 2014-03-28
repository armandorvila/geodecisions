describe("Unit: Testing tagsService", function() {
    
    var tagsService = {};
    var $httpBackend = {};
    
    beforeEach(angular.mock.module('app'));
    
    beforeEach(angular.mock.inject(function($injector) {
        tagsService = $injector.get('tagsService');
        $httpBackend = $injector.get('$httpBackend');
    }));
    
    beforeEach(function() {
        // Using the templates cache system this is
        // avoided.
        $httpBackend.whenGET('/users/current').respond(200);
        $httpBackend.whenGET('/templates/home.html').respond(200);
        $httpBackend.whenGET('/templates/login.html').respond(200);
    });
    
    it('should contain a tagsService', function() {
        expect(tagsService).not.toBe(null);
    });
    
    describe("tagsService getTags", function() {
        
        beforeEach(function() {
            $httpBackend.expectGET('/tags/get/MyT').respond(200, [{
                name : 'MyTag'
            }, {
                name : 'MyTog'
            }]);
        });
        
        it('Get tags must return 2 tags', function() {
            tagsService.getTags('MyT').then(function(tags) {
                expect(tags).not.toBe(null);
                expect(tags.length).toBe(2);
                expect(tags[0]).not.toBe(null);
                expect(tags[0].name).toBe('MyTag');
                expect(tags[1]).not.toBe(null);
                expect(tags[1].name).toBe('MyTog');
            });
            $httpBackend.flush(); // Important
            // to
            // resolve
            // the
            // promise.
        });
    });
    
    describe("tagsService getTagByName", function() {
        
        beforeEach(function() {
            $httpBackend.expectGET('/tags/getByName/MyTag').respond(200, {
                name : 'MyTag'
            });
        });
        
        it('Get tags must return 2 tags', function() {
            tagsService.getTagByName('MyTag').then(function(tag) {
                expect(tag).not.toBe(null);
                expect(tag.name).toBe('MyTag');
            });
            $httpBackend.flush(); 
        });
    });
    
    describe("tagsService createTag", function() {
        
        beforeEach(function() {
            $httpBackend.expectPOST('/tags/create', {
                name : 'MyTag'
            }).respond(200, {
                _id : '129',
                name : 'MyTag'
            });
        });
        
        it('Create a tag should return the tag', function() {
            tagsService.createTag('MyTag').then(function(tag) {
                expect(tag).not.toBe(null);
                expect(tag._id).toBe('129');
                expect(tag.name).toBe('MyTag');
            });
            $httpBackend.flush();
            // to // promise.
        });
    });
});