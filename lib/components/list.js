"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var classNames = require("classnames");
var Table = require("./layout/Table");
var applyChildMask = require("../util/applyChildMask");
var defineTableProps = require("../util/defineTableProps");
var pluckTableProps = require("../util/pluckTableProps");
var mixin = require("../util/mixin");
var entities = require("../util/entities");


var ORDERED = "__ORDERED_LIST_STYLE__";

var List = React.createClass({displayName: "List",
	// Component API
	propTypes: mixin({
		bullet: React.PropTypes.string.isRequired,
		bulletSuffix: React.PropTypes.string
	}, defineTableProps()),
	getDefaultProps: function () {
		return {
			bullet: entities.BULL,
			bulletSuffix: ""
		};
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

		tableProps.className = classNames("list", this.props.bullet === ORDERED ? "list--ordered" : false, tableProps.className);

		return tableProps;
	},
	getListItems: function () {
		var listItems = applyChildMask({ ListItem: true }, this.props.children);
		var count = listItems.length;
		var bullet = this.props.bullet || entities.BULL;
		var bulletSuffix = this.props.bulletSuffix || "";

		return listItems.map(function (child, i) {
			var firstChildClassName = i === 0 ? "first-child" : "";
			var lastChildClassName = i === count - 1 ? "last-child" : "";
			var bull = bullet.toString() + bulletSuffix;

			if (bullet === ORDERED) {
				bull = (i + 1).toString() + bulletSuffix;
			}

			return React.cloneElement(child, {
				key: i,
				bullet: bull,
				className: classNames(child.props.className, firstChildClassName, lastChildClassName)
			});
		});
	}
	// Public API
});

List.ORDERED = ORDERED;
// Kept for backward compatability.
List.NUMERIC = ORDERED;

module.exports = List;
