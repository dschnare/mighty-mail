"use strict";


/*eslint no-unused-vars: 0, quotes: 0*/


var React = require("react");
var classNames = require("classnames");
var Table = require("./layout/Table");
var Col = require("./layout/Col");
var RawHtml = require("./RawHtml");


var Hero = React.createClass({
	// Component API
	propTypes: {
		background: React.PropTypes.string.isRequired,
		bgColor: React.PropTypes.string.isRequired,
		width: React.PropTypes.number,
		height: React.PropTypes.number,
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
			width: "100%",
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
		return {
			width: this.props.width,
			height: this.props.height,
			style: this.props.style,
			align: this.props.align,
			className: classNames("row", "hero", this.props.className)
		};
	},
	getTdProps: function () {
		return {
			background: this.props.background,
			bgColor: this.props.bgColor,
			width: this.props.width,
			align: this.props.wrapper.align,
			vlign: this.props.wrapper.vlign,
			style: this.props.wrapper.style,
			className: classNames("row-wrapper hero-wrapper", this.props.wrapper.className)
		};
	},
	transformChildren: function () {
		var children = [];

		children.push(this.getVmlBgBegin());
		children.push(<div><Col float="center">{this.props.children}</Col></div>);
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
