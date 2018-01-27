let gulp = require('gulp');
let sass = require('gulp-sass');
let clean = require('gulp-clean');
let webserver = require('gulp-webserver');
let concat = require('gulp-concat');
let nunjucksRender = require('gulp-nunjucks-render');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');

let vendorCss = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/font-awesome/css/font-awesome.min.css'
];

let vendorJS = [
  'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'
];

let fonts = [
    'node_modules/font-awesome/fonts/fontawesome-webfont.woff2'
];

gulp.task('html', () => {
    return gulp.src('src/pages/**/*.html')
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('js', () => {
   return gulp.src('src/*/**.js')
       // .pipe(babel({
       //     presets: ['@babel/preset-env'],
       //     plugins: ['@babel/transform-runtime', "@babel/transform-async-to-generator"]
       // }))
       .pipe(gulp.dest('dist'));
});

gulp.task('cname', () => {
   return gulp.src('CNAME').pipe(gulp.dest('dist'));
});

gulp.task('vendorCss', () => {
    return gulp.src(vendorCss)
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('vendorJs', () => {
    return gulp.src(vendorJS)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', () => {
    return gulp.src(fonts)
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('sass', () => {
    return gulp.src('src/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({basename: 'style.min'}))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('img', () => {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('robots', () => {
    return gulp.src('robots.txt')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
   return gulp.src('dist')
       .pipe(clean());
});

gulp.task('webserver', () => {
   return gulp.src('dist')
       .pipe(webserver({
           livereload: true
       }));
});

gulp.task('build', gulp.series('clean', gulp.parallel('html', 'js', 'vendorCss', 'vendorJs', 'sass', 'fonts', 'img', 'robots', 'cname')));
gulp.task('run', gulp.series('build', 'webserver'));
gulp.watch('src/**/*.*', gulp.series('build'));

gulp.task('default', gulp.series('build'));

