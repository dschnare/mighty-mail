"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var classNames = require("classnames");
var RawHtml = require("./raw-html");
var width = require("../util/width");


var Row = React.createClass({displayName: "Row",
	// Component API
	propTypes: {
		gutter: React.PropTypes.number,
		width: React.PropTypes.number.isRequired,
		cols: React.PropTypes.number.isRequired,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			gutter: 0
		};
	},
	render: function () {
		var cols = this.props.cols;
		var rowWidth = this.props.width;
		var gutter = this.props.gutter;
		var colWidth = (rowWidth - (gutter * (cols - 1))) / cols;

		var i = 0;
		var children = [];
		var space = rowWidth;
		React.Children.forEach(this.props.children, function (child) {
			var span = child.props.span;
			var k = i; i += 1;
			var padding = k < (cols - 1) ? gutter : 0;
			var w = Math.ceil(colWidth) * span + padding * Math.max(1, span - 1);
			var props = {
				key: k
			};

			// If the gutter is specified then we calculate
			// the width of each column otherwise the width
			// of each column is expected to be set already.
			if (gutter) {
				if (w > space) {
					w = space;
					space -= w;
				} else {
					space -= w;
				}

				props.paddingRight = padding;
				props.width = w;
			}

			children.push(React.cloneElement(child, props));

			if (k < (cols - 1)) {
				children.push("<!--[if mso]></td><td><![endif]-->");
			}
		});

		return (
			React.createElement("table", {cellSpacing: "0", cellPadding: "0", border: "0", align: "center", bgColor: this.props.bgColor, width: width(this.props.width), className: classNames("row", this.props.className)}, 
				React.createElement("tbody", null, 
					React.createElement("tr", null, 
						React.createElement(RawHtml, {wrapper: "td", align: "center"}, children)
					)
				)
			)
		);
	}
	// Private API
	// Public API
});

module.exports = Row;
