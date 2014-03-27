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
    };
});
