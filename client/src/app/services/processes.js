angular.module('services.processes', []).factory('processesService', function($http) {
    
    return {
        getLocations : function(val) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params : {
                    address : val,
                    sensor : false
                }
            }).then(function(res) {
                var addresses = [];
                angular.forEach(res.data.results, function(item) {
                    addresses.push(item.formatted_address);
                });
                return addresses;
            });
        },
        
        getProcesses : function(callback) {
            $http.get('/processes/get').then(function(response) {
                callback(response.data);
            }, function(response) {
                console.log('Error getting processes ' + response);
                throw new Error('Something went wrong getting processes' + response);
            });
        },
    };
});
