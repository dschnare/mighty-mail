"use strict";


/*eslint no-unused-vars: 0, quotes: 0*/


var React = require("react");
var classNames = require("classnames");
var Table = require("./layout/Table");
var Col = require("./layout/Col");
var RawHtml = require("./RawHtml");


var Hero = React.createClass({displayName: "Hero",
	// Component API
	propTypes: {
		background: React.PropTypes.string.isRequired,
		bgColor: React.PropTypes.string.isRequired,
		width: React.PropTypes.number,
		height: React.PropTypes.number,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			width: "100%"
		};
	},
	render: function () {
		var tableProps = this.getTableProps();
		var tdProps = this.getTdProps();
		var children = this.transformChildren();

		return (
			React.createElement(Table, React.__spread({},  tableProps), 
				React.createElement("tbody", null, 
					React.createElement("tr", null, 
						React.createElement(RawHtml, React.__spread({wrapper: "td"},  tdProps), children)
					)
				)
			)
		);
	},
	// Private API
	getTableProps: function () {
		return {
			width: this.props.width,
			height: this.props.height,
			className: classNames("hero", "row", this.props.className)
		};
	},
	getTdProps: function () {
		return {
			background: this.props.background,
			bgColor: this.props.bgColor,
			width: this.props.width,
			className: "hero-wrapper row-wrapper"
		};
	},
	transformChildren: function () {
		var children = [];

		children.push(this.getVmlBgBegin());
		children.push(React.createElement("div", null, React.createElement(Col, {float: "center"}, this.props.children)));
		children.push(this.getVmlBgEnd());

		return children;
	},
	getVmlBgBegin: function () {
		var props = this.props;

		return [
		'<!--[if gte mso 9]>',
		'	<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="mso-width-percent:1000;height:%height%px;">',
		'		<v:fill type="tile" src="%background%" color="%bgColor%" />',
		'		<v:textbox inset="0,0,0,0">',
		'<![endif]-->'].join("\n").replace(/%([^%]+)%/g, function (token, prop) {
			return props[prop];
		});
	},
	getVmlBgEnd: function () {
		return [
		"<!--[if gte mso 9]>",
		"		</v:textbox>",
		"	</v:rect>",
		"<![endif]-->"].join("\n");
	}
	// Public API
});

module.exports = Hero;
