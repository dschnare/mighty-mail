"use strict";


var glob = require("glob");


function config() {
	var cfg = {};

	cfg.src = "./src/";
	cfg.dist = "./dist/";
	cfg.srcFiles = glob.sync(cfg.src + "*.js!(x)");
	cfg.srcMainEntry = cfg.src + "main.jsx";

	return cfg;
}

module.exports = config();
