"use strict";


var React = require("react");
var classNames = require("classnames");
var pluckTdProps = require("../util/pluckTdProps");
var defineTdProps = require("../util/defineTdProps");
var entities = require("../util/entities");
var mixin = require("../util/mixin");


var ListItem = React.createClass({displayName: "ListItem",
	// Component API
	propTypes: {
		bullet: React.PropTypes.string.isRequired,
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
		var bullet = this.props.bullet;

		return (
			React.createElement("tr", {className: classNames("list-item", this.props.className)}, 
				React.createElement("td", React.__spread({},  bulletProps), bullet), 
				React.createElement("td", React.__spread({},  itemProps), this.props.children)
			)
		);
	},
	// Private API
	getItemProps: function () {
		var itemProps = pluckTdProps(mixin({}, ListItem.defaultProps.itemWrapper, this.props.itemWrapper || {}));

		itemProps.className = classNames("list-item-wrapper", itemProps.className);

		return itemProps;
	},
	getBulletProps: function () {
		var itemProps = pluckTdProps(mixin({}, ListItem.defaultProps.bulletWrapper, this.props.itemWrapper || {}));

		itemProps.className = classNames("list-bullet-wrapper", itemProps.className);

		return itemProps;
	}
	// Public API
});

module.exports = ListItem;
