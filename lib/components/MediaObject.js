"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Row = require("./layout/Row");
var Col = require("./layout/Col");
var classNames = require("classnames");
var applyChildMask = require("../util/applyChildMask");
var mixin = require("../util/mixin");


var MediaObject = React.createClass({displayName: "MediaObject",
	// Component API
	propTypes: {
		width: React.PropTypes.number.isRequired,
		mediaWidth: React.PropTypes.number.isRequired,
		mediaFloat: React.PropTypes.oneOf(["left", "right"]),
		gutter: React.PropTypes.number,
		className: React.PropTypes.string,
		style: React.PropTypes.object
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
			React.createElement(Row, React.__spread({},  rowProps), 
				cols
			)
		);
	},
	// Private API
	getColumns: function () {
		var media = this.getMediaChild(this.props.children);
		var content = this.getContentChild(this.props.children);

		if (!media || !content) {
			return [];
		}

		var gutter = this.props.gutter;
		var mediaWidth = this.props.mediaWidth + gutter * 2;
		var contentWidth = this.props.width - mediaWidth;

		var mediaColProps = this.getMediaColProps(mediaWidth, gutter);
		var contentColProps = this.getContentColProps(contentWidth, content.props);
		contentColProps.key = "1";

		// Content is a Col so we might as well just clone it.
		content = React.cloneElement(content, contentColProps);

		var cols = [
			content,
			React.createElement(Col, React.__spread({key: "2"},  mediaColProps), media)
		];

		if (this.isMediaChildFirst(media, this.props.children)) {
			cols.reverse();
		}

		return cols;
	},
	getMediaChild: function (children) {
		return applyChildMask({ Image: true, a: true, img: true }, children).shift();
	},
	getContentChild: function (children) {
		return applyChildMask({ Col: true }, children).shift();
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
					paddingLeft: gutter,
					paddingRight: gutter
				}
			}
		};
	},
	getContentColProps: function (contentWidth, contentProps) {
		var colProps = mixin({}, contentProps);

		colProps.width = contentWidth;
		colProps.className = classNames("media-object-content", colProps.className);
		colProps.wrapper = mixin({}, colProps.wrapper || {});
		colProps.wrapper.className = classNames("media-object-content", colProps.wrapper.className);

		return colProps;
	},
	isMediaChildFirst: function (media, children) {
		var kids = applyChildMask({ Image: true, a: true, img: true, Col: true }, children);
		return kids[0] === media;
	}
	// Public API
});

module.exports = MediaObject;
