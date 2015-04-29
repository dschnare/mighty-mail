// This module exposes a function that will pull out
// React components that match specific component types
// from a React child collection.


"use strict";


var React = require("react");


function applyChildMask(mask, children) {
	var maskedChildren = [];

	React.Children.forEach(children, function (child) {
		var type = child.type ? child.type.displayName : "";
		if (mask[type]) {
			maskedChildren.push(child);
		}
	});

	return maskedChildren;
}

module.exports = applyChildMask;
