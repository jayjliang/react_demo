var gulp = require('gulp');

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
	js: ['./dev/js/app.jsx', './dev/js/src/**/*.jsx'],
	build_js: ['./dev/js/build/app.js']
};

function js(watch) {
	var boption = {
		entries: "./dev/js/app.jsx",
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
			.pipe(source("app.js"))
			.pipe(gulp.dest("./dev/js/build/"));
	}
	_bundle.on("update", build);
	return build;
};

gulp.task("build", js(false));

gulp.task("watch_js", js(true));

gulp.task("reload", function() {
	browserSync.init({
		files: [
			"./dev/js/build/app.js"
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

gulp.task('default', ['build', 'reload', 'watch_js'], function() {
	// gulp.watch(paths.js,['js']);
	// gulp.watch(paths.build_js).on('change', browserSync.reload);
});