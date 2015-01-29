var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect');

var env,
     coffeeSources,
     destJsDir,
      jsSources,
       jsDevDest,
       sassMainSource,
       sassFileSource,
       devCssDest,
       htmlSource,
       jasonSource, 
       outputDir, 
       sassStyle;

// command line NODE_ENV=production

 env = process.env.NODE_ENV || 'development';

 if(env === 'development'){
     outputDir = 'builds/development/';
     sassStyle = 'expanded';
 }else{
     outputDir = 'builds/production/';
     sassStyle = 'compressed';
 }



  coffeeSources = ['components/coffee/tagline.coffee'];
  destJsDir = 'components/scripts';

 jsSources = [
     'components/scripts/rclick.js',
     'components/scripts/pixgrid.js',
     'components/scripts/tagline.js',
     'components/scripts/template.js'
 ];

  jsDevDest = outputDir + 'js';

    sassMainSource = ['components/sass/style.scss'];
     sassFileSource = ['components/sass/*.scss'];
     devCssDest = outputDir + '/css';

 htmlSource = [outputDir + '*.html'];
 jasonSource = [outputDir + 'js/*.json'];


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
	 	images: outputDir + 'images',
	 	// require: ['susy'],
	 	style: sassStyle
	 })
	    .on('error', gutil.log))
	 .pipe(gulp.dest(devCssDest))
	 .pipe(connect.reload())

});

gulp.task('connect', function(){
	connect.server({
       root: outputDir + '',
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

