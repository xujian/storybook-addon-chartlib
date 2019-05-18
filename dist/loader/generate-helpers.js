"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.some");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.some");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSourceWithDecorators = generateSourceWithDecorators;
exports.generateSourceWithoutDecorators = generateSourceWithoutDecorators;
exports.generateAddsMap = generateAddsMap;
exports.generateStorySource = generateStorySource;

var _prettier = _interopRequireDefault(require("prettier"));

var _parseHelpers = require("./parse-helpers");

var _traverseHelpers = require("./traverse-helpers");

var _parsers = _interopRequireDefault(require("./parsers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function isUglyComment(comment, uglyCommentsRegex) {
  return uglyCommentsRegex.some(function (regex) {
    return regex.test(comment);
  });
}

function generateSourceWithoutUglyComments(source, _ref) {
  var comments = _ref.comments,
      uglyCommentsRegex = _ref.uglyCommentsRegex;
  var lastIndex = 0;
  var parts = [source];
  comments.filter(function (comment) {
    return isUglyComment(comment.value.trim(), uglyCommentsRegex);
  }).map(_parseHelpers.patchNode).forEach(function (comment) {
    parts.pop();
    var start = source.slice(lastIndex, comment.start);
    var end = source.slice(comment.end);
    parts.push(start, end);
    lastIndex = comment.end;
  });
  return parts.join('');
}

function prettifyCode(source, _ref2) {
  var prettierConfig = _ref2.prettierConfig,
      parser = _ref2.parser,
      filepath = _ref2.filepath;
  var config = prettierConfig;

  if (!config.parser) {
    if (parser) {
      config = Object.assign({}, prettierConfig, {
        parser: parser === 'javascript' ? 'babel' : parser
      });
    } else if (filepath) {
      config = Object.assign({}, prettierConfig, {
        filepath: filepath
      });
    } else {
      config = Object.assign({}, prettierConfig, {
        parser: 'babel'
      });
    }
  }

  return _prettier["default"].format(source, config);
}

function generateSourceWithDecorators(source, decorator, parserType) {
  var parser = (0, _parsers["default"])(parserType);
  var ast = parser.parse(source);
  var _ast$comments = ast.comments,
      comments = _ast$comments === void 0 ? [] : _ast$comments;
  var parts = (0, _traverseHelpers.splitSTORYOF)(ast, source);
  var newSource = parts.join(decorator);
  return {
    changed: parts.length > 1,
    source: newSource,
    comments: comments
  };
}

function generateSourceWithoutDecorators(source, parserType) {
  var parser = (0, _parsers["default"])(parserType);
  var ast = parser.parse(source);
  var _ast$comments2 = ast.comments,
      comments = _ast$comments2 === void 0 ? [] : _ast$comments2;
  return {
    changed: true,
    source: source,
    comments: comments
  };
}

function generateAddsMap(source, parserType) {
  var parser = (0, _parsers["default"])(parserType);
  var ast = parser.parse(source);
  return (0, _traverseHelpers.findAddsMap)(ast);
}

function generateStorySource(_ref3) {
  var source = _ref3.source,
      options = _objectWithoutProperties(_ref3, ["source"]);

  var storySource = source;
  storySource = generateSourceWithoutUglyComments(storySource, options);
  storySource = prettifyCode(storySource, options);
  return storySource;
}