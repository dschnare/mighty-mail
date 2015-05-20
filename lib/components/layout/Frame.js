"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./Container");
var mixin = require("../../util/mixin");
var defineTableProps = require("../../util/defineTableProps");
var defineTdProps = require("../../util/defineTdProps");
var pluckTableProps = require("../../util/pluckTableProps");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var Frame = React.createClass({displayName: "Frame",
	// Component API
	propTypes: mixin({
		border: React.PropTypes.number,
		borderColor: React.PropTypes.string,
		wrapper: React.PropTypes.shape(defineTdProps())
	}, defineTableProps()),
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

		delete containerProps.border;
		containerProps.cssPrefix = "frame";
		containerProps.wrapper = this.props.wrapper || {};

		if (containerProps.width && typeof containerProps.width === "number") {
			containerProps.wrapper.width = containerProps.width;
		}

		containerProps.wrapper.style = this.getBorderStyle();

		return containerProps;
	},
	getBorderStyle: function () {
		var borderStyle = mixin({}, this.props.wrapper.style || {});

		if (this.props.border && this.props.borderColor) {
			borderStyle.border = this.props.border + "px solid " + this.props.borderColor;
		}

		return borderStyle;
	}
	// Public API
});

module.exports = Frame;
