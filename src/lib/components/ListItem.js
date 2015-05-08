"use strict";


var React = require("react");
var classNames = require("classnames");
var pluckTdProps = require("../util/pluckTdProps");


var ListItem = React.createClass({
	// Component API
	propTypes: {
		bullet: React.PropTypes.string,
		className: React.PropTypes.string,
		itemWrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			style: React.PropTypes.object,
			bgColor: React.PropTypes.string,
			width: React.PropTypes.number,
			height: React.PropTypes.number,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		}),
		bulletWrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			style: React.PropTypes.object,
			bgColor: React.PropTypes.string,
			width: React.PropTypes.number,
			height: React.PropTypes.number,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		})
	},
	getDefaultProps: function () {
		return {
			itemWrapper: {
				align: "left",
				valing: "top"
			},
			bulletWrapper: {
				align: "left",
				valing: "top"
			}
		};
	},
	render: function () {
		var itemProps = this.getItemProps();
		var bulletProps = this.getBulletProps();

		if (this.props.bullet) {
			return (
				<tr className={classNames("list-item", "list-item-with-bullet", this.props.className)}>
					<td {...bulletProps}>{this.props.bullet}</td>
					<td {...itemProps}>{this.props.children}</td>
				</tr>
			);
		} else {
			return (
				<tr className={classNames("list-item", this.props.className)}>
					<td {...itemProps}>{this.props.children}</td>
				</tr>
			);
		}
	},
	// Private API
	getItemProps: function () {
		var itemProps = pluckTdProps(this.props.itemWrapper);

		itemProps.className = classNames("list-item-wrapper", itemProps.className);

		return itemProps;
	},
	getBulletProps: function () {
		var itemProps = pluckTdProps(this.props.itemWrapper);

		itemProps.className = classNames("list-bullet-wrapper", itemProps.className);

		return itemProps;
	}
	// Public API
});

module.exports = ListItem;
