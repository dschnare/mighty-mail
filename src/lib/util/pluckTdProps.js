"use strict";


var classNames = require("classnames");


var propNames = "bgColor,className,style,width,height,align,valign".split(",");

function pluckTdProps(o) {
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

module.exports = pluckTdProps;
