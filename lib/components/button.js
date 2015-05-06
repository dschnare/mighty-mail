"use strict";


/*eslint no-unused-vars: 0, quotes: 0*/


var React = require("react");
var classNames = require("classnames");
var RawHtml = require("./RawHtml");
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
		var vmlRectBegin = this.getVmlRectBegin();
		var anchorProps = this.getAnchorProps();
		var children = [
			vmlRectBegin,
			React.createElement("a", React.__spread({key: "1"},  anchorProps), this.props.children)
		];

		return (
			React.createElement(RawHtml, {className: classNames("button", this.props.className)}, children)
		);
	},
	// Private API
	getVmlRectBegin: function () {
		var props = this.props;
		return [
			"<!--[if mso]>",
			'<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="%href%" style="height:%height%px;v-text-anchor:middle;width:%width%px;" arcsize="10%" fillcolor="%bgColor%">',
			"	<w:anchorlock/>",
			'	<center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:bold;">Show me the button!</center>',
			"</v:roundrect>",
			'<![endif]-->'
		].join("\n").replace(/%([^%]+)%/g, function (token, id) {
			return props[id];
		});
	},
	getAnchorProps: function () {
		var props = this.props;

		return {
			href: props.href,
			style: {
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
			}
		};
	}
	// Public API
});

module.exports = Button;
