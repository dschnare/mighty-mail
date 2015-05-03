"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Row = require("./layout/Row");
var Col = require("./layout/Col");
var classNames = require("classnames");
var applyChildMask = require("../util/apply-child-mask");
var px = require("../util/px");


var MediaObject = React.createClass({
	// Component API
	propTypes: {
		width: React.PropTypes.number.isRequired,
		mediaWidth: React.PropTypes.number.isRequired,
		mediaFloat: React.PropTypes.oneOf(["left", "right"]),
		gutter: React.PropTypes.number,
		className: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			mediaFloat: "left",
			gutter: 10
		};
	},
	render: function () {
		var rowProps = this.getRowProps();
		var cols = this.getColumns();

		return (
			<Row {...rowProps}>
				{cols}
			</Row>
		);
	},
	// Private API
	getColumns: function () {
		var media = this.getMediaChild(this.props.children);
		var content = this.getContentChild(this.props.children);

		var gutter = this.props.gutter;
		var mediaWidth = this.props.mediaWidth + gutter * 2;
		var contentWidth = this.props.width - mediaWidth;

		var mediaColProps = this.getMediaColProps(mediaWidth, gutter);
		var contentColProps = this.getContentColProps(contentWidth);

		var cols = [
			<Col {...contentColProps}>{content}</Col>,
			<Col {...mediaColProps}>{media}</Col>
		];

		if (this.isMediaChildFirst(this.props.children)) {
			cols.reverse();
		}

		return cols;
	},
	getMediaChild: function (children) {
		return applyChildMask({ img: true }).shift();
	},
	getContentChild: function (children) {
		return applyChildMask({ Col: true }).shift();
	},
	getRowProps: function () {
		return {
			width: this.props.width,
			className: "media-object",
			wrapper: {
				className: "media-object-wrapper"
			}
		};
	},
	getMediaColProps: function (mediaWidth, gutter) {
		return {
			width: mediaWidth,
			float: this.props.mediaFloat,
			className: "media-object-media",
			wrapper: {
				className: "media-object-media-wrapper",
				style: {
					paddingLeft: px(gutter),
					paddingRight: px(gutter)
				}
			}
		};
	},
	getContentColProps: function (contentWidth) {
		return {
			width: contentWidth,
			className: "media-object-content",
			wrapper: {
				className: "media-object-content-wrapper"
			}
		};
	},
	isMediaChildFirst: function (children) {
		var kids = applyChildMask({ img: true, Col: true });
		return kids.length && kids[0].type && kids[0].type.displayName === "img";
	}
	// Public API
});

module.exports = MediaObject;
