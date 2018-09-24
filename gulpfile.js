/**
 * Created by Дмитрий on 19.12.2017.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    browser = require('browser-sync');

var config ={
    paths:{
        scss:'src/scss/**/*.scss',
        css:'src/css/**/*.css',
        html:'src/**/*.html',
        js:'src/**/*.js'
    },
    output:{
        nameFileCss:'main.css',
        pathCss:'src/css'
    },
    srv_options:{
        basePath:'src'
    }
};
gulp.task('browser', function(){
    browser({
        server: {
            baseDir: config.srv_options.basePath
        },
        notify: false
    });
});


gulp.task('scss', function () {
    gulp.src(config.paths.scss)
        .pipe(sass())
        .pipe(concat(config.output.nameFileCss))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(config.output.pathCss))
        .pipe(browser.reload({stream: true}));
});



gulp.task('watch',['scss','browser'], function () {
    gulp.watch(config.paths.scss, ['scss'],browser.reload);
    gulp.watch(config.paths.html,browser.reload);
    gulp.watch(config.paths.js,browser.reload);
    gulp.watch(config.paths.css,browser.reload);
});

gulp.task('default',['watch']);


