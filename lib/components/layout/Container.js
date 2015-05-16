"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var classNames = require("classnames");
var RawHtml = require("../RawHtml");
var defineTableProps = require("../../util/defineTableProps");
var defineTdProps = require("../../util/defineTdProps");
var pluckTableProps = require("../../util/pluckTableProps");
var pluckTdProps = require("../../util/pluckTdProps");
var entities = require("../../util/entities");
var mixin = require("../../util/mixin");


var Container = React.createClass({displayName: "Container",
	// Component API
	propTypes: mixin({
		cssPrefix: React.PropTypes.string,
		wrapper: React.PropTypes.shape(defineTdProps())
	}, defineTableProps()),
	getDefaultProps: function () {
		return {
			cssPrefix: "container",
			cellSpacing: 0,
			cellPadding: 0,
			border: 0,
			align: "left",
			wrapper: {
				align: "left",
				valign: "top"
			}
		};
	},
	render: function () {
		var tableProps = this.getTableProps();
		var tdProps = pluckTdProps(this.props.wrapper || {});
		var content = React.Children.count(this.props.children) === 0 ? entities.NBSP : this.props.children;

		if (this.props.cssPrefix) {
			tableProps.className = classNames(this.props.cssPrefix, tableProps.className);
			tdProps.className = classNames(this.props.cssPrefix + "-wrapper", tdProps.className);
		} else {
			delete tableProps.className;
			delete tdProps.className;
		}

		return (
			React.createElement("table", React.__spread({},  tableProps), 
				React.createElement("tbody", null, 
					React.createElement("tr", null, 
						React.createElement(RawHtml, React.__spread({wrapper: "td"},  tdProps), content)
					)
				)
			)
		);
	},
	// Private API
	getTableProps: function () {
		return pluckTableProps(this.props);
	}
	// Public API
});

module.exports = Container;
