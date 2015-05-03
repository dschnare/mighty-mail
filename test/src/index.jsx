"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var mighty = require("../../index");
var {Frame, Row, Col, List, ListItem, BulletList, Divider} = mighty;


module.exports.render = function () {
	var markup = React.renderToStaticMarkup(
			<Frame width={500}>
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

				<Row width={500}>
					<Col float="center">
						<Divider color="#ff0000" width={300} />
					</Col>
				</Row>
			</Frame>
	);

	return markup;
};
