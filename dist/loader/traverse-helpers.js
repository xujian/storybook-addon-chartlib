"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitSTORYOF = splitSTORYOF;
exports.findAddsMap = findAddsMap;

var _parseHelpers = require("./parse-helpers");

var estraverse = require('estraverse');

function splitSTORYOF(ast, source) {
  var lastIndex = 0;
  var parts = [source];
  estraverse.traverse(ast, {
    fallback: 'iteration',
    enter: function enter(node) {
      (0, _parseHelpers.patchNode)(node);

      if (node.type === 'CallExpression') {
        lastIndex = (0, _parseHelpers.handleSTORYOF)(node, parts, source, lastIndex);
      }
    }
  });
  return parts;
}

function findAddsMap(ast) {
  var adds = {};
  estraverse.traverse(ast, {
    fallback: 'iteration',
    enter: function enter(node, parent) {
      (0, _parseHelpers.patchNode)(node);

      if (node.type === 'MemberExpression') {
        (0, _parseHelpers.handleADD)(node, parent, adds);
      }
    }
  });
  return adds;
}