var React = require("react");
var MediaObject = require("./MediaObject");
var Col = require("./layout/Col");

/*eslint no-unused-vars: 0*/

module.exports = (
	<MediaObject width={500}>
		<Col width={300} wrapper={{className: "text-large"}}><img src="images/offer.jpg" /></Col>
		<Col align="right">This is the block of copy.</Col>
	</MediaObject>
);
