"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Row = require("./Row");
var Container = require("./Container");


var FullWidthRow = React.createClass({displayName: "FullWidthRow",
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
			React.createElement(Container, React.__spread({},  containerProps), 
				React.createElement(Row, React.__spread({},  rowProps), 
					this.props.children
				)
			)
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
			wrapper: this.props.wrapper
		};
	}
	// Public API
});

module.exports = FullWidthRow;
