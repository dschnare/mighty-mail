"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var classNames = require("classnames");
var Table = require("./layout/Table");
var applyChildMask = require("../util/applyChildMask");
var pluckTableProps = require("../util/pluckTableProps");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var List = React.createClass({displayName: "List",
	// Component API
	propTypes: {
		cellSpacing: numberOrStringType,
		cellPadding: numberOrStringType,
		border: numberOrStringType,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		width: numberOrStringType,
		align: React.PropTypes.oneOf(["left", "center", "right"])
	},
	render: function () {
		var tableProps = this.getTableProps();
		var listItems = this.getListItems();

		return (
			React.createElement(Table, React.__spread({},  tableProps), 
				React.createElement("tbody", null, 
					listItems
				)
			)
		);
	},
	// Private API
	getTableProps: function () {
		var tableProps = pluckTableProps(this.props);

		tableProps = classNames("list", tableProps.className);

		return tableProps;
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
