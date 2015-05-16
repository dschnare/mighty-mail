"use strict";

/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./Container");
var mixin = require("../../util/mixin");
var defineTableProps = require("../../util/defineTableProps");
var defineTdProps = require("../../util/defineTdProps");
var pluckTableProps = require("../../util/pluckTableProps");
var pluckTdProps = require("../../util/pluckTdProps");


// !! Cols will have their widths and padding overridden by the parent Row.
var Col = React.createClass({displayName: "Col",
	// Component API
	propTypes: mixin({
		span: React.PropTypes.number,
		gutter: React.PropTypes.number,
		float: React.PropTypes.oneOf(["left", "right"]),
		wrapper: React.PropTypes.shape(defineTdProps())
	}, defineTableProps()),
	getDefaultProps: function () {
		return {
			span: 1,
			wrapper: {
				align: "left",
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

		containerProps.cssPrefix = "col";
		containerProps.align = this.props.float || containerProps.align;

		var gutter = this.props.gutter;

		containerProps.wrapper = pluckTdProps(this.props.wrapper);
		containerProps.wrapper.width = containerProps.width;

		if (gutter && typeof gutter === "number") {
			if (!containerProps.wrapper.style) {
				containerProps.wrapper.style = {};
			}

			containerProps.wrapper.style.paddingLeft = gutter;
		}

		return containerProps;
	}
	// Public API
});

module.exports = Col;
