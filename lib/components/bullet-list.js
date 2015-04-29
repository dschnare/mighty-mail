"use strict";

/*eslint no-unused-vars: 0*/

var React = require("react");
var List = require("./list");
var classNames = require("classnames");
var applyChildMask = require("../util/apply-child-mask");


var BulletList = React.createClass({displayName: "BulletList",
	// Component API
	propTypes: {
		bullet: React.PropTypes.string,
		padding: React.PropTypes.number,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			bullet: "\u2022",
			padding: 20
		};
	},
	render: function () {
		var bullet = this.props.bullet;
		var listItems = applyChildMask({ ListItem: true }, this.props.children);
		listItems = listItems.map(function (li, i) {
			return React.cloneElement(li, { bullet: bullet, key: i });
		});

		return (
			React.createElement(List, {padding: this.props.padding, className: this.props.className}, 
				listItems
			)
		);
	}
	// Private API
	// Public API
});

module.exports = BulletList;
