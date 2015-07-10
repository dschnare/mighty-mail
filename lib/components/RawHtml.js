"use strict";


var React = require("react");
//escapeTextContentForBrowser
var mixin = require("../util/mixin");


var RawHtml = React.createClass({displayName: "RawHtml",
	propTypes: {
		wrapper: React.PropTypes.string.isRequired
	},
	getDefaultProps: function () {
		return {
			wrapper: "div"
		};
	},
	render: function () {
		var wrapperProps = this.getWrapperProps();
		return React.createElement(this.props.wrapper, wrapperProps);
	},
	// Private API
	getWrapperProps: function () {
		var props = mixin({}, this.props);

		delete props.children;
		delete props.wrapper;

		props.dangerouslySetInnerHTML = {
			__html: this.convertChildrenToHtml()
		};

		return props;
	},
	convertChildrenToHtml: function () {
		var html = "";

		React.Children.forEach(this.props.children, function (child) {
			if (typeof child === "string") {
				html += child;
			} else {
				html += React.renderToStaticMarkup(child);
			}
		});

		return html;
	}
});

module.exports = RawHtml;
