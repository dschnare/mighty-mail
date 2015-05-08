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
		var paragraphs = applyChildMask({ Paragraph: true }, this.props.children);
		var last = paragraphs.length - 1;

		if (paragraphs[0]) {
			paragraphs[0] = React.cloneElement(paragraphs[0], { className: classNames(paragraphs[0].className, "first-child") });
		}

		if (paragraphs[last]) {
			paragraphs[last] = React.cloneElement(paragraphs[last], { className: classNames(paragraphs[last].className, "last-child") });
		}

		return paragraphs.map(function (p, k) {
			React.cloneElement(p, { key: k });
		});
	}
	// Public API
});

module.exports = ParagraphBlock;
