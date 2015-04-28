"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var mighty = require("../../index");
var Frame = mighty.Frame;
var Row = mighty.Row;
var Col = mighty.Col;


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
