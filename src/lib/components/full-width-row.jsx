"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Row = require("./row");
var Frame = require("./frame");


var FullWidthRow = React.createClass({
	// Component API
	propTypes: {
		gutter: React.PropTypes.number,
		width: React.PropTypes.number.isRequired,
		cols: React.PropTypes.number.isRequired,
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			gutter: 0
		};
	},
	render: function () {
		return (
			<Frame bgColor={this.props.bgColor}>
				<Row {...this.props}>
					{this.props.children}
				</Row>
			</Frame>
		);
	}
	// Private API
	// Public API
});

module.exports = FullWidthRow;
