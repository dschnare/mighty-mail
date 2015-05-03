"use strict";


// mixin(a, ...sources)
function mixin(a) {
	var k, key, o;
	var len = arguments.length;

	for (k = 1; k < len; k += 1) {
		o = arguments[k];
		for (key in o) {
			if (o.hasOwnProperty(key)) {
				a[key] = o[key];
			}
		}
	}

	return a;
}

module.exports = mixin;
