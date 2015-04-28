"use strict";


var React = require("react");
var classNames = require("classnames");
var px = require("../util/px");
var width = require("../util/width");


var Frame = React.createClass({displayName: "Frame",
	// Component API
	propTypes: {
		width: React.PropTypes.number,
		borderColor: React.PropTypes.string,
		borderThickness: React.PropTypes.number,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			width: 0,
			borderThickness: 1
		};
	},
	render: function () {
		var style = {};

		if (this.props.borderColor && this.props.borderThickness) {
			style.border = [px(this.props.borderThickness), this.props.borderColor].join(" solid ");
		}

		return (
			React.createElement("table", {cellPadding: "0", cellSpacing: "0", border: "0", align: "center", width: width(this.props.width), bgColor: this.props.bgColor, className: classNames("frame", this.props.className), style: style}, 
				React.createElement("tbody", null, 
					React.createElement("tr", null, 
						React.createElement("td", {align: "center"}, 
							this.props.children
						)
					)
				)
			)
		);
	}
	// Private API
	// Public API
});

module.exports = Frame;
