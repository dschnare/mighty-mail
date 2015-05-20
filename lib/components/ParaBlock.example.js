var React = require("react");
var ParaBlock = require("./ParaBlock");
var Para = require("./Para");

/*eslint no-unused-vars: 0*/

module.exports = (
	React.createElement(ParaBlock, null, 
		React.createElement(Para, null, "Paragraph ", React.createElement("strong", null, "one"), "."), 
		React.createElement(Para, null, "Paragraph two.")
	)
);
