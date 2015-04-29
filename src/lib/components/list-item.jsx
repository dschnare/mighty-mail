"use strict";


var React = require("react");
var classNames = require("classnames");

var ListItem = React.createClass({
	// Component API
	propTypes: {
		bullet: React.PropTypes.string,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {};
	},
	render: function () {
		if (this.props.bullet) {
			return (
				<tr className={classNames(this.props.className)>
					<td align="left" valign="top" className="list-bullet">{this.props.bullet}</td>
					<td align="left" valign="top" className="list-item">{this.props.children}</td>
				</tr>
			);
		} else {
			return (
				<tr className={classNames(this.props.className)>
					<td align="left" valign="top" className="list-item">{this.props.children}</td>
				</tr>
			);
		}
	}
	// Private API
	// Public API
});

module.exports = ListItem;
