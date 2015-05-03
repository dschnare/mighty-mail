"use strict";


/*eslint no-unused-vars: 0*/


/*
The Container component will render a <table> with a single
<td> wrapper. The main benefit of a Container are the default
<table> and <td> properties. The following properties are supported.

	cssPrefix: React.PropTypes.string,
	collSpacing: numberOrStringType,
	collPadding: numberOrStringType,
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
		collSpacing: 0,
		collPadding: 0,
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


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var Container = React.createClass({
	// Component API
	propTypes: {
		cssPrefix: React.PropTypes.string,
		collSpacing: numberOrStringType,
		collPadding: numberOrStringType,
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
	},
	getDefaultProps: function () {
		return {
			cssPrefix: "container",
			collSpacing: 0,
			collPadding: 0,
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
		var tdProps = this.props.wrapper;

		if (this.props.cssPrefix) {
			tableProps.className = classNames(this.props.cssPrefix, tableProps.className);
			tdProps.className = classNames(this.props.cssPrefix + "-wrapper", tdProps.className);
		} else {
			delete tableProps.className;
			delete tdProps.className;
		}

		return (
			<table {...tableProps}>
				<tbody>
					<tr>
						<RawHtml wrapper="td" {...tdProps}>{this.props.children}</RawHtml>
					</tr>
				</tbody>
			</table>
		);
	},
	// Private API
	getTableProps: function () {
		return {
			collSpacing: this.props.collSpacing,
			collPadding: this.props.collPadding,
			border: this.props.border,
			width: this.props.width,
			align: this.props.align,
			bgColor: this.props.bgColor,
			className: this.props.className,
			style: this.props.style
		};
	}
	// Public API
});

module.exports = Container;
