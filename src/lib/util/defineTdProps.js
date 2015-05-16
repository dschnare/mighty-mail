"use strict";


var React = require("react");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

function defineTdProps() {
	return {
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		bgColor: React.PropTypes.string,
		width: numberOrStringType,
		height: numberOrStringType,
		align: React.PropTypes.oneOf(["left", "center", "right"]),
		valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
	};
}

module.exports = defineTdProps;
