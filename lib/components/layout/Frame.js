"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./Container");
var mixin = require("../../util/mixin");
var pluckTableProps = require("../../util/pluckTableProps");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var Frame = React.createClass({displayName: "Frame",
	// Component API
	propTypes: {
		border: numberOrStringType,
		borderColor: React.PropTypes.string,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		width: numberOrStringType,
		align: React.PropTypes.oneOf(["left", "center", "right"]),
		wrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			style: React.PropTypes.object,
			bgColor: React.PropTypes.string,
			width: numberOrStringType,
			height: numberOrStringType,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		})
	},
	getDefaultProps: function () {
		return {
			width: "100%",
			border: 1,
			align: "center",
			wrapper: {
				align: "center",
				valign: "top"
			}
		};
	},
	render: function () {
		var containerProps = this.getContainerProps();

		return (
			React.createElement(Container, React.__spread({},  containerProps), 
				this.props.children
			)
		);
	},
	// Private API
	getContainerProps: function () {
		var containerProps = pluckTableProps(this.props);

		containerProps.cssPrefix = "frame";

		containerProps.style = this.getContainerStyle();

		if (containerProps.width && typeof containerProps.width === "number") {
			if (!containerProps.wrapper) {
				containerProps.wrapper = {};
			}

			containerProps.wrapper.width = containerProps.width;
		}

		return containerProps;
	},
	getContainerStyle: function () {
		var containerStyle = mixin({}, this.props.style || {});

		if (this.props.borderColor) {
			containerStyle.borderColor = this.props.borderColor;
		}

		return containerStyle;
	}
	// Public API
});

module.exports = Frame;
