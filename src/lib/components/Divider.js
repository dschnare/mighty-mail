"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./layout/Container");


var Divider = React.createClass({
	// Component API
	propTypes: {
		width: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string
		]),
		thickness: React.PropTypes.number,
		color: React.PropTypes.string,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			thickness: 1,
			color: "#eaeaea",
			width: "100%"
		};
	},
	render: function () {
		var containerProps = this.getContainerProps();

		return (
			<Container {...containerProps} />
		);
	},
	// Private API
	getContainerProps: function () {
		return {
			cssPrefix: "divider",
			width: this.props.width,
			align: "center",
			className: this.props.className,
			wrapper: {
				align: "center",
				width: this.props.width,
				height: this.props.thickness,
				bgColor: this.props.color,
				style: {
					fontSize: "1px",
					lineHeight: "1px",
					msoLineHeightRule: "exactly"
				}
			}
		};
	}
	// Public API
});

module.exports = Divider;
