var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

var vendorCss = [
  'node_modules/bootstrap/dist/css/bootstrap.css',
  'node_modules/font-awesome/css/font-awesome.min.css'
];

var vendorJS = [
  'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'
];

var fonts = [
    'node_modules/font-awesome/fonts/fontawesome-webfont.woff2'
];

gulp.task('html', function (){
    // Gets .html and .nunjucks files in pages
    return gulp.src('src/pages/**/*.html')
    // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        // output files in app folder
        .pipe(gulp.dest('dist'))
});

gulp.task('js', function () {
   return gulp.src('src/*/**.js')
       // .pipe(babel({presets: ['env'], plugins: ["transform-async-to-generator"]}))
       // .pipe(uglify())
       // .pipe(concat('index.min.js'))
       .pipe(gulp.dest('dist'));
});

gulp.task('vendorCss', function () {
    return gulp.src(vendorCss)
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('vendorJs', function() {
    return gulp.src(vendorJS)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/js'));
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


gulp.task('build', gulp.series('clean', gulp.parallel('html', 'js', 'vendorCss', 'vendorJs', 'sass', 'fonts', 'img')));
gulp.task('run', gulp.series('build', 'webserver'));
gulp.watch('src/**/*.*', gulp.series('build'));

gulp.task('default', gulp.series('build'));

