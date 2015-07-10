"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var mighty = require("../../index");
var {
		Frame, Row, Col, FullWidthRow, Table,
		List: Ul, OrderedList: Ol, ListItem: Li, Divider, Image, Hero,
		MediaObject, Para, ParaBlock, Button
} = mighty;

//"images/client-dashboard.jpg";//
var imgSrc = "http://arabic-media.com/articles/id/upload/life-on-earth-end-in-3-5bn-years.jpg";

Image.imageBasePath = "test";

module.exports.render = function () {
	var markup = React.renderToStaticMarkup(
			<Frame width={500} border="1" borderColor="#d7d7d7">
				<Hero background={imgSrc} width={308} height={220}>
					Yep I am a hero. {'&amp;'} <span>&amp;</span> <span>&</span>
					<Button><strong>Hello World!</strong></Button>
				</Hero>

				<Row width={500} gutter={10} wrapper={{valign: "middle"}}>
					<Col>
						<Ul>
							<Li>Item 1</Li>
							<Li>Item 2</Li>
							<Li>Item 3</Li>
							<Li>Item 4</Li>
						</Ul>
					</Col>
					<Col>
						Hello World!
					</Col>
					<Col>
						<Ol>
							<Li>Item 1</Li>
							<Li>Item 2</Li>
							<Li>Item 3</Li>
							<Li>Item 4</Li>
						</Ol>
					</Col>
				</Row>

				<Row width={500}>
					<Col align="center">
						<Divider color="#ff0000" width={300} />
					</Col>
				</Row>

				<Row>
					<Col align="center">
						<Image src={imgSrc} width="308" height="220" />
					</Col>
				</Row>

				<Row>
					<Col align="center">
						<MediaObject width={400}>
							<Col width={200}><Image src={imgSrc} width="190" /></Col>
							<Col align="right" width="200">
								<strong>Boom</strong><br/>
								Hello World!
							</Col>
						</MediaObject>
					</Col>
				</Row>

				<Row>
					<Col align="center">
						<MediaObject width={300}>
							<Col align="right" width={200}><Image src={imgSrc} width="140" /></Col>
							<Col width="200">
								<strong>Boom 2</strong><br/>
								Hello World!
							</Col>
						</MediaObject>
					</Col>
				</Row>

				<Row>
					<Col>
						<ParaBlock>
							<Para>Yep some text that is ahd laks kas dlk lksdl flsdf.</Para>
							<Para>Yep some text that is ahd laks kas dlk lksdl flsdf.</Para>
						</ParaBlock>
					</Col>
				</Row>
			</Frame>
	);

	return markup;
};
