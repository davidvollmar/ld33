var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var server = require('gulp-server-livereload');

function compile (watch) {
	// browsifying our code
	var bundler = browserify('./src/main.js', {debug: true}).transform(babel, {stage: 0});

	function rebundle () {
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

		var time = new Date();
		console.log('done ' + time.toTimeString());
	}

	if (watch) {
		bundler = watchify(bundler);
		bundler.on('update', function () {
			rebundle();
		});
	}

	gulp.src('./index.html')
		.pipe(gulp.dest('./public/'));

	rebundle();
}

gulp.task('build', function () {
	return compile(false);
});

gulp.task('watch', function () {
	return compile(true);
});

gulp.task('webserver', function () {
	gulp.src('public')
		.pipe(server({
			open: true,
			port: process.env.PORT || 8000,
			livereload: {
				enable: true,
				port: process.env.PORT + 1 || 8001
			}
		}));
});

gulp.task('heroku:production', function () {
	runSeq('build')
});

gulp.task('dev', ['watch', 'webserver']);

gulp.task('default', ['build']);
