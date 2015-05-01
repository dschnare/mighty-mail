"use strict";


var React = require("react");
var classNames = require("classnames");
var px = require("../util/px");


// !! Cols will have their widths and padding overridden by the parent Row.
var Col = React.createClass({displayName: "Col",
	// Component API
	propTypes: {
		span: React.PropTypes.number,
		align: React.PropTypes.string,
		width: React.PropTypes.number,
		gutter: React.PropTypes.number,
		float: React.PropTypes.string,
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
			span: 1,
			align: "left",
			float: "left",
			width: 0,
			gutter: 0,
			classNames: {}
		};
	},
	render: function () {
		var paddingStyle = {};
		var wrapperClassName = classNames("col", this.props.classNames.wrapper || this.props.classNames);
		var cellClassName = classNames("col-cell", this.props.classNames.cell);

		if (this.props.gutter) {
			paddingStyle.paddingLeft = px(this.props.gutter);
		}

		return (
			React.createElement("table", {cellSpacing: "0", cellPadding: "0", border: "0", align: this.props.float, width: this.props.width, bgColor: this.props.bgColor, className: wrapperClassName}, 
				React.createElement("tbody", null, 
					React.createElement("tr", null, 
						React.createElement("td", {style: paddingStyle, width: this.props.width, align: this.props.align, className: cellClassName}, this.props.children)
					)
				)
			)
		);
	}
	// Private API
	// Public API
});

module.exports = Col;
