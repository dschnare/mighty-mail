"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var mighty = require("../../index");
var {Frame, Row, Col, List, ListItem, BulletList} = mighty;


module.exports.render = function () {
	var markup = React.renderToStaticMarkup(

		<Frame>
			<Row width={500} gutter={10}>
				<Col>
					<List>
						<ListItem>Item 1</ListItem>
						<ListItem>Item 2</ListItem>
						<ListItem>Item 3</ListItem>
						<ListItem>Item 4</ListItem>
					</List>
				</Col>
				<Col>
					<BulletList>
						<ListItem>Item 1</ListItem>
						<ListItem>Item 2</ListItem>
						<ListItem>Item 3</ListItem>
						<ListItem>Item 4</ListItem>
					</BulletList>
				</Col>
			</Row>

			<Divider color="#ff0000" />

		</Frame>

	);

	return markup;
};
