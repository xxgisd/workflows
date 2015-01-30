var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonMinify = require('gulp-jsonminify');

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
       sassStyle,
       jsCompressed;

// command line NODE_ENV=production

 env = process.env.NODE_ENV || 'development';

 if(env === 'development'){
     outputDir = 'builds/development/';
     sassStyle = 'expanded';
     jsCompressed = false;
 }else{
     outputDir = 'builds/production/';
     sassStyle = 'compressed';
     jsCompressed = true;
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
	    .pipe(gulpif(env === 'production', uglify()))
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
     gulp.src('builds/development/*.html')
     .pipe(gulpif(env === 'production', minifyHTML()))
     .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
     .pipe(connect.reload())
});

gulp.task('json', function(){
     gulp.src('builds/development/js/*.json')
     .pipe(gulpif(env === 'production', jsonMinify()))
     .pipe(gulpif(env === 'production', gulp.dest('builds/production/js/')))
     .pipe(connect.reload())
});

gulp.task('watch', function(){
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassFileSource, ['compass']);
    gulp.watch('builds/development/*.html', ['html']);
     gulp.watch('builds/development/js/*.json', ['json']);
});
gulp.task('default', ['coffee', 'js', 'compass', 'html', 'json', 'connect', 'watch']);

