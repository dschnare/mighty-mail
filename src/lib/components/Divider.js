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
		var colProps = this.getColProps();

		return (
			<Container {...containerProps}>
				<Container {...colProps} />
			</Container>
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
				width: this.props.width
			}
		};
	},
	getColProps: function () {
		return {
			cssPrefix: "col",
			align: "center",
			width: this.props.width,
			className: "divider-line",
			wrapper: {
				bgColor: this.props.bgColor,
				height: this.props.thickness,
				width: this.props.width,
				className: "divider-line-wrapper",
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
