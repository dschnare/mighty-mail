"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Row = require("./Row");
var Container = require("./Container");
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
		wrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			style: React.PropTypes.object,
			bgColor: React.PropTypes.string,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		})
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
			wrapper: {
				align: "center",
				valign: "top"
			}
		};
	},
	getRowProps: function () {
		return {
			width: this.props.width,
			gutter: this.props.gutter,
			wrapper: pluckTdProps(this.props.wrapper)
		};
	}
	// Public API
});

module.exports = FullWidthRow;
