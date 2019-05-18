"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _parserTypescript = _interopRequireDefault(require("prettier/parser-typescript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function parse(source) {
  return _parserTypescript["default"].parsers.typescript.parse(source);
}

var _default = {
  parse: parse
};
exports["default"] = _default;