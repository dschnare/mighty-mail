var React = require("react");
var Row = require("./Row");
var Col = require("./Col");

/*eslint no-unused-vars: 0*/

module.exports = (
	<Row width={600} gutter={10}>
		<Col wrapper={{align: "center"}}>One</Col>
		<Col wrapper={{align: "center"}}>Two</Col>
	</Row>
);
