var mockServices = {
    
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
                callback([{
                    name : 'Mock User'
                }]);
            }
        };
    }
};
