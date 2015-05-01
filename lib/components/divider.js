"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Row = require("./row");
var Col = require("./col");
var classNames = require("classnames");


var Divider = React.createClass({displayName: "Divider",
	// Component API
	propTypes: {
		width: React.PropTypes.number.isRequired,
		thickness: React.PropTypes.number,
		color: React.PropTypes.string,
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
			thickness: 1,
			color: "#eaeaea",
			classNames: {
				wrapper: "",
				cell: "topline baseline"
			}
		};
	},
	render: function () {
		var thickness = this.props.thickness;
		var wrapperClassName = classNames("divider", this.props.classNames.wrapper || this.props.classNames);
		var cellClassName = { cell: classNames(this.props.classNames.cell) };
		var lineStyle = {
			fontSize: "1px",
			lineHeight: "1px",
			msoLineHeightRule: "exactly"
		};

		return (
			React.createElement(Row, {width: this.props.width, className: wrapperClassName}, 
				React.createElement(Col, {align: "center", float: "center", classNames: cellClassName}, 

					React.createElement("table", {cellPadding: "0", cellSpacing: "0", border: "0", width: this.props.width, align: "center", className: "divider-line m-full-width"}, 
						React.createElement("tbody", null, 
							React.createElement("tr", null, 
								React.createElement("td", {width: this.props.width, height: thickness, bgColor: this.props.color, style: lineStyle, className: "divider-line-cell"})
							)
						)
					)

				)
			)
		);
	}
	// Private API
	// Public API
});

module.exports = Divider;
