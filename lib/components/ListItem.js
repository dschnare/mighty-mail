"use strict";


var React = require("react");
var classNames = require("classnames");
var pluckTdProps = require("../util/pluckTdProps");


var ListItem = React.createClass({displayName: "ListItem",
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
				React.createElement("tr", {className: classNames("list-item", "list-item-with-bullet", this.props.className)}, 
					React.createElement("td", React.__spread({},  bulletProps), this.props.bullet), 
					React.createElement("td", React.__spread({},  itemProps), this.props.children)
				)
			);
		} else {
			return (
				React.createElement("tr", {className: classNames("list-item", this.props.className)}, 
					React.createElement("td", React.__spread({},  itemProps), this.props.children)
				)
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
