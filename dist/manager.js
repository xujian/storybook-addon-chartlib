"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _CodePanel = _interopRequireDefault(require("./CodePanel"));

var _SettingsPanel = _interopRequireDefault(require("./SettingsPanel"));

var _ThemeTool = _interopRequireDefault(require("./ThemeTool"));

var constants = _interopRequireWildcard(require("./constants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function register() {
  _addons["default"].register(constants.ADDON_ID, function (api) {
    var channel = _addons["default"].getChannel();

    _addons["default"].addPanel(constants.CODE_PANEL_ID, {
      title: 'Code',
      // eslint-disable-next-line react/prop-types
      render: function render(_ref) {
        var active = _ref.active,
            key = _ref.key;
        return _react["default"].createElement(_CodePanel["default"], {
          key: key,
          channel: channel,
          api: api,
          active: active
        });
      }
    });

    _addons["default"].addPanel(constants.SETTINGS_PANEL_ID, {
      title: '图表库',
      // eslint-disable-next-line react/prop-types
      render: function render(_ref2) {
        var active = _ref2.active,
            key = _ref2.key;
        return _react["default"].createElement(_SettingsPanel["default"], {
          key: key,
          channel: channel,
          api: api,
          active: active
        });
      }
    });

    _addons["default"].add(constants.THEME_TOOL, {
      title: 'Chartlib/theme',
      type: _addons.types.TOOL,
      match: function match(_ref3) {
        var viewMode = _ref3.viewMode;
        return viewMode === 'story';
      },
      render: function render() {
        return _react["default"].createElement(_ThemeTool["default"], {
          channel: channel,
          api: api
        });
      }
    });
  });
}