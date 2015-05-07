"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Table = require("./layout/Table");
var applyChildMask = require("../util/applyChildMask");
var pluckTableProps = require("../util/pluckTableProps");
var classNames = require("classnames");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var ParagraphBlock = React.createClass({
	// Component API
	propTypes: {
		border: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string
		]),
		bgColor: React.PropTypes.string,
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		width: numberOrStringType,
		align: React.PropTypes.oneOf(["left", "center", "right"])
	},
	getDefaultProps: function () {
		return {
			align: "left"
		};
	},
	render: function () {
		var tableProps = this.getTableProps();
		var paragraphs = this.getParagraphs();

		return (
			<Table {...tableProps}>
				<tbody>
					{paragraphs}
				</tbody>
			</Table>
		);
	},
	// Private API
	getTableProps: function () {
		var tableProps = pluckTableProps(this.props);

		tableProps.className = classNames("paragraph-block", tableProps.className);

		return tableProps;
	},
	getParagraphs: function () {
		return applyChildMask({ Paragraph: true }, this.props.children);
	}
	// Public API
});

module.exports = ParagraphBlock;
