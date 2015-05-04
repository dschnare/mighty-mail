"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./layout/Container");


var Paragraph = React.createClass({
	// Component API
	propTypes: {
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		wrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			style: React.PropTypes.object,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		})
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
			wrapper: this.props.wrapper
		};
	}
	// Public API
});

module.exports = Paragraph;
