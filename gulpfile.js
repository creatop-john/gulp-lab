var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var rename = require("gulp-rename");
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var folders = require('gulp-folders');
var pathToFolder = 'src/javascripts';
var replace = require('gulp-string-replace');
var path = require('path');
var htmlreplace = require('gulp-html-replace');
var minifyHTML = require('gulp-minify-html');
var htmlbeautify = require('gulp-html-beautify');
var image = require('gulp-image');


gulp.task('default', ['clean'], function() {
    gulp.start('scripts', 'styles', 'imagesmin');
});



// 將css壓縮並更名
gulp.task('styles', function() {
    return gulp.src('src/css/*.css')
        .pipe(replace('/images/', '/img/'))
        .pipe(uglifycss())
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest('assets/css'));
});

// 將js壓縮並更名
gulp.task('js-folder-min', folders(pathToFolder, function(folder) {
    return gulp.src(path.join(pathToFolder, folder, '*.js'))
        .pipe(concat(folder + '.js'))
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('assets/js'));
}));


gulp.task('imagemin', function() {
    gulp.src('src/images/**/*')
        .pipe(image({
            pngquant: true,
            optipng: true,
            zopflipng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: false,
            concurrent: 10
        }))
        .pipe(gulp.dest('assets/img'));
});


gulp.task('clean', function() {
    return del(['assets/css', 'assets/js', 'assets/img']);
});

// 置換共用css與js區塊
gulp.task('html-replace', function() {
    var opts = { comments: true, spare: true, quotes: true };
    var jspath = "../assets/js/";
    return gulp.src('html/**/*.html')
        .pipe(replace('/src/', '/assets/'))
        .pipe(replace('"src/', '"assets/'))
        .pipe(replace('/images/', '/img/'))
        .pipe(replace('/javascripts/', '/js/'))
        .pipe(replace('.css"', '.min.css"'))
        /* 取代額外新增的css與js路徑問題 
           ex. slick/slick.js => slick.min.js
           ex. photoswipe/photoswipe.css => photoswipe.min.css
        */
        .pipe(htmlreplace({
            'css': '../assets/css/style.min.css',
            'js': '../assets/js/main.min.js'
        }))
        .pipe(minifyHTML(opts))
        .pipe(htmlbeautify({ indentSize: 4 }))
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['html-replace', 'styles', 'js-folder-min', 'imagemin']);
