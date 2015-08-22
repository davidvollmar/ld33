var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

function compile(watch) {
	// browsifying our code
	var bundler = browserify('./src/main.js', {debug: true}).transform(babel);

	function rebundle() {
		console.log('-> bundling...');
		
		bundler.bundle()
			.on('error', function (err) {
				console.error(err);
				this.emit('end');
			})
			.pipe(source('build.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./public/build'));
		
		console.log('done');
	}

	if (watch) {
		bundler = watchify(bundler);
		bundler.on('update', function () {
			rebundle();
		});
	}

	rebundle();
}

gulp.task('build', function () {
	return compile(false);
});

gulp.task('watch', function () {
	return compile(true);
});

gulp.task('heroku:production', function(){
  runSeq('build')
});

gulp.task('default', ['build']);
