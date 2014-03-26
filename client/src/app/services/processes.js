angular.module('services.processes', []).factory('processesService', function($http) {
    
    return {
        getLocations : function(val, callback){
            promise = $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params : {
                    address : val,
                    sensor : false
                }
            });
            
            return promise.then(function(res) {
                callback(res.data.results);
            });
        }
    };
});
