"use strict";


var React = require("react");
var classNames = require("classnames");
var pluckTdProps = require("../util/pluckTdProps");
var defineTdProps = require("../util/defineTdProps");
var entities = require("../util/entities");


var ListItem = React.createClass({
	// Component API
	propTypes: {
		bullet: React.PropTypes.string,
		className: React.PropTypes.string,
		itemWrapper: React.PropTypes.shape(defineTdProps()),
		bulletWrapper: React.PropTypes.shape(defineTdProps())
	},
	getDefaultProps: function () {
		return {
			bullet: entities.BULL,
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
		var bullet = this.props.bullet || entities.BULL;

		return (
			<tr className={classNames("list-item", this.props.className)}>
				<td {...bulletProps}>{bullet}</td>
				<td {...itemProps}>{this.props.children}</td>
			</tr>
		);
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
