/**
 * Created by Дмитрий on 19.12.2017.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browser = require('browser-sync'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    clean = require('gulp-dest-clean');

var config ={
    paths:{
        scss:'src/scss/**/*.scss',
        css:'src/css/**/*.css',
        html:'src/*.html',
        js:'src/**/*.js'
    },
    output:{
        nameFileCss:'main.css',
        pathCss:'src/css',
        pathDistCss:'dist/css',
        pathDistHtml:'dist'
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
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat(config.output.nameFileCss))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.pathCss))
        .pipe(browser.reload({stream: true}));
});

gulp.task('minify-css', function() {
    return gulp.src(config.paths.css)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(config.output.pathDistCss));
});

gulp.task('minify-html', function()  {
    return gulp.src(config.paths.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(config.output.pathDistHtml));
});

gulp.task('clean', function () {

    return gulp.src('dist')
        .pipe(clean('dist'));
});



gulp.task('watch',['scss','browser'], function () {
    gulp.watch(config.paths.scss, ['scss'],browser.reload);
    gulp.watch(config.paths.html,browser.reload);
    gulp.watch(config.paths.js,browser.reload);
    gulp.watch(config.paths.css,browser.reload);
});

gulp.task('build', ['clean', 'scss'], function() {

    var buildCss = gulp.src(config.paths.css)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(config.output.pathDistCss))

    var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

    // Переносим скрипты в продакшен
    var buildJs = gulp.src('src/js/**/*')
        .pipe(gulp.dest('dist/js'))
    var buildLibsJs = gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'))

    var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'))
    var buildImages = gulp.src('src/images/**/*') // Переносим изображения в продакшен
        .pipe(gulp.dest('dist/images'));

});

gulp.task('default',['watch']);


