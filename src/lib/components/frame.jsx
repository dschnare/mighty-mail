"use strict";


var React = require("react");
var classNames = require("classnames");
var px = require("../util/px");
var width = require("../util/width");


var Frame = React.createClass({
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
			<table cellPadding="0" cellSpacing="0" border="0" align="center" width={width(this.props.width)} bgColor={this.props.bgColor} className={classNames("frame", this.props.className)} style={style}>
				<tbody>
					<tr>
						<td align="center">
							{this.props.children}
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
	// Private API
	// Public API
});

module.exports = Frame;
