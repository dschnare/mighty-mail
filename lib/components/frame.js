"use strict";


var React = require("react");
var classNames = require("classnames");
var px = require("../util/px");
var width = require("../util/width");


/*
The Frame component will render a <table> wrapper with a single
<td> cell. The feature of a Frame include a 100% width <table>
and the ability to specify a border and background color.

If no width is specified then the Frame's <table> width will be 100%.
*/

var Frame = React.createClass({displayName: "Frame",
	// Component API
	propTypes: {
		width: React.PropTypes.number,
		borderColor: React.PropTypes.string,
		borderThickness: React.PropTypes.number,
		bgColor: React.PropTypes.string,
		classNames: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.shape({
				wrapper: React.PropTypes.string,
				cell: React.PropTypes.string
			})
		])
	},
	getDefaultProps: function () {
		return {
			width: 0,
			borderThickness: 1,
			classNames: {}
		};
	},
	render: function () {
		var borderStyle = {};
		var wrapperClassName = classNames("frame", this.props.classNames.wrapper || this.props.classNames);
		var cellClassName = classNames("frame-cell", this.props.classNames.cell);

		if (this.props.borderColor && this.props.borderThickness) {
			borderStyle.border = [px(this.props.borderThickness), this.props.borderColor].join(" solid ");
		}

		return (
			React.createElement("table", {cellPadding: "0", cellSpacing: "0", border: "0", align: "center", width: width(this.props.width), bgColor: this.props.bgColor, className: wrapperClassName, style: borderStyle}, 
				React.createElement("tbody", null, 
					React.createElement("tr", null, 
						React.createElement("td", {align: "center", className: cellClassName}, 
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
