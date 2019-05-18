"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchNode = patchNode;
exports.handleADD = handleADD;
exports.handleSTORYOF = handleSTORYOF;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@storybook/router/utils'),
    toId = _require.toId;

var STORIES_OF = 'storiesOf';

function pushParts(source, parts, from, to) {
  var start = source.slice(from, to);
  parts.push(start);
  var end = source.slice(to);
  parts.push(end);
}

function getKindFromStoryOfNode(object) {
  if (object.arguments.length < 1) {
    return '';
  }

  var kindArgument = object.arguments[0];

  if (kindArgument.type === 'Literal' || kindArgument.type === 'StringLiteral') {
    return kindArgument.value;
  }

  if (kindArgument.type === 'TemplateLiteral') {
    // we can generate template, but it will not be a real value
    // until the full template compilation. probably won't fix.
    return '';
  } // other options may include some complex usages.


  return '';
}

function findRelatedKind(object) {
  if (!object || !object.callee) {
    return '';
  }

  if (object.callee.name === STORIES_OF) {
    return getKindFromStoryOfNode(object);
  }

  return findRelatedKind(object.callee.object);
}

function patchNode(node) {
  if (node.range && node.range.length === 2 && node.start === undefined && node.end === undefined) {
    var _node$range = _slicedToArray(node.range, 2),
        start = _node$range[0],
        end = _node$range[1]; // eslint-disable-next-line no-param-reassign


    node.start = start; // eslint-disable-next-line no-param-reassign

    node.end = end;
  }

  if (!node.range && node.start !== undefined && node.end !== undefined) {
    // eslint-disable-next-line no-param-reassign
    node.range = [node.start, node.end];
  }

  return node;
}

function handleADD(node, parent, adds) {
  if (!node.property || !node.property.name || node.property.name.indexOf('add') !== 0) {
    return;
  }

  var addArgs = parent.arguments;

  if (!addArgs || addArgs.length < 2) {
    return;
  }

  var storyName = addArgs[0];
  var lastArg = addArgs[addArgs.length - 1];

  if (storyName.type !== 'Literal' && storyName.type !== 'StringLiteral') {
    // if story name is not literal, it's much harder to extract it
    return;
  }

  var kind = findRelatedKind(node.object) || '';

  if (kind && storyName.value) {
    var key = toId(kind, storyName.value); // eslint-disable-next-line no-param-reassign

    adds[key] = {
      // Debug: code: source.slice(storyName.start, lastArg.end),
      startLoc: {
        col: storyName.loc.start.column,
        line: storyName.loc.start.line
      },
      endLoc: {
        col: lastArg.loc.end.column,
        line: lastArg.loc.end.line
      }
    };
  }
}

function handleSTORYOF(node, parts, source, lastIndex) {
  if (!node.callee || !node.callee.name || node.callee.name !== STORIES_OF) {
    return lastIndex;
  }

  parts.pop();
  pushParts(source, parts, lastIndex, node.end);
  return node.end;
}