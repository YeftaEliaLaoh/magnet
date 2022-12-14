"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _ToggleButton = _interopRequireDefault(require("./ToggleButton"));

var _CloseButton = _interopRequireDefault(require("../CloseButton"));

var _utils = require("../utils");

var _Plaintext = _interopRequireDefault(require("../Plaintext"));

var _useToggleCaret = _interopRequireDefault(require("../utils/useToggleCaret"));

var _TextMask = _interopRequireDefault(require("../MaskedInput/TextMask"));

var _deprecatePropType = _interopRequireDefault(require("../utils/deprecatePropType"));

var _templateObject, _templateObject2;

var defaultInputMask = [];

var PickerToggle = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var activeProp = props.active,
      _props$as = props.as,
      Component = _props$as === void 0 ? _ToggleButton.default : _props$as,
      _props$classPrefix = props.classPrefix,
      classPrefix = _props$classPrefix === void 0 ? 'picker-toggle' : _props$classPrefix,
      children = props.children,
      _props$caret = props.caret,
      caret = _props$caret === void 0 ? true : _props$caret,
      className = props.className,
      disabled = props.disabled,
      readOnly = props.readOnly,
      plaintext = props.plaintext,
      hasValue = props.hasValue,
      cleanableProp = props.cleanable,
      _props$tabIndex = props.tabIndex,
      tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex,
      id = props.id,
      value = props.value,
      input = props.input,
      inputPlaceholder = props.inputPlaceholder,
      inputValueProp = props.inputValue,
      _props$inputMask = props.inputMask,
      inputMask = _props$inputMask === void 0 ? defaultInputMask : _props$inputMask,
      onInputChange = props.onInputChange,
      onInputPressEnter = props.onInputPressEnter,
      onInputBlur = props.onInputBlur,
      onInputFocus = props.onInputFocus,
      onClean = props.onClean,
      onFocus = props.onFocus,
      onBlur = props.onBlur,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
      caretComponent = props.caretComponent,
      _props$caretAs = props.caretAs,
      caretAs = _props$caretAs === void 0 ? caretComponent : _props$caretAs,
      label = props.label,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["active", "as", "classPrefix", "children", "caret", "className", "disabled", "readOnly", "plaintext", "hasValue", "cleanable", "tabIndex", "id", "value", "input", "inputPlaceholder", "inputValue", "inputMask", "onInputChange", "onInputPressEnter", "onInputBlur", "onInputFocus", "onClean", "onFocus", "onBlur", "placement", "caretComponent", "caretAs", "label"]);
  var inputRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      activeState = _useState[0],
      setActive = _useState[1];

  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
      withClassPrefix = _useClassNames.withClassPrefix,
      merge = _useClassNames.merge,
      prefix = _useClassNames.prefix;

  var getInputValue = (0, _react.useCallback)(function () {
    return typeof inputValueProp === 'undefined' ? Array.isArray(value) ? value.join(',') : value : inputValueProp;
  }, [inputValueProp, value]);

  var _useState2 = (0, _react.useState)(getInputValue),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  (0, _react.useEffect)(function () {
    var value = getInputValue();
    setInputValue(value);
  }, [getInputValue]);
  var classes = merge(className, withClassPrefix({
    active: activeProp || activeState
  }));
  var handleFocus = (0, _react.useCallback)(function (event) {
    setActive(true);
    onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);

    if (input) {
      var _inputRef$current;

      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    }
  }, [input, onFocus]);
  var handleBlur = (0, _react.useCallback)(function (event) {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      setActive(false);
      inputRef.current.blur();
    }

    onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
  }, [onBlur]);

  var handleInputBlur = function handleInputBlur(event) {
    setInputValue(getInputValue());
    onInputBlur === null || onInputBlur === void 0 ? void 0 : onInputBlur(event);
  };

  var handleClean = (0, _react.useCallback)(function (event) {
    event.stopPropagation();
    onClean === null || onClean === void 0 ? void 0 : onClean(event);
    setActive(false);
  }, [onClean]);
  var handleInputChange = (0, _react.useCallback)(function (event) {
    var _event$target;

    var value = (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value;
    setInputValue(value);
    onInputChange === null || onInputChange === void 0 ? void 0 : onInputChange(value, event);
  }, [onInputChange]);
  var handleInputKeyDown = (0, _react.useCallback)(function (event) {
    if (input && event.key === _utils.KEY_VALUES.ENTER) {
      onInputPressEnter === null || onInputPressEnter === void 0 ? void 0 : onInputPressEnter(event);
    }
  }, [onInputPressEnter, input]);
  var ToggleCaret = (0, _useToggleCaret.default)(placement);
  var Caret = caretAs !== null && caretAs !== void 0 ? caretAs : ToggleCaret;

  if (plaintext) {
    return /*#__PURE__*/_react.default.createElement(_Plaintext.default, {
      ref: ref,
      localeKey: "notSelected"
    }, hasValue ? children : null);
  }

  var showCleanButton = cleanableProp && hasValue && !readOnly; // When the component is read-only or disabled, the input is not interactive.

  var inputFocused = readOnly || disabled ? false : input && activeState;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "combobox",
    "aria-haspopup": "listbox",
    "aria-expanded": activeProp,
    "aria-disabled": disabled,
    "aria-owns": id ? id + "-listbox" : undefined
  }, rest, {
    ref: ref,
    disabled: disabled,
    tabIndex: disabled ? undefined : tabIndex,
    className: classes,
    onFocus: !disabled ? handleFocus : null // The debounce is set to 200 to solve the flicker caused by the switch between input and div.
    ,
    onBlur: !disabled ? (0, _debounce.default)(handleBlur, 200) : null
  }), /*#__PURE__*/_react.default.createElement(_TextMask.default, {
    mask: inputMask,
    value: Array.isArray(inputValue) ? inputValue.toString() : inputValue,
    onBlur: handleInputBlur,
    onFocus: onInputFocus,
    onChange: handleInputChange,
    onKeyDown: handleInputKeyDown,
    id: id,
    "aria-hidden": !inputFocused,
    readOnly: !inputFocused,
    disabled: disabled,
    "aria-controls": id ? id + "-listbox" : undefined,
    tabIndex: -1,
    className: prefix('textbox', {
      'read-only': !inputFocused
    }),
    placeholder: inputPlaceholder,
    render: function render(ref, props) {
      return /*#__PURE__*/_react.default.createElement("input", (0, _extends2.default)({
        ref: (0, _utils.mergeRefs)(inputRef, ref)
      }, props));
    }
  }), children ? /*#__PURE__*/_react.default.createElement("span", {
    className: prefix(hasValue ? 'value' : 'placeholder'),
    "aria-placeholder": typeof children === 'string' ? children : undefined
  }, label && /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('label')
  }, label, ": "), children) : null, showCleanButton && /*#__PURE__*/_react.default.createElement(_CloseButton.default, {
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["clean"]))),
    tabIndex: -1,
    locale: {
      closeLabel: 'Clear'
    },
    onClick: handleClean
  }), caret && /*#__PURE__*/_react.default.createElement(Caret, {
    className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["caret"])))
  }));
});

PickerToggle.displayName = 'PickerToggle';
PickerToggle.propTypes = {
  classPrefix: _propTypes.default.string,
  hasValue: _propTypes.default.bool,
  cleanable: _propTypes.default.bool,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  caret: _propTypes.default.bool,
  as: _propTypes.default.elementType,
  onClean: _propTypes.default.func,
  active: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  plaintext: _propTypes.default.bool,
  caretComponent: (0, _deprecatePropType.default)(_propTypes.default.elementType, 'Use `caretAs` instead.'),
  caretAs: _propTypes.default.elementType
};
var _default = PickerToggle;
exports.default = _default;