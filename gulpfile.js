var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee');

 var coffeeSources = ['components/coffee/tagline.coffee'],
     destJsDir = 'components/scripts';


gulp.task('log', function(){

     gutil.log('Workflows work very well');
});

gulp.task('coffee', function(){
	gulp.src(coffeeSources)
	.pipe(coffee({bare: true})
		.on('error', gutil.log))
	.pipe(gulp.dest(destJsDir));
});