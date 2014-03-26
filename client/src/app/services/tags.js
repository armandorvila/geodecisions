angular.module('services.tags', []).factory('tagsService', function($http) {
    
    return {
        
        getTags : function(term) {
            return $http.get('/tags/get/' + term).then(function(response) {
                var tags = [];
                angular.forEach(response.data, function(item) {
                    tags.push(item);
                });
                return tags;

            }, function(response) {
                console.log('Error getting tags ' + response);
                throw new Error('Something went wrong getting tags' + response);
            });
        },
    };
});
