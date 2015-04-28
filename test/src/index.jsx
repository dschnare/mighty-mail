"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var mighty = require("../../index");
var {Frame, Row, Col} = mighty;


module.exports.render = function () {
	var markup = React.renderToStaticMarkup(

		<Frame>
			<Row width={500} cols={3} gutter={5}>
				<Col>One</Col>
				<Col>Two</Col>
				<Col>
					Three
				</Col>
			</Row>
		</Frame>

	);

	return markup;
};
