"use strict";


var classNames = require("classnames");


function pluckTdProps(o) {
	o = o || {};
	return {
		bgColor: o.bgColor,
		background: o.background,
		className: classNames(o.className),
		style: o.style,
		width: o.width,
		height: o.height,
		align: o.align,
		valign: o.valign
	};
}

module.exports = pluckTdProps;
