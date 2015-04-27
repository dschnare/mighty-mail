"use strict";


var React = require("react/addons");
var ReactInjection = require("react/lib/ReactInjection");


// See: https://github.com/facebook/react/issues/140
var HTMLDOMLegacyPropertyConfig = {
  isCustomAttribute: function(attributeName) {
    return -1 !== [
      'align', 'bgcolor', 'border'
     ].indexOf(attributeName);
  },
  Properties: {
    align: null,
    bgcolor: null,
    border: null
  },
  DOMAttributeNames: {
  },
  DOMPropertyNames: {
  }
};

// Allow custom/legacy attributes for mail templates
ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMLegacyPropertyConfig);



function px(value) {
	return value + "px";
}

function width(w) {
	return w <= 0 ? "100%" : w;
}


// TODO: Pass class and other attributes along appropriately.
// TODO: Make it so that Cols are the only children a Row can have.
// TODO: Make all properties type string (this makes it consistent with HTML attributes).
//				Or make them appropriate types and use appropriate CSS units automatically.

var RawHtml = React.createClass({
	propTypes: {
		wrapper: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			wrapper: "div"
		};
	},
	render: function () {
		var html = "";
		React.Children.forEach(this.props.children, function (child) {
			if (typeof child === "string") {
				html += child;
			} else {
				html += React.renderToStaticMarkup(child);
			}
		});

		var props = {};
		for (var k in this.props) {
			if (k !== "wrapper" && k !== "children") {
				props[k] = this.props[k];
			}
		}
		props.dangerouslySetInnerHTML = {__html: html};

		return React.createElement(this.props.wrapper, props);
	}
});

var Frame = React.createClass({
	// Component API
	propTypes: {
		width: React.PropTypes.number,
		borderColor: React.PropTypes.string,
		borderThickness: React.PropTypes.number
	},
	getDefaultProps: function () {
		return {
			borderColor: "",
			width: 0,
			borderThickness: 1
		};
	},
	render: function () {
		var style = {};

		if (this.props.borderColor && this.props.borderThickness) {
			style.border = [px(this.props.borderThickness), this.props.borderColor].join(" solid ");
		}

		return (
			<table cellPadding="0" cellSpacing="0" border="0" align="center" width={width(this.props.width)} style={style}>
				<tbody>
					<tr>
						<td align="center">
							{this.props.children}
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
	// Private API
	// Public API
});

// NOTE: Implement FullWidthRow; place Cols within a Frame.
// !! Rows cannot have percent widths.
var Row = React.createClass({
	// Component API
	propTypes: {
		gutter: React.PropTypes.number,
		width: React.PropTypes.number.isRequired,
		cols: React.PropTypes.number.isRequired
	},
	getDefaultProps: function () {
		return {
			gutter: 0
		};
	},
	render: function () {
		var cols = this.props.cols;
		var rowWidth = this.props.width;
		var gutter = this.props.gutter;
		var colWidth = (rowWidth - (gutter * (cols - 1))) / cols;

		var i = 0;
		var children = [];
		var space = rowWidth;
		React.Children.forEach(this.props.children, function (child) {
			var span = child.props.span;
			var k = i; i += 1;
			var padding = k < (cols - 1) ? gutter : 0;
			var w = Math.ceil(colWidth) * span + padding * Math.max(1, span - 1);

			if (w > space) {
				w = space;
				space -= w;
			} else {
				space -= w;
			}

			children.push(React.cloneElement(child, {
				width: w,
				paddingRight: padding,
				key: k
			}));

			if (k < (cols - 1)) {
				children.push("<!--[if mso]></td><td><![endif]-->");
			}
		});

		return (
			<table cellSpacing="0" cellPadding="0" border="0" align="center" width={width(this.props.width)} className="row">
				<tbody>
					<tr>
						<RawHtml wrapper="td" align="center">{children}</RawHtml>
					</tr>
				</tbody>
			</table>
		);
	}
	// Private API
	// Public API
});

// !! Cols will have their widths and padding overridden by the parent Row.
var Col = React.createClass({
	// Component API
	propTypes: {
		span: React.PropTypes.number,
		align: React.PropTypes.string,
		width: React.PropTypes.number,
		paddingRight: React.PropTypes.number,
		float: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			span: 1,
			align: "left",
			float: "left",
			width: 0,
			paddingRight: 0
		};
	},
	render: function () {
		var style = {};

		if (this.props.paddingRight) {
			style.paddingRight = px(this.props.paddingRight);
		}

		return (
			<table cellSpacing="0" cellPadding="0" border="0" align={this.props.float} width={width(this.props.width)} className="col">
				<tbody>
					<tr>
						<td style={style} align={this.props.align}>{this.props.children}</td>
					</tr>
				</tbody>
			</table>
		);
	},
	// Private API
	// Public API
});

var Button = React.createClass({
	// Component API
	propTypes: {
		href: React.PropTypes.string,
		textColor: React.PropTypes.string,
		fontSize: React.PropTypes.number,
		width: React.PropTypes.number,
		height: React.PropTypes.number,
		bgColor: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			href: "http://tbd.com/",
			textColor: "#ffffff",
			bgColor: "#000000",
			fontSize: 13,
			width: 200,
			height: 40
		};
	},
	render: function () {
		var props = this.props;
		var vmlRectBegin =
'<!--[if mso]>\
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="%href%" style="height:%height%px;v-text-anchor:middle;width:%width%px;" stroke="f" fillcolor="%bgColor%">\
    <w:anchorlock/>\
    <center>\
  <![endif]-->'.replace(/%([^%]+)%/g, function (token, id) {
  	return props[id];
  });

  	var vmlRectEnd =
'<!--[if mso]>\
    </center>\
  </v:roundrect>\
<![endif]-->';

		return (
			<div>
				<RawHtml>{vmlRectBegin}</RawHtml>
				<a href={props.href} style={{
					backgroundColor:props.bgColor,
					color:props.textColor,
					display:"inline-block",
					fontFamily:"sans-serif",
					fontSize:px(props.fontSize),
					fontWeight:"bold",
					lineHeight:px(props.height),
					textAlign:"center",
					textDecoration:"none",
					width:px(props.width),
					WebkitTextSizeAdjust:"none"}}>{this.props.children}</a>
				<RawHtml>{vmlRectEnd}</RawHtml>
			</div>
		);
	}
	// Private API
	// Public API
});


module.exports.render = function () {
	var markup = React.renderToStaticMarkup(

		<Frame>
			<Row width={500} cols={3} gutter={5}>
				<Col>One</Col>
				<Col>Two</Col>
				<Col>Three</Col>
			</Row>
		</Frame>

	);

	return markup;
};
