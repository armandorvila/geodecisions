angular.module('services.processes', []).factory('processesService', function($http) {
    
    return {
        getLocations : function(val) {
            
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params : {
                    address : val,
                    sensor : false
                }
            }).then(function(res) {
                return res.data.results;
            });
            
        },
        
        getProcesses : function() {
            return $http.get('/processes/get').then(function(response) {
                console.info('Resolving processes promise ' + JSON.stringify(response.data));
                console.info('First process is ' + response.data[0].name);
                return response.data;
            });
        }
    };
});
