"use strict";


/*eslint no-unused-vars: 0, quotes: 0*/


var React = require("react");
var classNames = require("classnames");
var RawHtml = require("./RawHtml");
var px = require("../util/px");


var Button = React.createClass({displayName: "Button",
	// Component API
	propTypes: {
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
		href: React.PropTypes.string,
		borderColor: React.PropTypes.string,
		textColor: React.PropTypes.string,
		fontSize: React.PropTypes.number,
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
		var vmlRectEnd = this.getVmlRectEnd();
		var anchorProps = this.getAnchorProps();
		var children = [
			vmlRectBegin,
			React.createElement("a", React.__spread({key: "1"},  anchorProps), this.props.children),
			vmlRectEnd
		];

		return (
			React.createElement(RawHtml, {className: classNames("button", this.props.className)}, children)
		);
	},
	// Private API
	getVmlRectBegin: function () {
		var props = this.props;
		var vml = "";
		var borderRadius = this.props.borderRadius;
		var height = this.props.height;
		var rect = typeof borderRadius === "number" && borderRadius > 0 ? "roundrect" : "rect";

		if (props.borderColor) {
			vml = [
				"<!--[if mso]>",
				'<v:%rect% xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="%href%" style="height:%height%px;v-text-anchor:middle;width:%width%px;" strokecolor="%borderColor%" %borderRadius% fillcolor="%bgColor%">',
				"	<w:anchorlock/>",
				'	<center style="color:%textColor%;font-family:sans-serif;font-size:%fontSize%px;font-weight:bold;">%text%</center>',
				"</v:%rect%>",
				"<![endif]-->"
			].join("\n");
		} else {
			vml = [
				"<!--[if mso]>",
				'<v:%rect% xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="%href%" style="height:%height%px;v-text-anchor:middle;width:%width%px;" stroke="f" %borderRadius% fillcolor="%bgColor%">',
				"	<w:anchorlock/>",
				"	<center>",
				"<![endif]-->"
			].join("\n");
		}

		return vml.replace(/%([^%]+)%/g, function (token, id) {
			switch (id) {
				case "text":
					return props.children;
				case "rect":
					return rect;
				case "borderRadius":
					return rect === "roundrect" ? 'arcsize="' + (Math.ceil(borderRadius / height) * 100) + '%"' : "";
			}
			return props[id];
		});
	},
	getVmlRectEnd: function () {
		var props = this.props;
		var borderRadius = this.props.borderRadius;
		var rect = typeof borderRadius === "number" && borderRadius > 0 ? "roundrect" : "rect";

		if (props.borderColor) {
			return "";
		} else {
			return [
				"<!--[if mso]>",
				"	</center>",
				"</v:%rect%>",
				"<![endif]-->"
			].join("\n").replace(/%([^%]+)%/g, function (token, id) {
				switch (id) {
					case "rect":
						return rect;
				}
				return props[id];
			});
		}
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
