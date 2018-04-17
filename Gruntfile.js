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
                    "./dist/app.js": ["./src/js/app.js"]
                }
            }
        },
        watch: {
            css: {
                files: ['./src/scss/*.scss', "./src/js/**/*.js"],
                tasks: ['sass']
            },
            js: {
                files: ["./src/js/*.js", "./src/js/**/*.js"],
                tasks: ["browserify"]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    './dist/app.css': './src/scss/app.scss'
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