var browserSync = require('browser-sync').create();
var gulp 	= require("gulp");
var clean 	= require('gulp-clean');
var concat 	= require('gulp-concat');
var nodemon 	= require('gulp-nodemon');
var minifyCss 	= require('gulp-minify-css');
var rename 	= require("gulp-rename");
var uglify 	= require('gulp-uglify-es').default;

var baseDirs 	  = { app : './App/', dist: './App/dist/' }
var startupScript = baseDirs.app+'server.js';

gulp.task('group', function () {
	return gulp.src([
		baseDirs.app+'/main/js/app.js',
		baseDirs.app+'/main/factory/Fletcher.js',
		baseDirs.app+'/main/component/Intervention/InterCtrl.js',
		baseDirs.app+'/main/component/Materiel/MaterielCtrl.js',
		baseDirs.app+'/main/component/Menu/NavCtrl.js'
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
