"use strict";


var React = require("react");
var classNames = require("classnames");

var ListItem = React.createClass({displayName: "ListItem",
	// Component API
	propTypes: {
		bullet: React.PropTypes.string,
		padding: React.PropTypes.number,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			padding: 20
		};
	},
	render: function () {
		var padding = {};

		if (this.props.padding && this.props.padding > 0 && !isNaN(this.props.padding)) {
			padding.paddingLeft = this.props.padding;
		}

		if (this.props.bullet) {
			return (
				React.createElement("tr", null, 
					React.createElement("td", {align: "left", className: classNames("list-bullet", this.props.className), style: padding}, this.props.bullet), 
					React.createElement("td", {align: "left", className: classNames("list-item", this.props.className), style: padding}, this.props.children)
				)
			);
		} else {
			return (
				React.createElement("tr", null, 
					React.createElement("td", {align: "left", className: classNames("list-item", this.props.className), style: padding}, this.props.children)
				)
			);
		}
	}
	// Private API
	// Public API
});

module.exports = ListItem;
