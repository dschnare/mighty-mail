"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var defineTableProps = require("../../util/defineTableProps");
var pluckTableProps = require("../../util/pluckTableProps");


var Table = React.createClass({
	// Component API
	propTypes: defineTableProps(),
	getDefaultProps: function () {
		return {
			cellSpacing: 0,
			cellPadding: 0,
			border: 0,
			align: "left"
		};
	},
	render: function () {
		var tableProps = this.getTableProps();

		return (
			<table {...tableProps}>
				{this.props.children}
			</table>
		);
	},
	// Private API
	getTableProps: function () {
		return pluckTableProps(this.props);
	}
	// Public API
});

module.exports = Table;
