"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parserBabylon = _interopRequireDefault(require("prettier/parser-babylon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(source) {
  return _parserBabylon.default.parsers.babel.parse(source);
}

var _default = {
  parse: parse
};
exports.default = _default;