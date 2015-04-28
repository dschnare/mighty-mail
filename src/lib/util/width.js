// This module exposes a function that
// makes dealing with CSS width values easier.


"use strict";


function width(w) {
	return w <= 0 ? "100%" : w;
}

module.exports = width;
