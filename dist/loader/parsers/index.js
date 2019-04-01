"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getParser(type) {
  if (type === 'javascript' || !type) {
    // eslint-disable-next-line global-require
    return require('./parser-js').default;
  }

  if (type === 'typescript') {
    // eslint-disable-next-line global-require
    return require('./parser-ts').default;
  }

  if (type === 'flow') {
    // eslint-disable-next-line global-require
    return require('./parser-flow').default;
  }

  throw new Error("Parser of type \"".concat(type, "\" is not supported"));
}

var _default = getParser;
exports.default = _default;