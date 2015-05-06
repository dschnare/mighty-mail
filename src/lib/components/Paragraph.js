"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./layout/Container");
var classNames = require("classnames");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var Paragraph = React.createClass({
	// Component API
	propTypes: {
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		width: numberOrStringType,
		height: numberOrStringType,
		align: React.PropTypes.oneOf(["left", "center", "right"]),
		valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
	},
	getDefaultProps: function () {
		return {
			align: "left"
		};
	},
	render: function () {
		var tdProps = this.getTdProps();

		return (
			<tr>
				<td {...tdProps}>{this.props.children}</td>
			</tr>
		);
	},
	// Private API
	getTdProps: function () {
		return {
			className: classNames("paragraph", this.props.className),
			style: this.props.style,
			align: this.props.align,
			width: this.props.width,
			height: this.props.height
		};
	}
	// Public API
});

module.exports = Paragraph;
