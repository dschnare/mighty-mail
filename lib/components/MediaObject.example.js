var React = require("react");
var MediaObject = require("./MediaObject");
var Col = require("./layout/Col");

/*eslint no-unused-vars: 0*/

module.exports = (
	React.createElement(MediaObject, {width: 500}, 
		React.createElement(Col, {width: 300, wrapper: {className: "text-large"}}, React.createElement("img", {src: "images/offer.jpg"})), 
		React.createElement(Col, {align: "right"}, "This is the block of copy.")
	)
);
