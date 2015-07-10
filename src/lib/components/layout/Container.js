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


var Container = React.createClass({
	// Component API
	propTypes: mixin({
		cssPrefix: React.PropTypes.string.isRequired,
		wrapper: React.PropTypes.shape(defineTdProps())
	}, defineTableProps()),
	getDefaultProps: function () {
		return {
			cssPrefix: "container",
			cellSpacing: 0,
			cellPadding: 0,
			border: 0,
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
			tdProps.className = classNames(this.props.cssPrefix + "__wrapper", tdProps.className);
		} else {
			delete tableProps.className;
			delete tdProps.className;
		}

		return (
			<table {...tableProps}>
				<tbody>
					<tr>
						<RawHtml wrapper="td" {...tdProps}>{content}</RawHtml>
					</tr>
				</tbody>
			</table>
		);
	},
	// Private API
	getTableProps: function () {
		return pluckTableProps(this.props);
	}
	// Public API
});

module.exports = Container;
