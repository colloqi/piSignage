module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssUrlEmbed: {
            encode: {
                src: [
                    'public/app/css/bootstrap.min.css',
                    'public/app/css/font-awesome.css',
                    'public/app/css/custom.css'
                ],
                dest: 'public/app/css/combined.css'
            }
        },
        ngtemplates: {
            piathome: {
                cwd: 'public',
                src: [
                    'app/partials/**/*.html',
                    'app/templates/**/*.html'
                ],
                dest: 'public/app.templates.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes:      true,
                        collapseWhitespace:             true,
                        removeAttributeQuotes:          true,
                        removeComments:                 true, // Only if you don't use comment directives!
                        removeEmptyAttributes:          true,
                        removeRedundantAttributes:      true,
                        removeScriptTypeAttributes:     true,
                        removeStyleLinkTypeAttributes:  true
                    }
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                        'public/app/js/piConfig.js',
                        'public/app/js/controllers/piathome.js',
                        'public/app/js/services/pi.js',
                        'public/app/js/directives/pi.js',
                        'public/app/js/filters/pi.js',
                        'public/app/js/services/cordovaServices.js',
                        'public/app/js/services/imsMobileDoctor.js',
                        'public/app/js/appMobile.js',
                        '<%= ngtemplates.piathome.dest %>'
                      ],
                dest: 'public/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand:true,cwd:'public',src: ['<%= pkg.name %>.min.js','index.html'], dest: 'phonegap/'},
                    {expand:true,cwd:'public',src: ['app/css/combined.css'], dest: 'phonegap/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-css-url-embed');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['cssUrlEmbed','ngtemplates','concat', 'uglify','copy']);

};