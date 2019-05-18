"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _coreEvents = require("@storybook/core-events");

var _defaults = require("./defaults");

var constants = _interopRequireWildcard(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var toList = function toList(items) {
  return items ? Object.entries(items).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        id = _ref2[0],
        value = _ref2[1];

    return Object.assign({}, value, {
      id: id
    });
  }) : [];
};

var createItem = function createItem(id, name, value, change) {
  return {
    id: id || name,
    title: name,
    onClick: function onClick() {
      change({
        selected: id,
        expanded: false
      });
    },
    right: "",
    value: value
  };
};

var getState = function getState(props, state, change) {
  var data = props.api.getCurrentStoryData();
  var themes = data && data.parameters && data.parameters.themes;
  var list = toList(themes || _defaults.INITIAL_THEMES);
  var selected = state.selected === 'dark' || list.find(function (i) {
    return i.id === state.selected;
  }) ? state.selected : list.find(function (i) {
    return i["default"];
  }) || _defaults.DEFAULT_THEME;
  var items = list.map(function (_ref3) {
    var id = _ref3.id,
        name = _ref3.name,
        value = _ref3.styles;
    return createItem(id, name, value, change);
  });
  return {
    items: items,
    selected: selected
  };
};

var IconButtonWithLabel = (0, _theming.styled)(_components.IconButton)(function () {
  return {
    display: 'inline-flex',
    alignItems: 'center'
  };
});

var IconButtonLabel = _theming.styled.div(function (_ref4) {
  var theme = _ref4.theme;
  return {
    fontSize: theme.typography.size.s2 - 1,
    marginLeft: '10px'
  };
});

var ThemeTool =
/*#__PURE__*/
function (_Component) {
  _inherits(ThemeTool, _Component);

  function ThemeTool(props) {
    var _this;

    _classCallCheck(this, ThemeTool);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ThemeTool).call(this, props));

    _this.change = function (args) {
      _this.channel.emit(constants.EVENT_THEME_CHANGED, {
        theme: args.selected
      });

      _this.setState(args);
    };

    _this.api = props.api;
    _this.channel = props.channel;
    _this.state = {
      items: [],
      selected: 'responsive',
      expanded: false
    };

    _this.listener = function () {
      _this.setState({
        selected: null
      });
    };

    return _this;
  }

  _createClass(ThemeTool, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var api = this.props.api;
      api.on(_coreEvents.SET_STORIES, this.listener);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var api = this.props.api;
      api.off(_coreEvents.SET_STORIES, this.listener);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var expanded = this.state.expanded;

      var _getState = getState(this.props, this.state, this.change),
          items = _getState.items,
          selected = _getState.selected;

      var item = items.find(function (i) {
        return i.id === selected;
      });
      var buttonTitle = '';

      if (item) {
        buttonTitle = "".concat(item.title);
      }

      return items.length ? _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_components.WithTooltip, {
        placement: "top",
        trigger: "click",
        tooltipShown: expanded,
        onVisibilityChange: function onVisibilityChange(s) {
          return _this2.setState({
            expanded: s
          });
        },
        tooltip: _react["default"].createElement(_components.TooltipLinkList, {
          links: items
        }),
        closeOnClick: true
      }, _react["default"].createElement(IconButtonWithLabel, {
        key: "viewport",
        title: "\u8272\u5F69\u4E3B\u9898",
        active: !!item
      }, _react["default"].createElement(_components.Icons, {
        icon: "chroma"
      }), _react["default"].createElement(IconButtonLabel, null, buttonTitle)))) : null;
    }
  }]);

  return ThemeTool;
}(_react.Component);

exports["default"] = ThemeTool;
ThemeTool.propTypes = {
  api: _propTypes["default"].shape({
    on: _propTypes["default"].func
  }).isRequired,
  channel: _propTypes["default"].shape({
    emit: _propTypes["default"].func,
    on: _propTypes["default"].func,
    removeListener: _propTypes["default"].func
  }).isRequired
};