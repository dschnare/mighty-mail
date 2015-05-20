"use strict";


var React = require("react");
var List = require("./List");


var OrderedList = React.createClass({
	render: function () {
		return (
			<List {...this.props} bullet={List.ORDERED}>
				{this.props.children}
			</List>
		);
	}
});

module.exports = OrderedList;
