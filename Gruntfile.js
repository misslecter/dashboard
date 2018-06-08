module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            loose: "all"
                        }]
                    ]
                },
                files: {
                    "./assets/js/dist/app.js": ["./assets/js/app.js"]
                }
            }
        },
        watch: {
            css: {
                files: ['./assets/scss/*.scss', "./assets/scss/**/*.scss"],
                tasks: ['sass']
            },
            js: {
                files: ["./assets/js/*.js", "./assets/js/**/*.js"],
                tasks: ["browserify"]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    './assets/css/app.css': './assets/scss/app.scss'
                }
            }
        },
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("build", ["browserify"]);
};