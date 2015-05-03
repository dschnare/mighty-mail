"use strict";

/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./Container");
var mixin = require("../../util/mixin");


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
		float: React.PropTypes.oneOf(["left", "center", "right"]),
		wrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			style: React.PropTypes.object,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		})
	},
	getDefaultProps: function () {
		return {
			span: 1,
			float: "left",
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
		var containerProps = mixin({}, this.props, {
			cssPrefix: "col"
		});
		var float = containerProps.float;
		var gutter = containerProps.gutter;

		delete containerProps.children;
		delete containerProps.gutter;
		delete containerProps.span;
		delete containerProps.float;

		containerProps.align = float;
		containerProps.wrapper = mixin({}, containerProps.wrapper);
		containerProps.wrapper.width = containerProps.width;

		if (gutter && typeof gutter === "number") {
			containerProps.wrapper.style.paddingLeft = gutter + "px";
		}

		return containerProps;
	}
	// Public API
});

module.exports = Col;
