"use strict";


// mixin(a, ...sources)
function mixin(a) {
	var k, key, o;
	var len = arguments.length;

	for (k = 1; k < len; k += 1) {
		o = arguments[k];

		for (key in o) {
			var v = o[key];

			if (o.hasOwnProperty(key)) {
				if (v === undefined || v === null) {
					delete a[key];
				} else {
					a[key] = o[key];
				}
			}
		}
	}

	return a;
}

module.exports = mixin;
