"use strict";


var React = require("react");
var classNames = require("classnames");


var ListItem = React.createClass({
	// Component API
	propTypes: {
		bullet: React.PropTypes.string,
		className: React.PropTypes.string
	},
	render: function () {
		var itemAttrs = {
			align: "left",
			valign: "top",
			className: classNames("list-item", this.props.className)
		};

		var bulletItemAttrs = {
			align: "left",
			valign: "top",
			className: classNames("list-bullet", this.props.className)
		};

		if (this.props.bullet) {
			return (
				<tr className={classNames(this.props.className)}>
					<td {...bulletItemAttrs}>{this.props.bullet}</td>
					<td {...itemAttrs}>{this.props.children}</td>
				</tr>
			);
		} else {
			return (
				<tr>
					<td {...itemAttrs}>{this.props.children}</td>
				</tr>
			);
		}
	}
	// Private API
	// Public API
});

module.exports = ListItem;
