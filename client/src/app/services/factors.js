angular.module('services.factors', []).factory('factorsService', function($http) {
    
    return {
        
        countFactors : function() {
            return $http.get('/factors/count').then(function(res) {
                return response.data;
            }, function(err) {
                console.log('Error counting factors ' + err);
                throw new Error('Something went wrong counting factors' + err);
            });
        },
        
        getFactors : function(start, end, callback) {
            $http.get('/factors/get/' + start + '/' + end).then(function(response) {
                callback(response.data);
            }, function(response) {
                console.log('Error getting factors ' + response);
                throw new Error('Something went wrong getting factors' + response);
            });
        },
        
        createFactor : function(factorModel, success, error) {
            var factor = {
                name : factorModel.name,
                description : factorModel.description,
                layers : factorModel.layers
            };
            
            $http.post('/factors/create', factor).then(function(response) {
                success();
            }, function(response) {
                error();
                throw new Error('Something went wrong creating user');
            });
        }
    };
});
