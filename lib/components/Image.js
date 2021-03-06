"use strict";


var React = require("react");
var classNames = require("classnames");
var imageSize = require("image-size");
var path = require("path");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var Image = React.createClass({displayName: "Image",
	// Component API
	propTypes: {
		src: React.PropTypes.string.isRequired,
		width: numberOrStringType,
		height: numberOrStringType,
		border: numberOrStringType,
		className: React.PropTypes.string,
		style: React.PropTypes.object
	},
	getDefaultProps: function () {
		return {
			border: 0
		};
	},
	render: function () {
		var imgProps = this.getImgProps();

		return (
			React.createElement("img", React.__spread({},  imgProps))
		);
	},
	// Private API
	getImgProps: function () {
		var width = this.props.width;
		var height = this.props.height;

		if (!((typeof width === "number" || typeof width === "string") || (typeof height === "number" || typeof height === "string"))) {
			var size = this.getImageSize(this.props.src);

			if (size) {
				width = size.width;
				height = size.height;
			}
		}

		return {
			src: this.props.src,
			width: width,
			height: height,
			border: this.props.border,
			className: classNames(this.props.className) || undefined,
			style: this.props.style
		};
	},
	getImageSize: function (src) {
		if (src.indexOf("http") === 0) {
			return null;
		} else {
			return imageSize(path.join(Image.imageBasePath, src));
		}
	}
	// Public API
});

Image.imageBasePath = ".";

module.exports = Image;
