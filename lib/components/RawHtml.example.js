var React = require("react");
var RawHtml = require("./RawHtml");

/*eslint no-unused-vars: 0*/

module.exports = (
	React.createElement(RawHtml, null, "<!-- This will be redered as an HTML comment -->")
);
