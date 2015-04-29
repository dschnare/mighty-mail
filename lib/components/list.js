"use strict";


var React = require("react");
var classNames = require("classnames");
var applyChildMask = require("../util/apply-child-mask");


var List = React.createClass({displayName: "List",
	// Component API
	propTypes: {
		padding: React.PropTypes.number,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			padding: 20
		};
	},
	render: function () {
		var listItems = applyChildMask({ ListItem: true }, this.props.children);
		var count = listItems.length;
		listItems = listItems.map(function (child, i) {
			var baselineClassName = i === count - 1 ? "" : "baseline-half";

			return React.cloneElement(child, {
				padding: child.props.padding || this.props.padding,
				classNames: classNames(child.props.className, baselineClassName),
				key: i
			});
		});

		return (
			React.createElement("table", {cellSpacing: "0", cellPadding: "0", border: "0", className: classNames("list", this.props.className)}, 
				React.createElement("tbody", null, 
					listItems
				)
			)
		);
	}
	// Private API
	// Public API
});

module.exports = List;
