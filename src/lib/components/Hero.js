"use strict";


/*eslint no-unused-vars: 0, quotes: 0*/


var React = require("react");
var classNames = require("classnames");
var Table = require("./layout/Table");
var Col = require("./layout/Col");
var RawHtml = require("./RawHtml");
var defineTableProps = require("../util/defineTableProps");
var defineTdProps = require("../util/defineTdProps");
var pluckTableProps = require("../util/pluckTableProps");
var pluckTdProps = require("../util/pluckTdProps");
var mixin = require("../util/mixin");


var Hero = React.createClass({
	// Component API
	propTypes: mixin({
		background: React.PropTypes.string.isRequired,
		height: React.PropTypes.number.isRequired,
		wrapper: React.PropTypes.shape({
			className: React.PropTypes.string,
			style: React.PropTypes.object,
			align: React.PropTypes.oneOf(["left", "center", "right"]),
			valign: React.PropTypes.oneOf(["top", "middle", "bottom"])
		})
	}, defineTableProps(), {
		width: React.PropTypes.number.isRequired
	}),
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

		tdProps.className = "hero__bg";

		return (
			<Table {...tableProps}>
				<tbody>
					<tr>
						<RawHtml wrapper="td" {...tdProps}>{children}</RawHtml>
					</tr>
				</tbody>
			</Table>
		);
	},
	// Private API
	getTableProps: function () {
		var tableProps = pluckTableProps(this.props);
		tableProps.className = classNames("hero", tableProps.className);

		return tableProps;
	},
	getTdProps: function () {
		var tdProps = pluckTdProps(mixin({}, Hero.defaultProps.wrapper, this.props.wrapper || {}));

		tdProps.background = this.props.background;
		tdProps.bgColor = this.props.bgColor;
		tdProps.width = this.props.width;
		tdProps.height = this.props.height;
		tdProps.className = classNames("hero__wrapper", tdProps.className);

		return tdProps;
	},
	transformChildren: function () {
		var children = [];
		var tdProps = this.getTdProps();

		children.push(this.getVmlBgBegin());
		children.push(<div key="1"><Col align="center" wrapper={tdProps}>{this.props.children}</Col></div>);
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
