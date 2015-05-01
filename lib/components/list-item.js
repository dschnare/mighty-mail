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
		if (this.props.bullet) {
			return (
				React.createElement("tr", {className: classNames(this.props.className)}, 
					React.createElement("td", {align: "left", valign: "top", className: classNames("list-bullet", this.props.className)}, this.props.bullet), 
					React.createElement("td", {align: "left", valign: "top", className: classNames("list-item", this.props.className)}, this.props.children)
				)
			);
		} else {
			return (
				React.createElement("tr", null, 
					React.createElement("td", {align: "left", valign: "top", className: classNames("list-item", this.props.className)}, this.props.children)
				)
			);
		}
	}
	// Private API
	// Public API
});

module.exports = ListItem;
