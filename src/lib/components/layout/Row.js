"use strict";


/*eslint no-unused-vars: 0, quotes: 0*/


var React = require("react");
var Container = require("./Container");
var pluckTableProps = require("../../util/pluckTableProps");
var pluckTdProps = require("../../util/pluckTdProps");
var mixin = require("../../util/mixin");
var applyChildMask = require("../../util/applyChildMask");


function getColCount(cols) {
	var count = 0;
	cols.forEach(function (col) {
		count += col.props.span;
	});
	return count;
}

var Row = React.createClass({
	// Component API
	propTypes: {
		width: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]),
		gutter: React.PropTypes.number,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string,
		wrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			style: React.PropTypes.object,
			bgColor: React.PropTypes.string,
			width: React.PropTypes.number,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		})
	},
	getDefaultProps: function () {
		return {
			width: "100%",
			wrapper: {}
		};
	},
	render: function () {
		var containerProps = this.getContainerProps();
		var cols = applyChildMask({ Col: true }, this.props.children);
		var rowWidth = this.props.width;
		var gutter = this.props.gutter;
		var children;

		if (rowWidth === "100%" || typeof rowWidth !== "number" || typeof gutter !== "number") {
			children = this.transformColsForOutlook(cols);
		} else {
			children = this.transformColsForOutlook(this.distributeCols(cols, rowWidth, gutter));
		}

		return (
			<Container {...containerProps}>
				{children}
			</Container>
		);
	},
	// Private API
	getContainerProps: function () {
		var containerProps = pluckTableProps(this.props);

		containerProps.cssPrefix = "row";
		containerProps.align = "center";

		containerProps.wrapper = pluckTdProps(mixin({}, this.props.wrapper || {}, {
			align: "center",
			valign: "top"
		}));

		return containerProps;
	},
	transformColsForOutlook: function (cols) {
		var children = [];
		var containerProps = this.getContainerProps();
		var outlookConditionalTd = '<!--[if mso]></td><td align="%align%" valign="%valign%"><![endif]-->';

		outlookConditionalTd = outlookConditionalTd.replace("%align%", containerProps.wrapper.align);
		outlookConditionalTd = outlookConditionalTd.replace("%valign%", containerProps.wrapper.valign);

		cols.forEach(function (col, i) {
			if (i > 0) {
				children.push(outlookConditionalTd);
			}

			children.push(col);
		});

		return children;
	},
	distributeCols: function (cols, rowWidth, gutter) {
		var colCount = getColCount(cols);
		var colWidth = (rowWidth - (gutter * (colCount - 1))) / colCount;
		var spaceRemaining = rowWidth;

		return cols.map(function (col, i) {
			var span = col.props.span;
			var padding = i === 0 ? 0 : gutter;
			var w = Math.ceil(colWidth) * span + padding * Math.max(1, span - 1);
			var props = { key: i };

			if (colCount === 0) {
				padding = 0;
				w = colWidth;
			}

			// If the gutter is specified then we calculate
			// the width of each column otherwise the width
			// of each column is expected to be set already.

			if (!isNaN(gutter)) {
				if (w > spaceRemaining) {
					w = spaceRemaining;
				}

				spaceRemaining -= w;
				props.gutter = padding;
				props.width = w;
			}

			return React.cloneElement(col, props);
		});
	}
	// Public API
});

module.exports = Row;
