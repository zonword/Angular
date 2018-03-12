var browserSync = require('browser-sync').create();
var gulp 	= require("gulp");
var clean 	= require('gulp-clean');
var concat 	= require('gulp-concat');
var nodemon 	= require('gulp-nodemon');
var minifyCss 	= require('gulp-minify-css');
var rename 	= require("gulp-rename");
var uglify 	= require('gulp-uglify-es').default;

var baseDirs 	  = { app : './main/', dist: './main/dist/' }
var startupScript = baseDirs.app+'server.js';

gulp.task('group', function () {
	return gulp.src([
		baseDirs.app+'js/App.js',
		baseDirs.app+'factory/MainFactory.js',
		baseDirs.app+'vue/page1/list/Page1ListCtrl.js'
	])
		.pipe(concat('All.js'))
		.pipe(gulp.dest(baseDirs.dist));
});
gulp.task('mingroup', function() {
	return gulp.src(baseDirs.dist+'All.js')
		.pipe(uglify())
		.pipe(rename('All.min.js'))
		.pipe(gulp.dest(baseDirs.dist+'min/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('all', ['group', 'mingroup']);
