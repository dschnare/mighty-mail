"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var pluckTableProps = require("../../util/pluckTableProps");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var Table = React.createClass({displayName: "Table",
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
			React.createElement("table", React.__spread({},  tableProps), 
				this.props.children
			)
		);
	},
	// Private API
	getTableProps: function () {
		return pluckTableProps(this.props);
	}
	// Public API
});

module.exports = Table;
