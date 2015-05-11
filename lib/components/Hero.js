"use strict";


/*eslint no-unused-vars: 0, quotes: 0*/


var React = require("react");
var classNames = require("classnames");
var Table = require("./layout/Table");
var Col = require("./layout/Col");
var RawHtml = require("./RawHtml");
var pluckTableProps = require("../util/pluckTableProps");
var pluckTdProps = require("../util/pluckTdProps");


var Hero = React.createClass({displayName: "Hero",
	// Component API
	propTypes: {
		background: React.PropTypes.string.isRequired,
		bgColor: React.PropTypes.string.isRequired,
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
		align: React.PropTypes.string,
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		wrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			style: React.PropTypes.object,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		})
	},
	getDefaultProps: function () {
		return {
			align: "center",
			wrapper: {
				align: "center",
				valign: "middle"
			}
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
		var tableProps = pluckTableProps(this.props);

		delete tableProps.bgColor;
		tableProps.className = classNames("row", "hero", tableProps.className);

		return tableProps;
	},
	getTdProps: function () {
		var tdProps = pluckTdProps(this.props.wrapper || {});

		tdProps.background = this.props.background;
		tdProps.bgColor = this.props.bgColor;
		tdProps.width = this.props.width;
		tdProps.height = this.props.height;
		tdProps.className = classNames("row-wrapper", "hero-wrapper", tdProps.className);

		return tdProps;
	},
	transformChildren: function () {
		var children = [];

		children.push(this.getVmlBgBegin());
		children.push(React.createElement("div", null, React.createElement(Col, {align: "center"}, this.props.children)));
		children.push(this.getVmlBgEnd());

		return children;
	},
	getVmlBgBegin: function () {
		var props = this.props;

		return [
		'<!--[if gte mso 9]>',
		'	<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:%width%px;height:%height%px;">',
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
