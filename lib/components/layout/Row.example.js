var React = require("react");
var Row = require("./Row");
var Col = require("./Col");

/*eslint no-unused-vars: 0*/

module.exports = (
	React.createElement(Row, {width: 600, gutter: 10}, 
		React.createElement(Col, {wrapper: {align: "center"}}, "One"), 
		React.createElement(Col, {wrapper: {align: "center"}}, "Two")
	)
);
