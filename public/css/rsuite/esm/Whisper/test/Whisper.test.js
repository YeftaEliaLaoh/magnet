import _extends from "@babel/runtime/helpers/esm/extends";

var _whisperRef$current, _whisperRef$current2, _whisperRef$current3, _whisperRef$current4, _whisperRef$current5;

import React from 'react';
import { expectType } from 'ts-expect';
import Whisper from '../Whisper';
var whisperRef = /*#__PURE__*/React.createRef();

/*#__PURE__*/
React.createElement(Whisper, {
  ref: whisperRef,
  speaker: /*#__PURE__*/React.createElement("div", null)
}, /*#__PURE__*/React.createElement("div", null));
(_whisperRef$current = whisperRef.current) === null || _whisperRef$current === void 0 ? void 0 : _whisperRef$current.open();
(_whisperRef$current2 = whisperRef.current) === null || _whisperRef$current2 === void 0 ? void 0 : _whisperRef$current2.open(300);
(_whisperRef$current3 = whisperRef.current) === null || _whisperRef$current3 === void 0 ? void 0 : _whisperRef$current3.close();
(_whisperRef$current4 = whisperRef.current) === null || _whisperRef$current4 === void 0 ? void 0 : _whisperRef$current4.close(300);
(_whisperRef$current5 = whisperRef.current) === null || _whisperRef$current5 === void 0 ? void 0 : _whisperRef$current5.updatePosition(); // speaker function types

/*#__PURE__*/
React.createElement(Whisper, {
  speaker: function speaker(props, ref) {
    expectType(props.arrowOffsetLeft);
    expectType(props.arrowOffsetLeft);
    expectType(props.onMouseEnter);
    expectType(props.onMouseLeave);
    expectType(props.onClose);
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: ref
    }, props));
  }
}, /*#__PURE__*/React.createElement("div", null));