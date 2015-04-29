"use strict";


var React = require("react");
var classNames = require("classnames");
var px = require("../util/px");
var width = require("../util/width");


// !! Cols will have their widths and padding overridden by the parent Row.
var Col = React.createClass({
	// Component API
	propTypes: {
		span: React.PropTypes.number,
		align: React.PropTypes.string,
		width: React.PropTypes.number,
		gutter: React.PropTypes.number,
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
			gutter: 0
		};
	},
	render: function () {
		var style = {};

		if (this.props.gutter) {
			style.paddingLeft = px(this.props.gutter);
		}

		return (
			<table cellSpacing="0" cellPadding="0" border="0" align={this.props.float} width={width(this.props.width)} bgColor={this.props.bgColor} className={classNames("col", this.props.className)}>
				<tbody>
					<tr>
						<td style={style} width={width(this.props.width)} align={this.props.align}>{this.props.children}</td>
					</tr>
				</tbody>
			</table>
		);
	}
	// Private API
	// Public API
});

module.exports = Col;
