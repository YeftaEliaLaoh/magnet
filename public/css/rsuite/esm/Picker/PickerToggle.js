import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";

var _templateObject, _templateObject2;

import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import ToggleButton from './ToggleButton';
import CloseButton from '../CloseButton';
import { useClassNames, KEY_VALUES, mergeRefs } from '../utils';
import Plaintext from '../Plaintext';
import useToggleCaret from '../utils/useToggleCaret';
import TextMask from '../MaskedInput/TextMask';
import deprecatePropType from '../utils/deprecatePropType';
var defaultInputMask = [];
var PickerToggle = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var activeProp = props.active,
      _props$as = props.as,
      Component = _props$as === void 0 ? ToggleButton : _props$as,
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
      rest = _objectWithoutPropertiesLoose(props, ["active", "as", "classPrefix", "children", "caret", "className", "disabled", "readOnly", "plaintext", "hasValue", "cleanable", "tabIndex", "id", "value", "input", "inputPlaceholder", "inputValue", "inputMask", "onInputChange", "onInputPressEnter", "onInputBlur", "onInputFocus", "onClean", "onFocus", "onBlur", "placement", "caretComponent", "caretAs", "label"]);

  var inputRef = useRef(null);

  var _useState = useState(false),
      activeState = _useState[0],
      setActive = _useState[1];

  var _useClassNames = useClassNames(classPrefix),
      withClassPrefix = _useClassNames.withClassPrefix,
      merge = _useClassNames.merge,
      prefix = _useClassNames.prefix;

  var getInputValue = useCallback(function () {
    return typeof inputValueProp === 'undefined' ? Array.isArray(value) ? value.join(',') : value : inputValueProp;
  }, [inputValueProp, value]);

  var _useState2 = useState(getInputValue),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  useEffect(function () {
    var value = getInputValue();
    setInputValue(value);
  }, [getInputValue]);
  var classes = merge(className, withClassPrefix({
    active: activeProp || activeState
  }));
  var handleFocus = useCallback(function (event) {
    setActive(true);
    onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);

    if (input) {
      var _inputRef$current;

      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    }
  }, [input, onFocus]);
  var handleBlur = useCallback(function (event) {
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

  var handleClean = useCallback(function (event) {
    event.stopPropagation();
    onClean === null || onClean === void 0 ? void 0 : onClean(event);
    setActive(false);
  }, [onClean]);
  var handleInputChange = useCallback(function (event) {
    var _event$target;

    var value = (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value;
    setInputValue(value);
    onInputChange === null || onInputChange === void 0 ? void 0 : onInputChange(value, event);
  }, [onInputChange]);
  var handleInputKeyDown = useCallback(function (event) {
    if (input && event.key === KEY_VALUES.ENTER) {
      onInputPressEnter === null || onInputPressEnter === void 0 ? void 0 : onInputPressEnter(event);
    }
  }, [onInputPressEnter, input]);
  var ToggleCaret = useToggleCaret(placement);
  var Caret = caretAs !== null && caretAs !== void 0 ? caretAs : ToggleCaret;

  if (plaintext) {
    return /*#__PURE__*/React.createElement(Plaintext, {
      ref: ref,
      localeKey: "notSelected"
    }, hasValue ? children : null);
  }

  var showCleanButton = cleanableProp && hasValue && !readOnly; // When the component is read-only or disabled, the input is not interactive.

  var inputFocused = readOnly || disabled ? false : input && activeState;
  return /*#__PURE__*/React.createElement(Component, _extends({
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
    onBlur: !disabled ? debounce(handleBlur, 200) : null
  }), /*#__PURE__*/React.createElement(TextMask, {
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
      return /*#__PURE__*/React.createElement("input", _extends({
        ref: mergeRefs(inputRef, ref)
      }, props));
    }
  }), children ? /*#__PURE__*/React.createElement("span", {
    className: prefix(hasValue ? 'value' : 'placeholder'),
    "aria-placeholder": typeof children === 'string' ? children : undefined
  }, label && /*#__PURE__*/React.createElement("span", {
    className: prefix('label')
  }, label, ": "), children) : null, showCleanButton && /*#__PURE__*/React.createElement(CloseButton, {
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["clean"]))),
    tabIndex: -1,
    locale: {
      closeLabel: 'Clear'
    },
    onClick: handleClean
  }), caret && /*#__PURE__*/React.createElement(Caret, {
    className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["caret"])))
  }));
});
PickerToggle.displayName = 'PickerToggle';
PickerToggle.propTypes = {
  classPrefix: PropTypes.string,
  hasValue: PropTypes.bool,
  cleanable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  caret: PropTypes.bool,
  as: PropTypes.elementType,
  onClean: PropTypes.func,
  active: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  plaintext: PropTypes.bool,
  caretComponent: deprecatePropType(PropTypes.elementType, 'Use `caretAs` instead.'),
  caretAs: PropTypes.elementType
};
export default PickerToggle;