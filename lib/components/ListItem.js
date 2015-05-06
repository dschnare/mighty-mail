"use strict";


var React = require("react");
var classNames = require("classnames");
var mixin = require("../util/mixin");


var ListItem = React.createClass({displayName: "ListItem",
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
				React.createElement("tr", {className: classNames(this.props.className)}, 
					React.createElement("td", React.__spread({},  bulletProps), this.props.bullet), 
					React.createElement("td", React.__spread({},  itemProps), this.props.children)
				)
			);
		} else {
			return (
				React.createElement("tr", {className: classNames(this.props.className)}, 
					React.createElement("td", React.__spread({},  itemProps), this.props.children)
				)
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
