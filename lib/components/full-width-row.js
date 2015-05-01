"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Row = require("./row");
var Frame = require("./frame");


var propertyMap = {
	gutter: "gutter",
	width: "width",
	rowBgColor: "bgColor",
	classNames: "classNames"
};

function mapKeys(o, mapping) {
	var obj = {};

	for (var k in o) {
		if (o.hasOwnProperty(k) && mapping[k]) {
			obj[mapping[k]] = o[k];
		}
	}

	return obj;
}

var FullWidthRow = React.createClass({displayName: "FullWidthRow",
	// Component API
	propTypes: {
		gutter: React.PropTypes.number,
		width: React.PropTypes.number.isRequired,
		bgColor: React.PropTypes.string,
		rowBgColor: React.PropTypes.string,
		classNames: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.shape({
				wrapper: React.PropTypes.string,
				cell: React.PropTypes.string
			})
		])
	},
	render: function () {
		var rowProps = mapKeys(this.props, propertyMap);

		return (
			React.createElement(Frame, {bgColor: this.props.bgColor}, 
				React.createElement(Row, React.__spread({},  rowProps), 
					this.props.children
				)
			)
		);
	}
	// Private API
	// Public API
});

module.exports = FullWidthRow;
