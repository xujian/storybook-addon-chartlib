"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withCode = withCode;

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getLocation = function getLocation(context, locationsMap) {
  return locationsMap[context.id];
};

function setCode(context, source, locationsMap) {
  var currentLocation = getLocation(context, locationsMap);

  _addons["default"].getChannel().emit(_constants.EVENT_ID, {
    source: source,
    currentLocation: currentLocation,
    locationsMap: locationsMap
  });
}

function withCode(source) {
  var locationsMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (storyFn, context) {
    setCode(context, source, locationsMap);
    return storyFn();
  };
}