var React = require("react");
var List = require("./List");
var ListItem = require("./ListItem");

/*eslint no-unused-vars: 0*/

module.exports = (
	<List>
		<ListItem itemWrapper={{className: "text-large"}}>Item <strong>one</strong>.</ListItem>
		<ListItem>Item two.</ListItem>
	</List>
);
