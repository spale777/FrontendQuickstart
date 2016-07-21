//-----------------------------------------
//  Dependencies
//-----------------------------------------

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cleanCss    = require('gulp-clean-css'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    imgMin      = require('gulp-imagemin'),
    rename      = require('gulp-rename'),
    watch       = require('gulp-watch'),
    plumber     = require('gulp-plumber');


//-----------------------------------------
//  Settings
//-----------------------------------------

var src = {
    js: './src/js/**/*.js',
    sass: './src/sass/**/*.scss',
    img: './src/img/*'
}

var dist = {
    js: './dist/js/',
    css: './dist/css/',
    img: './dist/img/',
    jsName: 'app.min.js',
    cssName: 'app.min.css'
}

var vendor = {
    // Vendor dependencies
}

//-----------------------------------------
//  Sass
//-----------------------------------------

gulp.task('sass', function(){
    return gulp.src(src.sass)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(concat(dist.cssName))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist.css));
});


//-----------------------------------------
//  JS
//-----------------------------------------

gulp.task('js', function(){
    return gulp.src(src.js)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat(dist.jsName))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist.js))
});


//-----------------------------------------
//  IMG
//-----------------------------------------

gulp.task('img', function(){
    return gulp.src(src.img)
        .pipe(imgMin())
        .pipe(gulp.dest(dist.img))
});


//-----------------------------------------
//  Watch
//-----------------------------------------

gulp.task('watch', function(){
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.js, ['js']);
    gulp.watch(src.img, ['img']);
});


//-----------------------------------------
//  Default
//-----------------------------------------

gulp.task('default', ['sass', 'js', 'img', 'watch'])
