"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _tsExpect = require("ts-expect");

var _Cascader = _interopRequireDefault(require("../Cascader"));

// Infer value and onChange types from data
var numberValuedData = [{
  label: 'One',
  value: 1
}];

/*#__PURE__*/
_react.default.createElement(_Cascader.default, {
  data: numberValuedData,
  value: 1
}); // @ts-expect-error should not accept string value


/*#__PURE__*/
_react.default.createElement(_Cascader.default, {
  data: numberValuedData,
  value: "1"
});

/*#__PURE__*/
_react.default.createElement(_Cascader.default, {
  data: numberValuedData,
  onChange: function onChange(newValue) {
    (0, _tsExpect.expectType)(newValue);
  }
});

var stringValuedData = [{
  label: 'One',
  value: 'One'
}];

/*#__PURE__*/
_react.default.createElement(_Cascader.default, {
  data: stringValuedData,
  value: "1"
}); // @ts-expect-error should not accept number value


/*#__PURE__*/
_react.default.createElement(_Cascader.default, {
  data: stringValuedData,
  value: 1
});

/*#__PURE__*/
_react.default.createElement(_Cascader.default, {
  data: stringValuedData,
  onChange: function onChange(newValue) {
    (0, _tsExpect.expectType)(newValue);
  }
});

var pickerRef = /*#__PURE__*/_react.default.createRef();

/*#__PURE__*/
_react.default.createElement(_Cascader.default, {
  ref: pickerRef,
  data: []
});