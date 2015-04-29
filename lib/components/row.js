"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var classNames = require("classnames");
var RawHtml = require("./raw-html");
var width = require("../util/width");
var applyChildMask = require("../util/apply-child-mask");


function getColCount(cols) {
	var count = 0;
	cols.forEach(function (col) {
		count += col.props.span;
	});
	return count;
}

var Row = React.createClass({displayName: "Row",
	// Component API
	propTypes: {
		gutter: React.PropTypes.number,
		width: React.PropTypes.number.isRequired,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			gutter: 0
		};
	},
	render: function () {
		var cols = applyChildMask({ Col: true }, this.props.children);
		var colCount = getColCount(cols);
		var rowWidth = this.props.width;
		var gutter = this.props.gutter;
		var colWidth = (rowWidth - (gutter * (colCount - 1))) / colCount;

		console.log(colCount, cols.length);

		var children = [];
		var space = rowWidth;
		cols.forEach(function (col, i) {
			var span = col.props.span;
			var isLast = i === colCount - 1;
			var padding = isLast ? 0 : gutter;
			var w = Math.ceil(colWidth) * span + padding * Math.max(1, span - 1);
			var props = {
				key: i
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

			children.push(React.cloneElement(col, props));

			if (!isLast) {
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
