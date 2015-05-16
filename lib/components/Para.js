"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./layout/Container");
var classNames = require("classnames");
var defineTdProps = require("../util/defineTdProps");
var pluckTdProps = require("../util/pluckTdProps");


var Para = React.createClass({displayName: "Para",
	// Component API
	propTypes: {
		className: React.PropTypes.string,
		wrapper: React.PropTypes.shape(defineTdProps())
	},
	getDefaultProps: function () {
		return {
			wrapper: {
				align: "left",
				valign: "top"
			}
		};
	},
	render: function () {
		var tdProps = this.getTdProps();

		return (
			React.createElement("tr", {className: classNames("para", this.props.className)}, 
				React.createElement("td", React.__spread({},  tdProps), this.props.children)
			)
		);
	},
	// Private API
	getTdProps: function () {
		var tdProps = pluckTdProps(this.props.wrapper || {});

		tdProps.className = classNames("para-wrapper", tdProps.className);

		return tdProps;
	}
	// Public API
});

module.exports = Para;
