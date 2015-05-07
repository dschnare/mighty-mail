"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./layout/Container");
var classNames = require("classnames");
var pluckTdProps = require("../util/pluckTdProps");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var Paragraph = React.createClass({
	// Component API
	propTypes: {
		background: React.PropTypes.string,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		width: numberOrStringType,
		height: numberOrStringType,
		align: React.PropTypes.oneOf(["left", "center", "right"]),
		valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
	},
	getDefaultProps: function () {
		return {
			align: "left"
		};
	},
	render: function () {
		var tdProps = this.getTdProps();

		return (
			<tr>
				<td {...tdProps}>{this.props.children}</td>
			</tr>
		);
	},
	// Private API
	getTdProps: function () {
		var tdProps = pluckTdProps(this.props);

		tdProps.className = classNames("paragraph", tdProps.className);

		return tdProps;
	}
	// Public API
});

module.exports = Paragraph;
