angular.module('services.tags', []).factory('tagsService', function($http) {
    
    return {
        
        getTags : function(term) {
            return $http.get('/tags/get/' + term).then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error getting tags ' + response);
                throw new Error('Something went wrong getting tags' + response);
            });
        },
        
        getTagByName : function(name) {
            return $http.get('/tags/getByName/' + name).then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error getting tag ' + name);
                throw new Error('Error getting tag ' + name);
            });
        },
        
        createTag : function (tagName) {
            return $http.post('/tags/create', { name : tagName}).then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error creating tag ' + tagName);
                throw new Error('Something went wrong creating tag ' + tagName + ' - ' + response);
            });
        }
    };
});
