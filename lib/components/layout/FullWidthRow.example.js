var React = require("react");
var FullWidthRow = require("./FullWidthRow");
var Col = require("./Col");

/*eslint no-unused-vars: 0*/

module.exports = (
	React.createElement(FullWidthRow, {bgColor: "#eaeaea"}, 
		React.createElement(Col, null, "One"), 
		React.createElement(Col, null, "Two")
	)
);
