"use strict";


var React = require("react");
var fs = require("fs");
var glob = require("glob");
var path = require("path");
var mkdir = require("mkdir-p");
var html = require("html");
var async = require("async");
var request = require("superagent");

var mighty = null;

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
					inlinedHtml = inlinedHtml.replace(/\[if\s+/g, "[if ");
					fs.writeFile(cfg.testDest + "/index.html", inlinedHtml, {
						encoding: "utf8"
					}, done);
				}
			});
		}
	});
});

gulp.task("docs", ["script:build"], function (done) {
	mighty = require("./index");

	enumerateComponentModules(function (error, componentModules) {
		if (error) {
			done(error);
			return;
		}

		async.parallel({
			tpl: async.apply(fs.readFile, "./templates/Readme.tpl.md", { encoding: "utf8" }),
			documentation: function (cb) {
				var documentation = {};
				async.mapSeries(componentModules, generateDocumenationForComponent, function (err, componentModulesDocs) {
					if (err) {
						cb(err);
						return;
					}

					componentModules.map(function (componentModule, k) {
						documentation[componentModule.name] = {
							componentModule: componentModule,
							docs: componentModulesDocs[k]
						};
					});

					cb(null, documentation);
				})
			}
		}, function (e, result) {
			if (e) {
				done(e);
				return;
			}

			var tpl = result.tpl;

			Object.keys(result.documentation).forEach(function (componentName) {
				var doc = result.documentation[componentName];
				var docs = doc.docs;
				var indent = "    ";

				var examples = docs.examples.map(function (example) {
					var markup = html.prettyPrint(example.output.trim(), { indent_size: 2 });
					markup = markup.replace(/\[if\s+/g, "[if ");

					return [
						"**Example**",
						indent + example.example.trim().replace(/(\r\n|\n)/g, "\n" + indent).replace(/\t/g, "  "),
						"**Result**",
						indent + markup.replace(/(\r\n|\n)/g, "\n" + indent)
					].join("\n\n");
				}).join("\n\n");

				tpl = tpl.replace("{" + componentName + ":examples}", examples);
			});

			fs.writeFile("./Readme.md", tpl, { encoding: "utf8" }, done);
		});
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

function enumerateComponentModules(callback) {
	glob("./lib/components/**/*.js", function (error, files) {
		if (error) {
			callback(error);
			return;
		}

		var componentFiles = files.filter(function (file) {
			return file.indexOf(".example") < 0;
		});

		async.map(componentFiles, function (componentFile, cb) {
			fs.readFile(componentFile, { encoding: "utf8" }, function (err, src) {
				if (err) {
					cb(err);
					return;
				}

				var name = path.basename(componentFile, ".js");

				cb(null, {
					dir: path.dirname(componentFile),
					name: name,
					Element: mighty[name],
					src: src
				});
			});
		}, callback);
	});
}

function generateDocumenationForComponent(componentModule, callback) {
	async.parallel({
		examples: async.apply(generateExampleDocumentationForComponent, componentModule)
		// properties: async.apply(generatePropertyDocumentationForComponent, componentModule)
	}, callback);
}

function generateExampleDocumentationForComponent(componentModule, callback) {
	async.waterfall([
		async.apply(enumerateComponentExample, componentModule),
		function (exampleFiles, cb) {
			async.mapSeries(exampleFiles, function (exampleFile, done) {
				var exampleJsxFile = exampleFile.replace("/lib", "/src/lib");

				fs.readFile(exampleJsxFile, { encoding: "utf8" }, function (e, exampleSrc) {
					if (e) {
						done(e);
						return;
					}

					var example = require(exampleFile);
					var exampleMarkup = React.renderToStaticMarkup(example);

					done(null, {
						example: exampleSrc,
						output: exampleMarkup
					});
				});
			}, cb);
		}
	], callback);
}

function enumerateComponentExample(componentModule, callback) {
	var pattern = "./" + globifyPath(path.join(componentModule.dir, componentModule.name + ".example.*"));
	glob(pattern, callback);
}

// function generatePropertyDocumentationForComponent(componentModule, callback) {
// 	var Element = componentModule.Element;
// 	var propTypes = Element.propTypes || {};
// 	var defaultProps = Element.defaultProps || {};
// 	var propNames = Object.keys(propTypes);
// 	var docs = {};

// 	propNames.forEach(function (propName) {
// 		var m = componentModule.src.match(new RegExp(propName + ":.*React\\.PropTypes\\.(\\w+).*"));

// 		if (m) {
// 			var typeName = m[1];
// 			var defaultValue = defaultProps[propName];

// 			switch (typeName) {
// 				case "oneOf":
// 					typeName = "enum";
// 					break;
// 				case "oneOfType":
// 					typeName = "enum(typed)";
// 					break;
// 				case "instanceOf":
// 					typeName = "instance";
// 					break;
// 				case "shape":
// 					typeName = "shape";
// 					break;
// 				case "arrayOf":
// 					typeName = "homogenous array";
// 					break;
// 				case "objectOf":
// 					typeName = "object of";
// 					break;
// 			}

// 			docs[propName] = {
// 				type: typeName,
// 				defvaultValue: defaultValue
// 			};
// 		}
// 	});

// 	process.nextTick(function () {
// 		callback(null, docs);
// 	});
// }
