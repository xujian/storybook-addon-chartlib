"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _defaultOptions = _interopRequireDefault(require("./default-options"));

var _generateHelpers = require("./generate-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extendOptions(source, comments, filepath, options) {
  return Object.assign({}, _defaultOptions.default, options, {
    source: source,
    comments: comments,
    filepath: filepath
  });
}

function inject(source, decorator, filepath) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$injectDecora = options.injectDecorator,
      injectDecorator = _options$injectDecora === void 0 ? true : _options$injectDecora;

  var _ref = injectDecorator === true ? (0, _generateHelpers.generateSourceWithDecorators)(source, decorator, options.parser) : (0, _generateHelpers.generateSourceWithoutDecorators)(source, options.parser),
      changed = _ref.changed,
      newSource = _ref.source,
      comments = _ref.comments;

  if (!changed) {
    return {
      source: newSource,
      addsMap: {},
      changed: changed
    };
  }

  var storySource = (0, _generateHelpers.generateStorySource)(extendOptions(source, comments, filepath, options));
  var addsMap = (0, _generateHelpers.generateAddsMap)(storySource, options.parser);
  return {
    source: newSource,
    storySource: storySource,
    addsMap: addsMap,
    changed: changed
  };
}

var _default = inject;
exports.default = _default;