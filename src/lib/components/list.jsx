"use strict";


var React = require("react");
var classNames = require("classnames");
var applyChildMask = require("../util/apply-child-mask");


var List = React.createClass({
	// Component API
	propTypes: {
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
				classNames: classNames(child.props.className, baselineClassName),
				key: i
			});
		});

		return (
			<table cellSpacing="0" cellPadding="0" border="0" className={classNames("list", this.props.className)}>
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
