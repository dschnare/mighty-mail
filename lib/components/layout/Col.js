"use strict";

/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./Container");
var mixin = require("../../util/mixin");
var pluckTableProps = require("../../util/pluckTableProps");
var pluckTdProps = require("../../util/pluckTdProps");


// !! Cols will have their widths and padding overridden by the parent Row.
var Col = React.createClass({displayName: "Col",
	// Component API
	propTypes: {
		span: React.PropTypes.number,
		gutter: React.PropTypes.number,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		width: React.PropTypes.number,
		align: React.PropTypes.oneOf(["left", "center", "right"]),
		float: React.PropTypes.oneOf(["left", "right"]),
		wrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			bgColor: React.PropTypes.string,
			width: React.PropTypes.number,
			height: React.PropTypes.number,
			style: React.PropTypes.object,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		})
	},
	getDefaultProps: function () {
		return {
			span: 1,
			align: "left",
			wrapper: {
				align: "left",
				valign: "top",
				style: {}
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
