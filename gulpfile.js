var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat');

 var coffeeSources = ['components/coffee/tagline.coffee'],
     destJsDir = 'components/scripts';

 var jsSources = [
     'components/scripts/rclick.js',
     'components/scripts/pixgrid.js',
     'components/scripts/tagline.js',
     'components/scripts/template.js'
 ];

 var jsDevDest = 'builds/development/js';


gulp.task('log', function(){

     gutil.log('Workflows work very well');
});

gulp.task('coffee', function(){
	gulp.src(coffeeSources)
	.pipe(coffee({bare: true})
		.on('error', gutil.log))
	.pipe(gulp.dest(destJsDir))
});

gulp.task('js', function(){
	gulp.src(jsSources)
	    .pipe(concat('script.js'))
	    .pipe(gulp.dest(jsDevDest))

    
});