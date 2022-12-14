"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireWildcard(require("react"));

var _InputPicker = _interopRequireWildcard(require("../InputPicker/InputPicker"));

var TagPicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$tagProps = props.tagProps,
      tagProps = _props$tagProps === void 0 ? {} : _props$tagProps,
      _props$trigger = props.trigger,
      trigger = _props$trigger === void 0 ? 'Enter' : _props$trigger,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["tagProps", "trigger"]);
  var contextValue = (0, _react.useMemo)(function () {
    return {
      multi: true,
      trigger: trigger,
      tagProps: tagProps
    };
  }, [tagProps, trigger]);
  return /*#__PURE__*/_react.default.createElement(_InputPicker.InputPickerContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(_InputPicker.default, (0, _extends2.default)({}, rest, {
    ref: ref
  })));
});

TagPicker.displayName = 'TagPicker';
var _default = TagPicker;
exports.default = _default;