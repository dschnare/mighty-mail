"use strict";


var React = require("react");
var classNames = require("classnames");
var mixin = require("../util/mixin");


var ListItem = React.createClass({
	// Component API
	propTypes: {
		bullet: React.PropTypes.string,
		className: React.PropTypes.string
	},
	render: function () {
		var itemProps = this.getItemProps();
		var bulletProps = this.getBulletProps();

		if (this.props.bullet) {
			return (
				<tr className={classNames(this.props.className)}>
					<td {...bulletProps}>{this.props.bullet}</td>
					<td {...itemProps}>{this.props.children}</td>
				</tr>
			);
		} else {
			return (
				<tr className={classNames(this.props.className)}>
					<td {...itemProps}>{this.props.children}</td>
				</tr>
			);
		}
	},
	// Private API
	getItemProps: function () {
		return {
			align: "left",
			valign: "top",
			className: "list-item"
		};
	},
	getBulletProps: function () {
		return mixin({}, this.getItemProps(), {
			className: "list-bullet"
		});
	}
	// Public API
});

module.exports = ListItem;
