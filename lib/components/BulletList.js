"use strict";

/*eslint no-unused-vars: 0*/

var React = require("react");
var List = require("./List");
var classNames = require("classnames");
var applyChildMask = require("../util/apply-child-mask");


var BulletList = React.createClass({displayName: "BulletList",
	// Component API
	propTypes: {
		bullet: React.PropTypes.string,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			bullet: "\u2022"
		};
	},
	render: function () {
		var listItems = this.getListItems();

		return (
			React.createElement(List, {className: this.props.className}, 
				listItems
			)
		);
	},
	// Private API
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
