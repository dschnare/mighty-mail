"use strict";


var React = require("react");
var fs = require("fs");
var glob = require("glob");
var path = require("path");
var mkdir = require("mkdir-p");
var html = require("html");
var async = require("async");
var request = require("superagent");

var gulp = require("gulp");
var cfg = require("./gulp.config");
var eslint = require("gulp-eslint");
var react = require("gulp-react");
var sass = require("gulp-sass");
var less = require("gulp-less");


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

gulp.task("test:build", ["script:build", "less:build", "sass:build"], function () {
	return gulp.src(cfg.testFiles, { base: "./test/src" })
		.pipe(react({ harmony: true }))
		.pipe(gulp.dest(cfg.testDest));
});


gulp.task("less:build", function () {
	return gulp.src(globifyPath(cfg.styles) + "/styles.less")
		.pipe(less())
		.pipe(gulp.dest(path.join(cfg.testDest, "styles")));
});

gulp.task("sass:build", function () {
	return gulp.src(globifyPath(cfg.styles) + "/styles.scss")
		.pipe(sass())
		.pipe(gulp.dest(path.join(cfg.testDest, "styles")));
});

gulp.task("test", ["test:build"], function (done) {
	var body = require("./test/build").render();
	body = html.prettyPrint(body, { indent_size: 2 });

	loadTemplate(body, function (error, tpl) {
		if (error) {
			done(error);
		} else {
			inlineCss(tpl, function (err, inlinedHtml) {
				if (err) {
					done(err);
				} else {
					// inlinedHtml = inlinedHtml.replace(/\[if\s+/g, "[if ");
					fs.writeFile(cfg.testDest + "/index.html", inlinedHtml, {
						encoding: "utf8"
					}, done);
				}
			});
		}
	});
});

gulp.task("docs", ["script:build"], function (done) {
	var mighty = require("./index");

	glob("./lib/components/**/*.js", function (error, files) {
		if (error) {
			done(error);
			return;
		}

		var componentFiles = files.filter(function (file) {
			return file.indexOf(".example") < 0;
		});

		async.each(componentFiles, function (componentFile, callback) {
			var dir = path.dirname(componentFile);
			var componentName = path.basename(componentFile, ".js");
			console.log("componentName:", componentName);
			var El = mighty[componentName];

			glob(path.join(dir, componentName + ".example.*"), function (err, exampleFiles) {
				if (err) {
					callback(err);
					return;
				}

				async.eachSeries(exampleFiles, function (exampleFile, cb) {
					fs.readFile(exampleFile, function (e, exampleSrc) {
						if (e) {
							cb(e);
							return;
						}

						var example = require(exampleFile);
						var exampleMarkup = React.renderToStaticMarkup(example);

						// TODO: Inline exampleSrc
						// TODO: Inline exampleMarkup
						// TODO: Inline property docs using El.propTypes, El.defaultProps and React.PropTypes

						cb();
					});
				}, callback);
			});
		}, done);
	});
});


// Helpers

// When using glob() the path must only use UNIX path separators.
// We also remove any trailing slashes.
function globifyPath(path) {
	return path.replace(/\/|\\$/, "").replace(/\\/g, "/");
}

function loadTemplate(body, callback) {
	var opts = { encoding: "utf8" };

	async.parallel({
		styles: async.apply(fs.readFile, path.join(cfg.testDest, "styles", "styles.css"), opts),
		html: async.apply(fs.readFile, cfg.template, opts)
	}, function (error, results) {
		if (error) {
			callback(error);
		} else {
			callback(null, results.html
				.replace("%styles%", results.styles)
				.replace("%body%", body)
				.replace(/<body>/, "<body>\n  <base href=\"..\" />"));
		}
	});
}

function inlineCss(html, callback) {
	request.post("http://inliner.cm/inline.php")
		.type("form")
		.send({ code: html })
		.end(function (err, response) {
			if (err) {
				callback(err);
			} else {
				callback(null, response.body.HTML);
			}
		});
}