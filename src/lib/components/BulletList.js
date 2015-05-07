"use strict";

/*eslint no-unused-vars: 0*/

var React = require("react");
var List = require("./List");
var classNames = require("classnames");
var applyChildMask = require("../util/applyChildMask");
var pluckTableProps = require("../util/pluckTableProps");
var entities = require("../util/entities");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var BulletList = React.createClass({
	// Component API
	propTypes: {
		bullet: React.PropTypes.string,
		cellSpacing: numberOrStringType,
		cellPadding: numberOrStringType,
		border: numberOrStringType,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		width: numberOrStringType,
		align: React.PropTypes.oneOf(["left", "center", "right"])
	},
	getDefaultProps: function () {
		return {
			bullet: entities.BULL
		};
	},
	render: function () {
		var listProps = this.getListProps();
		var listItems = this.getListItems();

		return (
			<List {...listProps}>
				{listItems}
			</List>
		);
	},
	// Private API
	getListProps: function () {
		return pluckTableProps(this.props);
	},
	getListItems: function () {
		var bullet = this.props.bullet;
		var listItems = applyChildMask({ ListItem: true }, this.props.children);

		return listItems.map(function (li, i) {
			return React.cloneElement(li, { bullet: bullet, key: i });
		});
	}
	// Public API
});

module.exports = BulletList;
