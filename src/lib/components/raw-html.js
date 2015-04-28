"use strict";


var React = require("react");


var RawHtml = React.createClass({
	propTypes: {
		wrapper: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			wrapper: "div"
		};
	},
	render: function () {
		var html = "";
		React.Children.forEach(this.props.children, function (child) {
			if (typeof child === "string") {
				html += child;
			} else {
				html += React.renderToStaticMarkup(child);
			}
		});

		var props = {};
		for (var k in this.props) {
			if (k !== "wrapper" && k !== "children") {
				props[k] = this.props[k];
			}
		}
		props.dangerouslySetInnerHTML = {__html: html};

		return React.createElement(this.props.wrapper, props);
	}
});

module.exports = RawHtml;
