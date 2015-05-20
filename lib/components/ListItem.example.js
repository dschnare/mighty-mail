var React = require("react");
var List = require("./List");
var ListItem = require("./ListItem");

/*eslint no-unused-vars: 0*/

module.exports = (
	React.createElement(List, null, 
		React.createElement(ListItem, {itemWrapper: {className: "text-large"}}, "Item ", React.createElement("strong", null, "one"), "."), 
		React.createElement(ListItem, null, "Item two.")
	)
);
