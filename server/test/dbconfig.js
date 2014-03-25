var path = require('path');
var mongoose = require('mongoose');

ObjectId = mongoose.Schema.ObjectId;

module.exports = {
    port : 27027,
    mocks : {
        fakedb : {
            geodecisions_users : [{
                _id : '1',
                name : 'Forrest',
                lastname : 'Gump',
                email : 'forrest@geodecisions.com'
            }, {
                _id : '2',
                name : 'Armando',
                lastname : 'Jaleo',
                email : 'armando@geodecisions.com'
            }, {
                _id : '3',
                name : 'Kevin',
                lastname : 'Stuart',
                email : 'stuart@geodecisions.com'
            }],
            geodecisions_tags : [{
                _id : '1',
                name : 'Cars'
            }, {
                _id : '2',
                name : 'Houses'
            }, {
                _id : '3',
                name : 'Banks'
            }, {
                _id : '4',
                name : 'Holidays'
            }],
            geodecisions_factors : [{
                _id : '13',
                name : 'Demography',
                description : 'Demography decision factor',
                layer : 'MADRID_PUBLIC_GIS_LAYER_CODE',
                scope : 'Local'
            }, {
                _id : '14',
                name : 'Demography',
                description : 'Demography decision factor',
                layer : 'MADRID_PUBLIC_GIS_LAYER_CODE',
                scope : 'Local'
            }, {
                _id : '23',
                name : 'Unemployment',
                description : 'Unemployment decision factor',
                layer : 'INEM_GIS_SYSTEM',
                scope : 'National'
            }],
            geodecisions_processes : [{
                _id : '1',
                name : 'New Business',
                description : 'New Business',
                user : '1',
                factors : ['13', '14'],
                tags : ['1', '2']
            }]
        }
    },
    
    fork : false,
    log : {
        log4js : {
            appenders : [{
                type : 'console',
                category : path.basename(__filename)
            }]
        },
        category : path.basename(__filename),
        level : 'INFO'
    }
};
