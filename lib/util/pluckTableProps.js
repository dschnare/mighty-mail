"use strict";


var classNames = require("classnames");


var propNames = "cellSpacing,cellPadding,border,bgColor,className,style,width,align".split(",");

function pluckTableProps(o) {
	o = o || {};
	var props = {};

	propNames.forEach(function (propName) {
		if (o.hasOwnProperty(propName)) {
			props[propName] = o[propName];
		}
	});

	if (props.className) {
		props.className = classNames(props.className);
	}

	return props;
}

module.exports = pluckTableProps;
