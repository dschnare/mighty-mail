"use strict";


var React = require("react");
var List = require("./List");


var OrderedList = React.createClass({displayName: "OrderedList",
	render: function () {
		return (
			React.createElement(List, {bullet: List.ORDERED}, 
				this.props.children
			)
		);
	}
});

module.exports = OrderedList;
