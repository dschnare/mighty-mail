// This module adds support for various attributes
// that are typically used in emails.


"use strict";


var ReactInjection = require("react/lib/ReactInjection");

// See: https://github.com/facebook/react/issues/140
var attributes = [
  "align", "valign", "bgcolor", "border"
];
var properties = {};
attributes.forEach(function (attr) {
  properties[attr] = null;
});

var HTMLDOMLegacyPropertyConfig = {
  isCustomAttribute: function(attributeName) {
    return attributes.indexOf(attributeName) >= 0;
  },
  Properties: properties,
  DOMAttributeNames: {},
  DOMPropertyNames: {}
};

// Allow custom/legacy attributes for mail templates
ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMLegacyPropertyConfig);
