"use strict";


var classNames = require("classnames");


function pluckTableProps(o) {
	return {
		cellSpacing: o.cellSpacing,
		cellPadding: o.cellPadding,
		border: o.border,
		bgColor: o.bgColor,
		className: classNames(o.className),
		style: o.style,
		width: o.width,
		align: o.align
	};
}

module.exports = pluckTableProps;
