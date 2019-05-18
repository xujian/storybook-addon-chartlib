"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENT_THEME_CHANGED = exports.THEME_TOOL = exports.EVENT_ID = exports.SETTINGS_PANEL_ID = exports.CODE_PANEL_ID = exports.ADDON_ID = void 0;
var ADDON_ID = 'storybook-addon-chartlib';
exports.ADDON_ID = ADDON_ID;
var CODE_PANEL_ID = "".concat(ADDON_ID, "/code-panel");
exports.CODE_PANEL_ID = CODE_PANEL_ID;
var SETTINGS_PANEL_ID = "".concat(ADDON_ID, "/settings-panel");
exports.SETTINGS_PANEL_ID = SETTINGS_PANEL_ID;
var EVENT_ID = "".concat(ADDON_ID, "/set-code");
exports.EVENT_ID = EVENT_ID;
var THEME_TOOL = "".concat(ADDON_ID, "/theme-tool");
exports.THEME_TOOL = THEME_TOOL;
var EVENT_THEME_CHANGED = "".concat(ADDON_ID, "/theme-changed");
exports.EVENT_THEME_CHANGED = EVENT_THEME_CHANGED;