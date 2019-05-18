"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loaderUtils = require("loader-utils");

var _injectDecorator = _interopRequireDefault(require("./inject-decorator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ADD_DECORATOR_STATEMENT = '.addDecorator(withCode(__STORY__, __ADDS_MAP__))';

function transform(source) {
  var options = (0, _loaderUtils.getOptions)(this) || {};
  var result = (0, _injectDecorator["default"])(source, ADD_DECORATOR_STATEMENT, this.resourcePath, options);

  if (!result.changed) {
    return source;
  }

  var sourceJson = JSON.stringify(result.storySource).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  var addsMap = JSON.stringify(result.addsMap);
  return "\n  export var withCode = require('storybook-addon-chartlib').withCode;\n  export var __STORY__ = ".concat(sourceJson, ";\n  export var __ADDS_MAP__ = ").concat(addsMap, ";\n  ").concat(result.source, "\n  ");
}

var _default = transform;
exports["default"] = _default;