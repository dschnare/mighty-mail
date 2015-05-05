"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./layout/Container");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var Paragraph = React.createClass({
	// Component API
	propTypes: {
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		width: numberOrStringType,
		height: numberOrStringType,
		align: React.PropTypes.oneOf(["left", "center", "right"]),
		wrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			style: React.PropTypes.object,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		})
	},
	getDefaultProps: function () {
		return {
			align: "left",
			wrapper: {
				align: "left"
			}
		};
	},
	render: function () {
		var containerProps = this.getContainerProps();

		return (
			<Container {...containerProps}>
				{this.props.children}
			</Container>
		);
	},
	// Private API
	getContainerProps: function () {
		return {
			cssPrefix: "paragraph",
			className: this.props.className,
			style: this.props.style,
			wrapper: this.props.wrapper,
			width: this.props.width,
			height: this.props.height
		};
	}
	// Public API
});

module.exports = Paragraph;
