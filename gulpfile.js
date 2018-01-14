var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');

var vendorCss = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/font-awesome/css/font-awesome.min.css'
];

var fonts = [
    'node_modules/font-awesome/fonts/fontawesome-webfont.woff2'
];

gulp.task('html', function (){
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
   return gulp.src('src/*/**.js')
       .pipe(gulp.dest('dist'));
});

gulp.task('vendorCss', function () {
    return gulp.src(vendorCss)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('fonts', function () {
    return gulp.src(fonts)
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('sass', function () {
    return gulp.src('src/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('img', function () {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function () {
   return gulp.src('dist')
       .pipe(clean());
});

gulp.task('webserver', function() {
   return gulp.src('dist')
       .pipe(webserver({
           livereload: true
       }));
});


gulp.task('build', gulp.series('clean', gulp.parallel('html', 'js', 'vendorCss', 'sass', 'fonts', 'img')));
gulp.task('run', gulp.series('build', 'webserver'));
gulp.watch('src/**/*', gulp.series('build'));

gulp.task('default', gulp.series('build'));

