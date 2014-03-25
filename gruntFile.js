/* global module */

module.exports = function(grunt) {
    
    /* ********************* Load required tasks******************* */
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks("grunt-supervisor");
    // in
    // use
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-env');
    
    /*
                 * ********************* Register required
                 * tasks*******************
                 */
    grunt.registerTask('default', ['build', 'release']);
    grunt.registerTask('build', ['clean', 'uglify', 'concat', 'recess:build', 'copy', 'jshint', 'nodeunit']);
    grunt.registerTask('refresh', ['clean', 'concat', 'recess:build', 'copy', 'jshint']);
    grunt.registerTask('release', ['clean', 'uglify', 'concat', 'jshint', 'karma:unit', 'concat:index',
        'recess:min', 'copy']);
    
    grunt.registerTask('test-watch', ['karma:watch']);
    grunt.registerTask('start', ['supervisor']);
    
    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });
    
    var karmaConfig = function(configFile, customOptions) {
        var options = {
            configFile : configFile,
            keepalive : true
        };
        var travisOptions = process.env.TRAVIS && {
            browsers : ['Firefox'],
            reporters : 'dots'
        };
        return grunt.util._.extend(options, customOptions, travisOptions);
    };
    
    /* ********************* Configure tasks ******************* */
    grunt.initConfig({
        distdir : 'client/dist',
        
        pkg : grunt.file.readJSON('package.json'),
        
        nodeunit : {
            all : ['server/test/**/*.js'],
            options : {
                reporter : 'junit',
                reporterOptions : {
                    output : 'test-results'
                }
            }
        },
        src : {
            js : ['client/src/**/*.js'],
            jsTpl : ['<%= distdir %>/templates/**/*.js'],
            specs : ['client/test/**/*.spec.js'],
            scenarios : ['client/test/**/*.scenario.js'],
            html : ['client/src/index.html'],
            templates : ['client/src/app/templates/*.html'],
            less : ['client/src/less/stylesheet.less'],
            lessWatch : ['client/src/less/**/*.less']
        },
        
        jshint : {
            files : ['gruntFile.js', 'server/server.js', 'server/src/**/*.js', 'server/test/**/*.js',
                '<%= src.js %>', '<%= src.jsTpl %>', '<%= src.specs %>', '<%= src.scenarios %>'],
            options : {
                curly : true,
                eqeqeq : true,
                immed : true,
                latedef : true,
                newcap : true,
                noarg : true,
                sub : true,
                undef : false,
                boss : true,
                eqnull : true,
                smarttabs : true,
                globals : {
                    require : false,
                    __dirname : false,
                    console : false,
                    module : false,
                    exports : false
                }
            }
        },
        supervisor : {
            target : {
                script : "server/server.js",
                options : {
                    args : ["dev"],
                    watch : ['server', 'server/src'],
                    ignore : ["server/test"],
                    pollInterval : 500,
                    extensions : ["js"],
                    exec : "node",
                    debug : false,
                    debugBrk : false,
                    harmony : false,
                    noRestartOn : "exit",
                    forceWatch : true,
                    quiet : true
                }
            }
        },
        clean : {
            dist : {
                src : ['<%= distdir %>/*']
            },
            testcov : {
                src : ['test-cov']
            },
            testresults : {
                src : ['test-results']
            }
        },
        copy : {
            assets : {
                files : [{
                    dest : '<%= distdir %>/resources',
                    src : '**',
                    expand : true,
                    cwd : 'client/src/assets'
                }]
            },
            templates : {
                files : [{
                    dest : '<%= distdir %>/templates',
                    src : '**',
                    expand : true,
                    cwd : 'client/src/app/templates'
                }]
            }
        },
        
        karma : {
            unit : {
                options : karmaConfig('client/test/config/unit.js')
            },
            watch : {
                options : karmaConfig('client/test/config/unit.js', {
                    singleRun : false,
                    autoWatch : true
                })
            }
        },
        concat : {
            dist : {
                options : {
                    banner : "<%= banner %>"
                },
                src : ['<%= src.js %>', '<%= src.jsTpl %>'],
                dest : '<%= distdir %>/resources/js/<%= pkg.name %>.js'
            },
            index : {
                src : ['client/src/index.html'],
                dest : '<%= distdir %>/index.html',
                options : {
                    process : true
                }
            },
            bootstrap : {
                src : ['client/vendor/bootstrap-js/*.js'],
                dest : '<%= distdir %>/resources/js/bootstrap.js'
            },
            angular : {
                src : ['client/vendor/angular/angular.js', 'client/vendor/angular/angular-route.js'],
                dest : '<%= distdir %>/resources/js/angular.js'
            },
            jquery : {
                src : ['client/vendor/jquery/*.js'],
                dest : '<%= distdir %>/resources/js/jquery.js'
            }
        },
        
        uglify : {
            dist : {
                options : {
                    banner : "<%= banner %>"
                },
                src : ['<%= src.js %>', '<%= src.jsTpl %>'],
                dest : '<%= distdir %>/resources/js/<%= pkg.name %>.js'
            },
            angular : {
                src : ['<%= concat.angular.src %>'],
                dest : '<%= distdir %>/resources/js/angular.js'
            },
            jquery : {
                src : ['client/vendor/jquery/*.js'],
                dest : '<%= distdir %>/resources/js/jquery.js'
            }
        },
        recess : {
            build : {
                files : {
                    '<%= distdir %>/resources/css/<%= pkg.name %>.css' : ['<%= src.less %>']
                },
                options : {
                    compile : true
                }
            },
            min : {
                files : {
                    '<%= distdir %>/resources/css/<%= pkg.name %>.css' : ['<%= src.less %>']
                },
                options : {
                    compress : true
                }
            }
        },
        watch : {
            all : {
                files : ['gruntFile.js', '<config:lint.files>', '<%= src.js %>', '<%= src.specs %>',
                    '<%= src.lessWatch %>', '<%= src.templates %>', '<%= src.html %>'],
                tasks : ['refresh', 'timestamp']
            }
        },
        coveralls : {
            options : {
                force : true
            },
            server : {
                src : 'test-results/lcov.info'
            },
            client : {
                src : 'client-coverage/test/lcov.info'
            }
        },
    });
};