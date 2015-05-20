var React = require("react");
var ParaBlock = require("./ParaBlock");
var Para = require("./Para");

/*eslint no-unused-vars: 0*/

module.exports = (
	<ParaBlock>
		<Para>Paragraph <strong>one</strong>.</Para>
		<Para wrapper={{className: "text-large"}}>Paragraph two.</Para>
	</ParaBlock>
);
