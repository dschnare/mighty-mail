"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var RawHtml = require("./RawHtml");
var Container = require("./layout/Container");
var classNames = require("classnames");
var defineTdProps = require("../util/defineTdProps");
var pluckTdProps = require("../util/pluckTdProps");
var mixin = require("../util/mixin");


var Para = React.createClass({displayName: "Para",
	// Component API
	propTypes: {
		className: React.PropTypes.string,
		wrapper: React.PropTypes.shape(defineTdProps())
	},
	getDefaultProps: function () {
		return {
			wrapper: {
				valign: "top",
				align: "left"
			}
		};
	},
	render: function () {
		var tdProps = this.getTdProps();

		return (
			React.createElement("tr", {className: classNames("para", this.props.className)}, 
				React.createElement(RawHtml, React.__spread({wrapper: "td"},  tdProps), this.props.children)
			)
		);
	},
	// Private API
	getTdProps: function () {
		var tdProps = pluckTdProps(mixin({}, Para.defaultProps.wrapper, this.props.wrapper || {}));

		tdProps.className = classNames("para__wrapper", tdProps.className);

		return tdProps;
	}
	// Public API
});

module.exports = Para;
