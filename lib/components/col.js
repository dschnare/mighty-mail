"use strict";


var React = require("react");
var classNames = require("classnames");
var px = require("../util/px");
var width = require("../util/width");


// !! Cols will have their widths and padding overridden by the parent Row.
var Col = React.createClass({displayName: "Col",
	// Component API
	propTypes: {
		span: React.PropTypes.number,
		align: React.PropTypes.string,
		width: React.PropTypes.number,
		paddingRight: React.PropTypes.number,
		float: React.PropTypes.string,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			span: 1,
			align: "left",
			float: "left",
			width: 0,
			paddingRight: 0
		};
	},
	render: function () {
		var style = {};

		if (this.props.paddingRight) {
			style.paddingRight = px(this.props.paddingRight);
		}

		return (
			React.createElement("table", {cellSpacing: "0", cellPadding: "0", border: "0", align: this.props.float, width: width(this.props.width), bgColor: this.props.bgColor, className: classNames("col", this.props.className)}, 
				React.createElement("tbody", null, 
					React.createElement("tr", null, 
						React.createElement("td", {style: style, align: this.props.align}, this.props.children)
					)
				)
			)
		);
	}
	// Private API
	// Public API
});

module.exports = Col;
