"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _CodePanel = _interopRequireDefault(require("./CodePanel"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function register() {
  _addons.default.register(_.ADDON_ID, function (api) {
    var channel = _addons.default.getChannel();

    _addons.default.addPanel(_.PANEL_ID, {
      title: 'Code',
      // eslint-disable-next-line react/prop-types
      render: function render(_ref) {
        var active = _ref.active,
            key = _ref.key;
        return _react.default.createElement(_CodePanel.default, {
          key: key,
          channel: channel,
          api: api,
          active: active
        });
      }
    });
  });
}