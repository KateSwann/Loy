 module.exports = function(grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        babel: {
            options: {
              sourceMap: true
            },
            dist: {
              files: {
                'js/assets/script.js': ['js/develop/script.js']
              }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    index: 'index.html',
                    livereload: true
                }
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    'stylesheets/css/app.autoprefixer.css': 'stylesheets/css/app.css'
                },
                browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
            }
        },

        sass: {
            options: {
                loadPath: ['node_modules/foundation-sites/scss']
            },
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'nested'
                },
                files: [{
                    expand: true,
                    cwd: 'stylesheets/scss',
                    src: ['*.scss'],
                    dest: 'stylesheets/css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            html: {
                files: ["index.html"],
                tasks: ["default"],
                options: {
                  livereload: true
                }
            },

            grunt: { 
                files: ["Gruntfile.js"], 
                tasks: ["default"],
                options: {
                  livereload: true
                } 
            },

            sass: {
                files: ["stylesheets/scss/**/*.scss"],
                tasks: ["buildCss"],
                options: {
                  livereload: true
                }
            },
            
            script: {
                files: 'develop/js/**/*.js',
                tasks: ['buildJs'],
                options: {
                  livereload: true
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },

            script: {
                src: [
                    'node_modules/foundation-sites/dist/js/foundation.js',
                    'js/develop/script.js'
                ],
                dest: 'js/assets/script.js'
            },

            countup: {
                src: [
                    'js/develop/countup/angular.min.js',
                    'js/develop/countup/dest/angular-scroll-spy.min.js',
                    'js/develop/countup/dest/countUp.min.js',
                    'js/develop/countup/dest/angular-countUp.min.js'
                ],
                dest: 'js/assets/countup.min.js'
            },

            modernizr: {
                src: [
                    'node_modules/foundation-sites/vendor/modernizr/modernizr.js',
                    'js/develop/custom.modernizr.js'
                ],
                dest: 'js/assets/modernizr.js'
              }
            },

            sprite:{
              all: {
                src: 'images/icons/*.png',
                dest: 'images/icons/dest/spritesheet.png',
                imgPath: '../../images/icons/dest/spritesheet.png', // manually override default path to the sprite
                
                retinaSrcFilter: 'images/icons/*@2x.png',
                retinaDest: 'images/icons/dest/spritesheet@2x.png',
                retinaImgPath: '../../images/icons/dest/spritesheet@2x.png', // manually override default path to the retina sprite

                destCss: 'stylesheets/scss/partials/components/_sprites.scss',
                padding: 2
              }
            },


        // --------------------------------------
        // Uglify Configuration
        // --------------------------------------

        uglify: {
            dist: {
                files: {
                    'js/assets/jquery.min.js': ['node_modules/foundation-sites/vendor/jquery/dist/jquery.js'],
                    'js/assets/script.min.js': ['js/assets/script.js'],
                    'js/assets/modernizr.min.js': ['js/assets/modernizr.js']
                }
            },

            countup: {                
              files: {
                    'js/develop/countup/dest/angular-scroll-spy.min.js': ['js/develop/countup/angular-scroll-spy.js'],
                    'js/develop/countup/dest/countUp.min.js': ['js/develop/countup/countUp.js'],
                    'js/develop/countup/dest/angular-countUp.min.js': ['js/develop/countup/angular-countUp.js']
                }
            }
        }

    });

    // -----------------------------------------
    // Load Grunt tasks
    // -----------------------------------------

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-spritesmith');
    // grunt.loadNpmTasks('grunt-babel');


    // -----------------------------------------
    // Register Grunt tasks
    // -----------------------------------------

    grunt.registerTask('buildCss', ['sass', 'autoprefixer']);
    grunt.registerTask('buildJs', ['concat', 'uglify']);
    grunt.registerTask('default', ['buildCss', 'buildJs', 'watch']);
};