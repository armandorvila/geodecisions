angular.module('services.processes', []).factory('processesService', function($http, socket) {
    
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
        
        getLocation : function(formattedAddress) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params : {
                    address : formattedAddress,
                    sensor : false
                }
            }).then(function(res) {
                var loc = res.data.results[0];
                return {
                    address : loc.formatted_address,
                    lat : loc.geometry.location.lat,
                    lng : loc.geometry.location.lng
                };
            });
        },
        
        createProcess : function(process) {
            return $http.post('/processes/create', process).then(function(response) {
                
                socket.emit('client:newFactor', {
                    name : process.name,
                    description : process.description
                });
                
                return response.data;
            });
        },
        
        getProcessById : function(id) {
            return $http.get('/processes/getById/' + id).then(function(response) {
                return response.data;
            });
        },
        
        getUserProcesses : function() {
            return $http.get('/processes/currentUser').then(function(response) {
                return response.data;
            });
        }
    };
});
