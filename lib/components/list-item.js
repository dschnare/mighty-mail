"use strict";


var React = require("react");
var classNames = require("classnames");


var ListItem = React.createClass({displayName: "ListItem",
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
				React.createElement("tr", {className: classNames(this.props.className)}, 
					React.createElement("td", React.__spread({},  bulletItemAttrs), this.props.bullet), 
					React.createElement("td", React.__spread({},  itemAttrs), this.props.children)
				)
			);
		} else {
			return (
				React.createElement("tr", null, 
					React.createElement("td", React.__spread({},  itemAttrs), this.props.children)
				)
			);
		}
	}
	// Private API
	// Public API
});

module.exports = ListItem;
