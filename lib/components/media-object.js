"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var Row = require("./row");
var Col = require("./col");
var classNames = require("classnames");
var applyChildMask = require("../util/apply-child-mask");
var px = require("../util/px");


var MediaObject = React.createClass({displayName: "MediaObject",
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
		var gutter = this.props.gutter;
		var media = this.getMediaChild(this.props.children);
		var content = this.getContentChild(this.props.children);
		var mediaWidth = this.props.mediaWidth + gutter * 2;
		var contentWidth = this.props.width - mediaWidth;
		var mediaCellStyle = {
			paddingLeft: px(gutter),
			paddingRight: px(gutter)
		};

		var rowAttrs = {
			width: this.props.width,
			classNames: { wrapper: "media-object" }
		};

		var mediaColAttrs = {
			width: mediaWidth,
			float: this.props.mediaFloat,
			classNames: { cell: "media-object-media-cell" },
			styles: { cell: mediaCellStyle }
		};

		var contentColAttrs = {
			width: contentWidth,
			classNames: { cell: "media-object-content-cell" }
		};

		var cols = [
			React.createElement(Col, React.__spread({},  contentColAttrs), content),
			React.createElement(Col, React.__spread({},  mediaColAttrs), media)
		];

		if (media && content) {
			if (this.isMediaChildFirst(this.props.children)) {
				cols.reverse();
			}

			return (
				React.createElement(Row, React.__spread({},  rowAttrs), 
					cols
				)
			);
		}

		return null;
	},
	// Private API
	getMediaChild: function (children) {
		return applyChildMask({ img: true }).shift();
	},
	getContentChild: function (children) {
		return applyChildMask({ Col: true }).shift();
	},
	isMediaChildFirst: function (children) {
		var kids = applyChildMask({ img: true, Col: true });
		return kids.length && kids[0].type && kids[0].type.displayName === "img";
	}
	// Public API
});

module.exports = MediaObject;
