"use strict";


/*eslint no-unused-vars: 0*/


/*
The Container component will render a <table> with a single
<td> wrapper. The main benefit of a Container are the default
<table> and <td> properties. The following properties are supported.

	cssPrefix: React.PropTypes.string,
	cellSpacing: numberOrStringType,
	cellPadding: numberOrStringType,
	border: numberOrStringType,
	bgColor: React.PropTypes.string,
	className: React.PropTypes.string,
	style: React.PropTypes.object,
	width: numberOrStringType,
	align: React.PropTypes.oneOf(["left", "center", "right"]),
	wrapper: React.PropTypes.shape({
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		bgColor: React.PropTypes.string,
		align: React.PropTypes.oneOf(["left", "center", "right"]),
		valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
	})

The "wrapper" property contain all the properties that will
be passed on to the <td> wrapper element.

The following are the property defaults.

	{
		cssPrefix: "container",
		cellSpacing: 0,
		cellPadding: 0,
		border: 0,
		align: "left",
		wrapper: {
			align: "left",
			valign: "top"
		}
	}

*/


var React = require("react");
var classNames = require("classnames");
var RawHtml = require("../RawHtml");
var pluckTableProps = require("../../util/pluckTableProps");
var pluckTdProps = require("../../util/pluckTdProps");
var entities = require("../../util/entities");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var Container = React.createClass({displayName: "Container",
	// Component API
	propTypes: {
		cssPrefix: React.PropTypes.string,
		cellSpacing: numberOrStringType,
		cellPadding: numberOrStringType,
		border: numberOrStringType,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		width: numberOrStringType,
		align: React.PropTypes.oneOf(["left", "center", "right"]),
		wrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			style: React.PropTypes.object,
			bgColor: React.PropTypes.string,
			background: React.PropTypes.string,
			width: numberOrStringType,
			height: numberOrStringType,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		})
	},
	getDefaultProps: function () {
		return {
			cssPrefix: "container",
			cellSpacing: 0,
			cellPadding: 0,
			border: 0,
			align: "left",
			wrapper: {
				align: "left",
				valign: "top"
			}
		};
	},
	render: function () {
		var tableProps = this.getTableProps();
		var tdProps = pluckTdProps(this.props.wrapper || {});
		var content = React.Children.count(this.props.children) === 0 ? entities.NBSP : this.props.children;

		if (this.props.cssPrefix) {
			tableProps.className = classNames(this.props.cssPrefix, tableProps.className);
			tdProps.className = classNames(this.props.cssPrefix + "-wrapper", tdProps.className);
		} else {
			delete tableProps.className;
			delete tdProps.className;
		}

		return (
			React.createElement("table", React.__spread({},  tableProps), 
				React.createElement("tbody", null, 
					React.createElement("tr", null, 
						React.createElement(RawHtml, React.__spread({wrapper: "td"},  tdProps), content)
					)
				)
			)
		);
	},
	// Private API
	getTableProps: function () {
		return pluckTableProps(this.props);
	}
	// Public API
});

module.exports = Container;
