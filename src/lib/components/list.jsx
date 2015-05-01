"use strict";


var React = require("react");
var classNames = require("classnames");
var applyChildMask = require("../util/apply-child-mask");


var List = React.createClass({
	// Component API
	propTypes: {
		className: React.PropTypes.string
	},
	render: function () {
		var listItems = applyChildMask({ ListItem: true }, this.props.children);
		var count = listItems.length;

		listItems = listItems.map(function (child, i) {
			var firstChildClassName = i === 0 ? "first-child" : "";
			var lastChildClassName = i === count - 1 ? "last-child" : "";

			return React.cloneElement(child, {
				key: i,
				classNames: classNames(child.props.className, firstChildClassName, lastChildClassName)
			});
		});

		var tableAttrs = {
			cellSpacing: 0,
			cellPadding: 0,
			border: 0,
			className: classNames("list", this.props.className)
		};

		return (
			<table {...tableAttrs}>
				<tbody>
					{listItems}
				</tbody>
			</table>
		);
	}
	// Private API
	// Public API
});

module.exports = List;
