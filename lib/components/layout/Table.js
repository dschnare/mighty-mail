"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var classNames = require("classnames");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var Table = React.createClass({displayName: "Table",
	// Component API
	propTypes: {
		collSpacing: numberOrStringType,
		collPadding: numberOrStringType,
		border: numberOrStringType,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		width: numberOrStringType,
		align: React.PropTypes.oneOf(["left", "center", "right"])
	},
	getDefaultProps: function () {
		return {
			collSpacing: 0,
			collPadding: 0,
			border: 0,
			align: "left"
		};
	},
	render: function () {
		var tableProps = this.getTableProps();

		return (
			React.createElement("table", React.__spread({},  tableProps), 
				this.props.children
			)
		);
	},
	// Private API
	getTableProps: function () {
		return {
			collSpacing: this.props.collSpacing,
			collPadding: this.props.collPadding,
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
