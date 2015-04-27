"use strict";


var fs = require("fs");
var path = require("path");
var mkdir = require("mkdir-p");
var browserify = require("browserify");
var reactify = require("reactify");
var html = require("html");

var gulp = require("gulp");
var cfg = require("./gulp.config");
var eslint = require("gulp-eslint");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

var buffer = require("vinyl-buffer");
var source = require("vinyl-source-stream");


gulp.task('script:lint', function () {
	// Note: To have the process exit with an error code (1) on
	//  lint error, return the stream and pipe to failOnError last.
	return gulp.src(cfg.srcFiles)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task("script:build", ["script:lint"], function () {
	var b = browserify({
		entries: cfg.srcMainEntry,
		debug: true,
		standalone: "glo",
		transform: [reactify]
	});

	return b.bundle()
		.pipe(source("main.js"))
		.pipe(buffer())
		.pipe(gulp.dest(cfg.dist))
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest(cfg.dist));
});

gulp.task("html:render", ["script:build"], function (done) {
	var markup = require("./dist/main").render();
	markup = html.prettyPrint(markup, { indent_size: 2 });
	fs.writeFile(cfg.dist + "email.html", markup, {
		encoding: "utf8"
	}, done);
});

