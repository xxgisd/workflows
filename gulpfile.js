var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect');

 var coffeeSources = ['components/coffee/tagline.coffee'],
     destJsDir = 'components/scripts';

 var jsSources = [
     'components/scripts/rclick.js',
     'components/scripts/pixgrid.js',
     'components/scripts/tagline.js',
     'components/scripts/template.js'
 ];

 var jsDevDest = 'builds/development/js';

 var sassMainSource = ['components/sass/style.scss'],
     sassFileSource = ['components/sass/*.scss'],
     devCssDest = 'builds/development/css';

var htmlSource = ['builds/development/*.html'];
var jasonSource = ['builds/development/js/*.json'];


gulp.task('log', function(){

     gutil.log('Workflows work very well');
});

gulp.task('coffee', function(){
	gulp.src(coffeeSources)
	.pipe(coffee({bare: true})
		.on('error', gutil.log))
	.pipe(gulp.dest(destJsDir))
});

gulp.task('js',  function(){
	gulp.src(jsSources)
	    .pipe(concat('script.js'))
	    .pipe(browserify())
	    .pipe(gulp.dest(jsDevDest))
	    .pipe(connect.reload())

 });

gulp.task('compass', function(){
	gulp.src(sassMainSource)
	 .pipe(compass({
	 	sass: 'components/sass',
	 	css:  devCssDest,
	 	images: 'builds/development/images',
	 	// require: ['susy'],
	 	style: 'expanded'
	 })
	    .on('error', gutil.log))
	 .pipe(gulp.dest(devCssDest))
	 .pipe(connect.reload())

});

gulp.task('connect', function(){
	connect.server({
       root: 'builds/development/',
       livereload: true
	});

});

gulp.task('html', function(){
     gulp.src(htmlSource)
     .pipe(connect.reload())
});

gulp.task('json', function(){
     gulp.src(jasonSource)
     .pipe(connect.reload())
});

gulp.task('watch', function(){
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassFileSource, ['compass']);
    gulp.watch(htmlSource, ['html']);
     gulp.watch(jasonSource, ['json']);
});
gulp.task('default', ['coffee', 'js', 'compass', 'html', 'json', 'connect', 'watch']);

