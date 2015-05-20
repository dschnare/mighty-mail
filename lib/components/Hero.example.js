var React = require("react");
var Hero = require("./Hero");

/*eslint no-unused-vars: 0*/

module.exports = (
	React.createElement(Hero, {width: 600, height: 400, background: "images/hero.jpg", bgColor: "#ffffff"}, 
		"This is in the middle of the hero."
	)
);
