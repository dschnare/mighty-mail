"use strict";


var React = require("react");
var classNames = require("classnames");
var px = require("../util/px");


// !! Cols will have their widths and padding overridden by the parent Row.
var Col = React.createClass({
	// Component API
	propTypes: {
		span: React.PropTypes.number,
		align: React.PropTypes.oneOf(["left", "center", "right"]),
		valign: React.PropTypes.oneOf(["top", "middle", "bottom"]),
		width: React.PropTypes.number,
		gutter: React.PropTypes.number,
		float: React.PropTypes.oneOf(["left", "center", "right"]),
		bgColor: React.PropTypes.string,
		styles: React.PropTypes.shape({
			wrapper: React.PropTypes.object,
			cell: React.PropTypes.object
		}),
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
			valign: "top",
			float: "left",
			gutter: 0,
			classNames: {},
			styles: {}
		};
	},
	render: function () {
		var cellStyle = this.props.styles.cell || {};
		var wrapperClassName = classNames("col", this.props.classNames.wrapper || this.props.classNames);
		var cellClassName = classNames("col-cell", this.props.classNames.cell);

		var wrapperAttrs = {
			cellSpacing: 0,
			cellPadding: 0,
			border: 0,
			width: this.props.width,
			align: this.props.float,
			bgColor: this.props.bgColor,
			className: wrapperClassName,
			style: this.props.styles.wrapper
		};

		var cellAttrs = {
			width: this.props.width,
			align: this.props.align,
			valign: this.props.valign,
			className: cellClassName,
			style: cellStyle
		};

		if (this.props.gutter) {
			cellStyle.paddingLeft = px(this.props.gutter);
		}

		return (
			<table {...wrapperAttrs}>
				<tbody>
					<tr>
						<td {...cellAttrs}>{this.props.children}</td>
					</tr>
				</tbody>
			</table>
		);
	}
	// Private API
	// Public API
});

module.exports = Col;
