"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var classNames = require("classnames");
var Table = require("./layout/Table");
var applyChildMask = require("../util/apply-child-mask");


var List = React.createClass({
	// Component API
	propTypes: {
		className: React.PropTypes.string
	},
	render: function () {
		var tableProps = this.getTableProps();
		var listItems = this.getListItems();

		return (
			<Table {...tableProps}>
				<tbody>
					{listItems}
				</tbody>
			</Table>
		);
	},
	// Private API
	getTableProps: function () {
		return {
			className: classNames("list", this.props.className)
		};
	},
	getListItems: function () {
		var listItems = applyChildMask({ ListItem: true }, this.props.children);
		var count = listItems.length;

		return listItems.map(function (child, i) {
			var firstChildClassName = i === 0 ? "first-child" : "";
			var lastChildClassName = i === count - 1 ? "last-child" : "";

			return React.cloneElement(child, {
				key: i,
				classNames: classNames(child.props.className, firstChildClassName, lastChildClassName)
			});
		});
	}
	// Public API
});

module.exports = List;
