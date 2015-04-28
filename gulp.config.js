"use strict";


var glob = require("glob");


function config() {
	var cfg = {};

	cfg.dest = ".";

	cfg.srcFiles = glob.sync("src/**/*.js?(x)");
	cfg.srcMainEntry = "./index.js";

	cfg.testDest = "test/build";
	cfg.testFiles = glob.sync("./test/src/*.js?(x)");

	return cfg;
}

module.exports = config();
