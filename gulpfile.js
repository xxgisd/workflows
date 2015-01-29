var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass');

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

 });

gulp.task('css', function(){
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

});
gulp.task('default', ['coffee', 'js', 'css']);
