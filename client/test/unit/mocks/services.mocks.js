var mockServices = {
    
    mockTagsServices : function() {
        return {
            getTags : function(term) {
                return {
                    then : function(callback) {
                        callback([{
                            name : 'Mock Tag'
                        }]);
                    }
                };
            },
            getTagByName : function(name) {
                return {
                    then : function(callback) {
                        callback({
                            name : 'MyTag'
                        });
                    }
                };
            },
            createTag : function(tagName) {
                return {
                    then : function(callback) {
                        callback({
                            _id : '191',
                            name : tagName
                        });
                    }
                };
            }
        };
    },
    
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
            getUserProcesses : function() {
                return {
                    then : function(callback) {
                        callback([{
                            name : 'Mock Process'
                        }]);
                    }
                };
            },
            getLocations : function(term) {
                return {
                    then : function(callback) {
                        callback([{
                            formatted_address : 'Mock Location'
                        }]);
                    }
                };
            }
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
