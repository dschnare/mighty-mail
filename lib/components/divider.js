"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var classNames = require("classnames");
var Container = require("./layout/Container");
var mixin = require("../util/mixin");


var Divider = React.createClass({displayName: "Divider",
	// Component API
	propTypes: {
		width: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string
		]),
		thickness: React.PropTypes.number,
		color: React.PropTypes.string,
		className: React.PropTypes.string,
		wrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			style: React.PropTypes.object
		})
	},
	getDefaultProps: function () {
		return {
			thickness: 1,
			color: "#eaeaea",
			width: "100%",
			wrapper: {}
		};
	},
	render: function () {
		var containerProps = this.getContainerProps();

		return (
			React.createElement(Container, React.__spread({},  containerProps))
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
				className: classNames(this.props.wrapper.className),
				style: mixin({}, this.props.wrapper.style || {}, {
					fontSize: 1,
					lineHeight: 1,
					msoLineHeightRule: "exactly"
				})
			}
		};
	}
	// Public API
});

module.exports = Divider;
