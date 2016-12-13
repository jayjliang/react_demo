var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var browserify = require('browserify');
var reactify = require('reactify');
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require("watchify");
var babel = require("babelify");
var _ = require("lodash");
var browserSync = require('browser-sync').create();

var paths = {
	js: ['./dev/js/index.jsx', './dev/js/**/*.jsx', './dev/js/*.jsx'],
	build_js: ['./dev/js/build/app.js']
};

function js(watch) {
	var boption = {
		entries: "./dev/js/index.jsx",
		extensions: ['.jsx'],
		debug: true
	};
	var opts = _.assign({}, watchify.args, boption);
	var _bundle = watch ? watchify(browserify(opts)) : browserify(opts);
	_bundle = _bundle.transform(babel, {
		presets: ["es2015", "react"]
	});
	// _bundle = _bundle.transform(reactify);

	var build = function() {
		return _bundle.bundle()
			.on("error", function(err) {
				console.log(err);
			})
			.pipe(source("bundle.js"))
			.pipe(gulp.dest("./dev/js/"));
	}
	if(watch) {
		_bundle.on("update", build);
	}
	return build;
};

gulp.task("build", js(false));

gulp.task("watch_js", js(true));


// start the server
// - - - - - - - - - - - - - - -

gulp.task('server',['build'],function(){
    gulp.src('./dev')
        .pipe($.webserver({
            port: 3000,
            host: 'localhost',
            fallvack: './dev/index.html',
            livereload: true,
            open: true
        }));
});

gulp.task("reload", function() {
	browserSync.init({
		files: [
			"./dev/js/bundle.js"
		],
		// logLevel: "debug",
		logPrefix: "reload",
		ghostMode: {
			clicks: true,
			forms: true,
			scroll: true
		},
		proxy: "localhost:8080",
		port: 3000
	});
});

gulp.task('default', ['build', 'server'], function() {
	gulp.watch(paths.js,['build']);
	// gulp.watch(paths.build_js).on('change', browserSync.reload);
});