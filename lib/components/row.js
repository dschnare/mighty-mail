"use strict";


/*eslint no-unused-vars: 0, quotes: 0*/


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
		width: React.PropTypes.number.isRequired,
		gutter: React.PropTypes.number,
		bgColor: React.PropTypes.string,
		classNames: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.shape({
				wrapper: React.PropTypes.string,
				cell: React.PropTypes.string
			})
		])
	},
	getDefaultProps: function () {
		return {
			classNames: {}
		};
	},
	render: function () {
		var wrapperClassName = classNames("row", this.props.classNames.wrapper || this.props.classNames);
		var cellClassName = classNames("row-cell", this.props.classNames.cell);

		var cols = applyChildMask({ Col: true }, this.props.children);
		var colCount = getColCount(cols);
		var rowWidth = this.props.width;
		var gutter = this.props.gutter;
		var colWidth = (rowWidth - (gutter * (colCount - 1))) / colCount;
		var children = this.transformCols(cols, colCount, colWidth, rowWidth, gutter);

		var wrapperAttrs = {
			cellSpacing: 0,
			cellPadding: 0,
			border: 0,
			align: "center",
			bgColor: this.props.bgColor,
			width: this.props.width,
			className: wrapperClassName
		};

		var cellAttrs = {
			align: "center",
			valign: "top",
			width: wrapperAttrs.width,
			className: cellClassName
		};

		return (
			React.createElement("table", React.__spread({},  wrapperAttrs), 
				React.createElement("tbody", null, 
					React.createElement("tr", null, 
						React.createElement(RawHtml, React.__spread({wrapper: "td"},  cellAttrs), children)
					)
				)
			)
		);
	},
	// Private API
	transformCols: function (cols, colCount, colWidth, rowWidth, gutter) {
		var newChildren = [];
		var space = rowWidth;

		cols.forEach(function (col, i) {
			var span = col.props.span;
			var isLast = i === colCount - 1;
			var padding = i === 0 ? 0 : gutter;
			var w = Math.ceil(colWidth) * span + padding * Math.max(1, span - 1);
			var props = {
				key: i
			};

			if (colCount === 0) {
				padding = 0;
				w = colWidth;
			}

			// If the gutter is specified then we calculate
			// the width of each column otherwise the width
			// of each column is expected to be set already.

			if (!isNaN(gutter)) {
				if (w > space) {
					w = space;
					space -= w;
				} else {
					space -= w;
				}

				props.gutter = padding;
				props.width = w;
			}

			newChildren.push(React.cloneElement(col, props));

			if (!isLast) {
				newChildren.push('<!--[if mso]></td><td align="center" valign="top"><![endif]-->');
			}
		});

		return newChildren;
	}
	// Public API
});

module.exports = Row;
