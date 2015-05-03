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
		style: React.PropTypes.object
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
			style: this.props.style
		};
	}
	// Public API
});

module.exports = Paragraph;
