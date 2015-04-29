"use strict";

/*eslint no-unused-vars: 0*/

var React = require("react");
var List = require("./list");
var classNames = require("classnames");
var applyChildMask = require("../util/apply-child-mask");


var BulletList = React.createClass({
	// Component API
	propTypes: {
		bullet: React.PropTypes.string,
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
			<List className={this.props.className}>
				{listItems}
			</List>
		);
	}
	// Private API
	// Public API
});

module.exports = BulletList;
