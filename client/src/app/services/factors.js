angular.module('services.factors', []).factory('factorsService', function($http) {
    
    return {
        
        countFactors : function() {
            return $http.get('/factors/count').then(function(res) {
                return res.data;
            }, function(err) {
                console.log('Error counting factors ' + err);
                throw new Error('Something went wrong counting factors' + err);
            });
        },
        
        getFactors : function(start, end) {
            return $http.get('/factors/get/' + start + '/' + end).then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error getting factors ' + response);
                throw new Error('Something went wrong getting factors' + response);
            });
        },
        
        getFactorsByName : function(term) {
            return $http.get('/factors/getFactorsByName/' + term).then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error getting factors ' + response);
                throw new Error('Something went wrong getting factors' + response);
            });
        },
        
        getFactorByName : function(name) {
            return $http.get('/factors/getFactorByName/' + name).then(function(response) {
                return response.data;
            }, function(response) {
                console.log('Error getting factor ' + name);
                throw new Error('Something went wrong getting factor' + name);
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
