"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Container = require("./layout/Container");
var Col = require("./layout/Col");
var classNames = require("classnames");
var applyChildMask = require("../util/applyChildMask");
var defineTableProps = require("../util/defineTableProps");
var defineTdProps = require("../util/defineTdProps");
var pluckTableProps = require("../util/pluckTableProps");
var mixin = require("../util/mixin");


var MediaObject = React.createClass({
	// Component API
	propTypes: mixin({
		wrapper: React.PropTypes.shape(defineTdProps)
	}, defineTableProps(), {
		width: React.PropTypes.number.isRequired
	}),
	getDefaultProps: function () {
		return {
			align: "center",
			wraper: {
				align: "left",
				valign: "top"
			}
		};
	},
	render: function () {
		var containerProps = this.getContainerProps();
		var cols = this.getColumns();

		return (
			<Container {...containerProps}>
				{cols}
			</Container>
		);
	},
	// Private API
	getContainerProps: function () {
		var containerProps = pluckTableProps(this.props);

		containerProps.cssPrefix = "media-object";
		containerProps.wrapper = this.props.wrapper;

		return containerProps;
	},
	getColumns: function () {
		var cols = applyChildMask({ Col: true }, this.props.children);

		if (cols.length !== 2) {
			return [];
		}

		var gutter = 20;

		var w0 = parseInt(cols[0].props.width, 10);
		var w1 = parseInt(cols[1].props.width, 10);

		if (w0 + w1 <= 0 || isNaN(w0) || isNaN(w1)) {
			throw new Error("Detected invalid width on Col elements in MediaObject.");
		}

		var diff = Math.abs(this.props.width - (w0 + w1));
		diff += gutter;

		var reduction = Math.round(diff / 2);

		return [
			React.cloneElement(cols[0], { key: 0, width: w0 - reduction }),
			React.cloneElement(cols[1], { key: 1, width: w1 - reduction })
		];
	}
	// Public API
});

module.exports = MediaObject;
