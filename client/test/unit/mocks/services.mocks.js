var mockServices = {
        mockFactorsService : function() {
        return {
            getFactors : function(start, end) {
                return {
                    then : function(callback) {
                        callback([{
                            name : 'Mock Factor'
                        }]);
                    }
                };
            },
            countFactors : function() {
                return {
                    then : function(callback) {
                        callback(10);
                    }
                };
            }
        };
    },
    
    mockProcessesServices : function() {
        return {
            getProcesses : function() {
                return {
                    then : function(callback) {
                        callback([{
                            name : 'Mock Process'
                        }]);
                    }
                };
            },
        };
    },
    mockUsersServices : function() {
        return {
            getUsers : function(callback) {
                return {
                    then : function(callback) {
                        callback([{
                            name : 'Armando'
                        }]);
                    }
                };
            },
            
            create : function(error, success) {

            },
            
            logout : function(error, success) {

            },
            
            login : function(email, password, goToHome, goToLogin) {
                goToHome({
                    name : 'Armando'
                });
            }
        
        };
    }
};
