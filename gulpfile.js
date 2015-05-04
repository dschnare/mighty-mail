"use strict";


var fs = require("fs");
var path = require("path");
var mkdir = require("mkdir-p");
var html = require("html");

var gulp = require("gulp");
var cfg = require("./gulp.config");
var eslint = require("gulp-eslint");


gulp.task('script:lint', function () {
	// Note: To have the process exit with an error code (1) on
	//  lint error, return the stream and pipe to failOnError last.
	return gulp.src(cfg.srcFiles.concat(cfg.testFiles))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task("script:build", ["script:lint"], function () {
	return gulp.src(cfg.srcFiles, { base: "src" })
		.pipe(react())
		.pipe(gulp.dest(cfg.dest));
});

gulp.task("test:build", ["script:build"], function () {
	return gulp.src(cfg.testFiles, { base: "./test/src" })
		.pipe(react({ harmony: true }))
		.pipe(gulp.dest(cfg.testDest));
});

gulp.task("test", ["test:build"], function (done) {
	var markup = require("./test/build").render();
	markup = html.prettyPrint(markup, { indent_size: 2 });
	fs.writeFile(cfg.testDest + "/index.html", markup, {
		encoding: "utf8"
	}, done);
});

