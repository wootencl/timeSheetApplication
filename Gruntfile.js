'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.loadNpmTasks('grunt-express-server');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: 'app',
		dist: 'dist',

		express: {
			dev: {
				options: {
					script: '<%= app %>/server.js'
				}
			},
			prod: {
				options: {
					script: '<%= dist %>/server.js',
					node_env: 'production'
				}
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded', // expanded or nested or compact or compressed
					loadPath: '<%= app %>/bower_components/foundation/scss',
					compass: true,
					quiet: true
				},
				files: {
					'<%= app %>/public/css/app.css': '<%= app %>/scss/app.scss'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= app %>/js/**/*.js'
			]
		},

		clean: {
			dist: {
				src: ['<%= dist %>/*']
			},
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['server.js', 'serverObjects/**', 'serverConfig/**' ,'**/*.html', '!**/*.scss', '!bower_components/**'],
					dest: '<%= dist %>/'
				}, {
					expand: true,
					flatten: true,
					src: ['<%= app %>/bower_components/font-awesome/fonts/**'],
					dest: '<%= dist %>/public/fonts/',
					filter: 'isFile'
				}, {
					cwd: '.',
					src: ['package.json'],
					dest: '<%= dist %>/'
				}, {
					expand: true,
					flatten: true,
					src: ['<%= app %>/bower_components/font-awesome/css/font-awesome.min.css', '<%= app %>/bower_components/jt.timepicker/jquery.timepicker.css'],
					dest: '<%= dist %>/public/css/',
				}]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= app %>/public/images/',
					src: ['**/*.{jpg,gif,svg,jpeg,png,ico}'],
					dest: '<%= dist %>/public/images/'
				}]
			}
		},

		uglify: {
			options: {
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%= app %>/index.html'],
			options: {
				dest: '<%= dist %>/public'
			}
		},

		usemin: {
			html: ['<%= dist %>/**/*.html'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

		watch: {
			options: {
				livereload: true
			},
			express: {
				files: [ '<%= app %>/server.js', '<%= app %>/serverConfig/*.js', '<%= app %>/serverObjects/*.js'],
				tasks: ['express:dev'],
				options: {
					spawn: false
				}
			},
			scripts: {
				files: ['<%= app %>/templates/*.tpl', '<%= app %>/public/js/**/*.js'],
				tasks: ['jst', 'includeSource']
			},
			sass: {
				files: '<%= app %>/scss/**/*.scss',
				tasks: ['sass']
			},
			html: {
				files: '<%= app %>/index.html'
			}
		},

		wiredep: {
			target: {
				src: [
					'<%= app %>/**/*.html'
				],
				exclude: [
					'modernizr',
					'font-awesome',
					'jquery-placeholder',
					'foundation'
				]
			}
		},

		jst: {
			compile: {
				options: {
					prettify: false,
					processName: function(filename) {
						//Shortens the file path for the template.
						return filename.slice(filename.indexOf('templates'), filename.length);
					}
				},
				files: {
					'app/client-app/views/templates.js': ['app/templates/**/*.tpl']
				}
			}
		},

		includeSource: {
			options: {
				ordering: 'top-down',
				basePath: 'app/public',
				baseUrl: '',
				templates: {
					html: {
						js: '<script src="{filePath}"></script>',
						css: '<link rel="stylesheet" type="text/css" href="{filePath}" />'
					}
				}
			},
			myTarget: {
				files: {
					'app/index.html' : 'app/index.html'
				}
			}
		}
	});

	//Default Tasks (Included with zf5)
	grunt.registerTask('compile-sass', ['sass']);
	grunt.registerTask('bower-install', ['wiredep']);
	grunt.registerTask('include-source', ['includeSource']);

	grunt.registerTask('server', ['express:dev', 'watch']);
	grunt.registerTask('publish', ['compile-sass', 'clean:dist', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);

};
