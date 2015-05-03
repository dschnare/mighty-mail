"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var classNames = require("classnames");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var Table = React.createClass({
	// Component API
	propTypes: {
		cellSpacing: numberOrStringType,
		cellPadding: numberOrStringType,
		border: numberOrStringType,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		width: numberOrStringType,
		align: React.PropTypes.oneOf(["left", "center", "right"])
	},
	getDefaultProps: function () {
		return {
			cellSpacing: 0,
			cellPadding: 0,
			border: 0,
			align: "left"
		};
	},
	render: function () {
		var tableProps = this.getTableProps();

		return (
			<table {...tableProps}>
				{this.props.children}
			</table>
		);
	},
	// Private API
	getTableProps: function () {
		return {
			cellSpacing: this.props.cellSpacing,
			cellPadding: this.props.cellPadding,
			border: this.props.border,
			width: this.props.width,
			align: this.props.align,
			bgColor: this.props.bgColor,
			className: classNames(this.props.className),
			style: this.props.style
		};
	}
	// Public API
});

module.exports = Table;
