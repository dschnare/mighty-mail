"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./layout/Container");


var Paragraph = React.createClass({displayName: "Paragraph",
	// Component API
	propTypes: {
		className: React.PropTypes.string,
		style: React.PropTypes.object
	},
	render: function () {
		var containerProps = this.getContainerProps();

		return (
			React.createElement(Container, React.__spread({},  containerProps), 
				this.props.children
			)
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
