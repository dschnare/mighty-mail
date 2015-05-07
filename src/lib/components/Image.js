"use strict";


var React = require("react");
var classNames = require("classnames");
var imageSize = require("image-size");
var path = require("path");


var numberOrStringType = React.PropTypes.oneOfType([
	React.PropTypes.number,
	React.PropTypes.string
]);

var Image = React.createClass({
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
			<img {...imgProps} />
		);
	},
	// Private API
	getImgProps: function () {
		var size = imageSize(path.join(Image.imageBasePath, this.props.src));
		var width = this.props.width;
		var height = this.props.height;

		if (size && typeof width !== "number" && typeof height !== "number") {
			width = size.width;
			height = size.height;
		}

		return {
			src: this.props.src,
			width: width,
			height: height,
			border: this.props.border,
			className: classNames(this.props.className) || undefined,
			style: this.props.style
		};
	}
	// Public API
});

Image.imageBasePath = ".";

module.exports = Image;
