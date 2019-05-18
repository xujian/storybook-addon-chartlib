"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_THEME = exports.INITIAL_THEMES = void 0;
var INITIAL_THEMES = {
  dark: {
    name: 'Dark',
    type: 'mobile'
  },
  warm: {
    name: 'Warm',
    type: 'mobile'
  },
  cold: {
    name: 'Cold',
    type: 'mobile'
  }
};
exports.INITIAL_THEMES = INITIAL_THEMES;
var DEFAULT_THEME = 'dark';
exports.DEFAULT_THEME = DEFAULT_THEME;