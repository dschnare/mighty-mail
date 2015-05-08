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

var Paragraph = React.createClass({displayName: "Paragraph",
	// Component API
	propTypes: {
		className: React.PropTypes.string,
		wrapper: React.PropTypes.shape({
			bgColor: React.PropTypes.string,
			style: React.PropTypes.object,
			width: numberOrStringType,
			height: numberOrStringType,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		})
	},
	getDefaultProps: function () {
		return {
			wrapper: {
				align: "left"
			}
		};
	},
	render: function () {
		var tdProps = this.getTdProps();

		return (
			React.createElement("tr", {className: classNames("paragraph", this.props.className)}, 
				React.createElement("td", React.__spread({},  tdProps), this.props.children)
			)
		);
	},
	// Private API
	getTdProps: function () {
		var tdProps = pluckTdProps(this.props.wrapper || {});

		tdProps.className = classNames("paragraph-wrapper", tdProps.className);

		return tdProps;
	}
	// Public API
});

module.exports = Paragraph;
