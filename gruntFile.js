/*global module*/

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
	grunt.loadNpmTasks('grunt-html2js');

	/* ********************* Register required tasks******************* */
	grunt.registerTask('default',
			[ 'jshint', 'build', 'nodeunit']); //'karma:unit'
	
	grunt.registerTask('build', [ 'clean', 'html2js', 'concat', 'recess:build',
			'copy:assets' ]);
	
	grunt.registerTask('release', [ 'clean', 'html2js', 'uglify', 'jshint',
			'karma:unit', 'concat:index', 'recess:min', 'copy:assets' ]);
	
	grunt.registerTask('test-watch', [ 'karma:watch' ]);

	grunt.registerTask('timestamp', function() {
		grunt.log.subhead(Date());
	});

	var karmaConfig = function(configFile, customOptions) {
		var options = {
			configFile : configFile,
			keepalive : true
		};
		var travisOptions = process.env.TRAVIS && {
			browsers : [ 'Firefox' ],
			reporters : 'dots'
		};
		return grunt.util._.extend(options, customOptions, travisOptions);
	};

	/* ********************* Configure tasks ******************* */
	/*
	 * 1-nodeunit, 2-jshint, 3-clean,4-copy, 5-karma,6-html2js, 7-concat,
	 * 8-uglify, 9-watch, 10-recess
	 */
	grunt.initConfig({

				distdir : 'client/dist',

				pkg : grunt.file.readJSON('package.json'),

				nodeunit : [ 'server/test/**/*.js' ],

				src : {
					js : [ 'client/src/**/*.js' ],
					jsTpl : [ '<%= distdir %>/templates/**/*.js' ],
					specs : [ 'client/test/**/*.spec.js' ],
					scenarios : [ 'client/test/**/*.scenario.js' ],
					html : [ 'client/src/index.html' ],
					tpl : {
						app : [ 'client/src/app/**/*.tpl.html' ]
					},
					less : [ 'client/src/less/stylesheet.less' ], // recess:build
																	// doesn't
																	// accept **
																	// in its
																	// file
																	// patterns
					lessWatch : [ 'client/src/less/**/*.less' ]
				},

				jshint : {
					files : [ 'gruntFile.js', 'server/server.js',
							'server/src/**/*.js', 'server/test/**/*.js',
							'<%= src.js %>', '<%= src.jsTpl %>',
							'<%= src.specs %>', '<%= src.scenarios %>' ],
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
						smarttabs: true,
						globals : {
							require : false,
							__dirname : false,
							console : false,
							module : false,
							exports : false
						}
					}
				},

				clean : [ '<%= distdir %>/*' ],

				copy : {
					assets : {
						files : [ {
							dest : '<%= distdir %>',
							src : '**',
							expand : true,
							cwd : 'client/src/assets/'
						} ]
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

				html2js : {
					app : {
						options : {
							base : 'client/src/app'
						},
						src : [ '<%= src.tpl.app %>' ],
						dest : '<%= distdir %>/templates/app.js',
						module : 'templates.app'
					}
				},

				concat : {
					dist : {
						options : {
							banner : "<%= banner %>"
						},
						src : [ '<%= src.js %>', '<%= src.jsTpl %>' ],
						dest : '<%= distdir %>/<%= pkg.name %>.js'
					},
					index : {
						src : [ 'client/src/index.html' ],
						dest : '<%= distdir %>/index.html',
						options : {
							process : true
						}
					},
					bootstrap : {
						src : [ 'client/vendor/angular-ui/bootstrap/*.js' ],
						dest : '<%= distdir %>/bootstrap.js'
					},
					angular : {
						src : [ 'client/vendor/angular/angular.js',
								'client/vendor/angular/angular-route.js' ],
						dest : '<%= distdir %>/angular.js'
					},
					jquery : {
						src : [ 'client/vendor/jquery/*.js' ],
						dest : '<%= distdir %>/jquery.js'
					}
				},

				uglify : {
					dist : {
						options : {
							banner : "<%= banner %>"
						},
						src : [ '<%= src.js %>', '<%= src.jsTpl %>' ],
						dest : '<%= distdir %>/<%= pkg.name %>.js'
					},
					angular : {
						src : [ '<%= concat.angular.src %>' ],
						dest : '<%= distdir %>/angular.js'
					},
					jquery : {
						src : [ 'client/vendor/jquery/*.js' ],
						dest : '<%= distdir %>/jquery.js'
					}
				},

				recess : {
					build : {
						files : {
							'<%= distdir %>/<%= pkg.name %>.css' : [ '<%= src.less %>' ]
						},
						options : {
							compile : true
						}
					},
					min : {
						files : {
							'<%= distdir %>/<%= pkg.name %>.css' : [ '<%= src.less %>' ]
						},
						options : {
							compress : true
						}
					}
				},
				watch : {
					all : {
						files : ['gruntFile.js','<config:lint.files>', '<%= src.js %>', '<%= src.specs %>',
								'<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.html %>' ],
						tasks : [ 'default', 'timestamp']
					},
					build : {
						files : [ 'gruntFile.js','<config:lint.files>','<%= src.js %>', '<%= src.specs %>',
								'<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.html %>' ],
						tasks : [ 'build', 'timestamp']
					}
				}
			});

	grunt.registerTask('timestamp', function() {
		grunt.log.subhead(Date());
	});

	grunt.registerTask('startApp', function() {
		this.async();
		require('supervisor').run([ 'server/server.js']);
	});

};
