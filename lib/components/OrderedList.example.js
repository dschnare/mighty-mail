var React = require("react");
var OrderedList = require("./OrderedList");
var ListItem = require("./ListItem");

/*eslint no-unused-vars: 0*/

module.exports = (
	React.createElement(OrderedList, null, 
		React.createElement(ListItem, null, "Item ", React.createElement("strong", null, "one"), "."), 
		React.createElement(ListItem, null, "Item two.")
	)
);
