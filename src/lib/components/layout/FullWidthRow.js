"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Row = require("./Row");
var Container = require("./Container");
var mixin = require("../../util/mixin");
var defineTdProps = require("../../util/defineTdProps");
var pluckTdProps = require("../../util/pluckTdProps");


var FullWidthRow = React.createClass({
	// Component API
	propTypes: {
		width: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]),
		gutter: React.PropTypes.number,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string,
		wrapper: React.PropTypes.shape(defineTdProps()),
		rowWrapper: React.PropTypes.shape(defineTdProps())
	},
	getDefaultProps: function () {
		return {
			wrapper: {
				align: "center",
				valign: "top"
			}
		};
	},
	render: function () {
		var containerProps = this.getContainerProps();
		var rowProps = this.getRowProps();

		return (
			<Container {...containerProps}>
				<Row {...rowProps}>
					{this.props.children}
				</Row>
			</Container>
		);
	},
	// Private API
	getContainerProps: function () {
		return {
			cssPrefix: "full-width-row",
			bgColor: this.props.bgColor,
			className: this.props.className,
			width: "100%",
			align: "center",
			wrapper: pluckTdProps(mixin({}, FullWidthRow.defaultProps.wrapper, this.props.wrapper || {}))
		};
	},
	getRowProps: function () {
		return {
			width: this.props.width,
			gutter: this.props.gutter,
			wrapper: pluckTdProps(this.props.rowWrapper)
		};
	}
	// Public API
});

module.exports = FullWidthRow;
