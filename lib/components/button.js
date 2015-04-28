"use strict";


/*eslint no-unused-vars: 0, quotes: 0*/


var React = require("react");
var classNames = require("classnames");
var RawHtml = require("./raw-html");
var px = require("../util/px");


var Button = React.createClass({displayName: "Button",
	// Component API
	propTypes: {
		href: React.PropTypes.string,
		textColor: React.PropTypes.string,
		fontSize: React.PropTypes.number,
		width: React.PropTypes.number,
		height: React.PropTypes.number,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string,
		borderRadius: React.PropTypes.number
	},
	getDefaultProps: function () {
		return {
			href: "http://replaceme.com/",
			textColor: "#ffffff",
			bgColor: "#000000",
			fontSize: 13,
			width: 200,
			height: 40,
			borderRadius: 0
		};
	},
	render: function () {
		var props = this.props;
		var vmlRectBegin = [
			"<!--[if mso]>",
				'<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="%href%" style="height:%height%px;v-text-anchor:middle;width:%width%px;" stroke="f" fillcolor="%bgColor%">',
					"<w:anchorlock/>",
					"<center>",
			"<![endif]-->"
		].join("\n").replace(/%([^%]+)%/g, function (token, id) {
			return props[id];
		});

		var vmlRectEnd = [
			"<!--[if mso]>",
					"</center>",
				"</v:roundrect>",
			"<![endif]-->"
		].join("\n");

		var style = {
				backgroundColor: props.bgColor,
				color: props.textColor,
				display: "inline-block",
				fontFamily: "sans-serif",
				fontSize: px(props.fontSize),
				fontWeight: "bold",
				lineHeight: px(props.height),
				textAlign: "center",
				textDecoration: "none",
				width: px(props.width),
				borderRadius: props.borderRadius,
				WebkitTextSizeAdjust: "none"
		};

		return (
			React.createElement("div", null, 
				React.createElement(RawHtml, null, vmlRectBegin), 
				React.createElement("a", {href: props.href, className: classNames(this.props.className), style: style}, this.props.children), 
				React.createElement(RawHtml, null, vmlRectEnd)
			)
		);
	}
	// Private API
	// Public API
});

module.exports = Button;
