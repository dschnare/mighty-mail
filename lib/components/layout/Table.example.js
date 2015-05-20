var React = require("react");
var Table = require("./Table");

/*eslint no-unused-vars: 0*/

module.exports = (
	React.createElement(Table, null, 
		React.createElement("tbody", null, 
			React.createElement("tr", null, 
				React.createElement("td", null, "Col 1"), 
				React.createElement("td", null, "Col 2")
			)
		)
	)
);
