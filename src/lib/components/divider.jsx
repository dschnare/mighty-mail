"use strict";


var React = require("react");
var classNames = require("classnames");
var width = require("../util/width");
var px = require("../util/px");


var Divider = React.createClass({
	// Component API
	propTypes: {
		width: React.PropTypes.number,
		thickness: React.PropTypes.number,
		color: React.PropTypes.string,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			width: 0,
			thickness: 1,
			color: "#eaeaea"
		};
	},
	render: function () {
		var thickness = this.props.thickness;
		var style = {
			borderBottom: "none",
			borderTop: px(thickness) + " solid " + this.props.color,
			color: this.props.color,
			margin: "0 auto"
		};

		return (
			<Row width={width(this.props.width)} className={classNames("divider", this.props.className)}>
				<Col align="center" float="center">
					<hr noshade="noshade" size={thickness} style={style} align="center" />
				</Col>
			</Row>
		);
	}
	// Private API
	// Public API
});

module.exports = Divider;
