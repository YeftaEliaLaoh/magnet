import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _isUndefined from "lodash/isUndefined";
import React, { useRef, useEffect, useImperativeHandle, useCallback, useContext, useState } from 'react';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import contains from 'dom-lib/contains';
import Overlay from './Overlay';
import { createChainedFunction, usePortal, useControlled } from '../utils';
import isOneOf from '../utils/isOneOf';
import OverlayContext from './OverlayContext';

function mergeEvents(events, props) {
  if (events === void 0) {
    events = {};
  }

  if (props === void 0) {
    props = {};
  }

  var nextEvents = {};
  Object.keys(events).forEach(function (eventName) {
    if (events[eventName]) {
      var _props;

      nextEvents[eventName] = createChainedFunction(events[eventName], (_props = props) === null || _props === void 0 ? void 0 : _props[eventName]);
    }
  });
  return nextEvents;
}

/**
 * Useful for mouseover and mouseout.
 * In order to resolve the node entering the mouseover element, a mouseout event and a mouseover event will be triggered.
 * https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave
 * @param handler
 * @param event
 */
function onMouseEventHandler(handler, event, delay) {
  var target = event.currentTarget;
  var related = event.relatedTarget || get(event, ['nativeEvent', 'toElement']);

  if ((!related || related !== target) && !contains(target, related)) {
    handler(event, delay);
  }
}

var defaultTrigger = ['hover', 'focus'];
var OverlayTrigger = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useContext = useContext(OverlayContext),
      overlayContainer = _useContext.overlayContainer;

  var children = props.children,
      _props$container = props.container,
      container = _props$container === void 0 ? overlayContainer : _props$container,
      controlId = props.controlId,
      defaultOpen = props.defaultOpen,
      _props$trigger = props.trigger,
      trigger = _props$trigger === void 0 ? defaultTrigger : _props$trigger,
      disabled = props.disabled,
      followCursor = props.followCursor,
      readOnly = props.readOnly,
      plaintext = props.plaintext,
      openProp = props.open,
      delay = props.delay,
      delayOpenProp = props.delayOpen,
      delayCloseProp = props.delayClose,
      enterable = props.enterable,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
      speaker = props.speaker,
      _props$rootClose = props.rootClose,
      rootClose = _props$rootClose === void 0 ? true : _props$rootClose,
      onClick = props.onClick,
      onMouseOver = props.onMouseOver,
      onMouseMove = props.onMouseMove,
      onMouseOut = props.onMouseOut,
      onContextMenu = props.onContextMenu,
      onFocus = props.onFocus,
      onBlur = props.onBlur,
      onClose = props.onClose,
      onExited = props.onExited,
      rest = _objectWithoutPropertiesLoose(props, ["children", "container", "controlId", "defaultOpen", "trigger", "disabled", "followCursor", "readOnly", "plaintext", "open", "delay", "delayOpen", "delayClose", "enterable", "placement", "speaker", "rootClose", "onClick", "onMouseOver", "onMouseMove", "onMouseOut", "onContextMenu", "onFocus", "onBlur", "onClose", "onExited"]);

  var _usePortal = usePortal({
    container: container
  }),
      Portal = _usePortal.Portal;

  var triggerRef = useRef();
  var overlayRef = useRef();

  var _useControlled = useControlled(openProp, defaultOpen),
      open = _useControlled[0],
      setOpen = _useControlled[1];

  var _useState = useState(null),
      cursorPosition = _useState[0],
      setCursorPosition = _useState[1]; // Delay the timer to close/open the overlay
  // When the cursor moves from the trigger to the overlay, the overlay will be closed.
  // In order to keep the overlay open, a timer is used to delay the closing.


  var delayOpenTimer = useRef(null);
  var delayCloseTimer = useRef(null);
  var delayOpen = isNil(delayOpenProp) ? delay : delayOpenProp;
  var delayClose = isNil(delayCloseProp) ? delay : delayCloseProp; // Whether the cursor is on the overlay

  var isOnOverlay = useRef(false); // Whether the cursor is on the trigger

  var isOnTrigger = useRef(false);
  useEffect(function () {
    return function () {
      if (!isNil(delayOpenTimer.current)) {
        clearTimeout(delayOpenTimer.current);
      }

      if (!isNil(delayCloseTimer.current)) {
        clearTimeout(delayCloseTimer.current);
      }
    };
  }, []);
  var handleOpen = useCallback(function (delay) {
    var ms = _isUndefined(delay) ? delayOpen : delay;

    if (ms && typeof ms === 'number') {
      return delayOpenTimer.current = setTimeout(function () {
        delayOpenTimer.current = null;
        setOpen(true);
      }, ms);
    }

    setOpen(true);
  }, [delayOpen, setOpen]);
  var handleClose = useCallback(function (delay) {
    var ms = _isUndefined(delay) ? delayClose : delay;

    if (ms && typeof ms === 'number') {
      return delayCloseTimer.current = setTimeout(function () {
        delayCloseTimer.current = null;
        setOpen(false);
      }, ms);
    }

    setOpen(false);
  }, [delayClose, setOpen]);
  var handleExited = useCallback(function () {
    setCursorPosition(null);
  }, []);
  useImperativeHandle(ref, function () {
    return {
      get root() {
        return triggerRef.current;
      },

      get overlay() {
        var _overlayRef$current;

        return (_overlayRef$current = overlayRef.current) === null || _overlayRef$current === void 0 ? void 0 : _overlayRef$current.child;
      },

      open: handleOpen,
      close: handleClose,
      updatePosition: function updatePosition() {
        var _overlayRef$current2, _overlayRef$current2$;

        (_overlayRef$current2 = overlayRef.current) === null || _overlayRef$current2 === void 0 ? void 0 : (_overlayRef$current2$ = _overlayRef$current2.updatePosition) === null || _overlayRef$current2$ === void 0 ? void 0 : _overlayRef$current2$.call(_overlayRef$current2);
      }
    };
  });
  /**
   * Close after the cursor leaves.
   */

  var handleCloseWhenLeave = useCallback(function () {
    // When the cursor is not on the overlay and not on the trigger, it is closed.
    if (!isOnOverlay.current && !isOnTrigger.current) {
      handleClose();
    }
  }, [handleClose]);
  /**
   * Toggle open and closed state.
   */

  var handleOpenState = useCallback(function () {
    if (open) {
      handleCloseWhenLeave();
    } else {
      handleOpen();
    }
  }, [open, handleCloseWhenLeave, handleOpen]);
  var handleDelayedOpen = useCallback(function () {
    if (!enterable) {
      return handleOpen();
    }

    isOnTrigger.current = true;

    if (!isNil(delayCloseTimer.current)) {
      clearTimeout(delayCloseTimer.current);
      delayCloseTimer.current = null;
      return handleOpen();
    }

    if (open) {
      return;
    }

    handleOpen();
  }, [enterable, open, handleOpen]);
  var handleDelayedClose = useCallback(function () {
    if (!enterable) {
      handleClose();
    }

    isOnTrigger.current = false;

    if (!isNil(delayOpenTimer.current)) {
      clearTimeout(delayOpenTimer.current);
      delayOpenTimer.current = null;
      return;
    }

    if (!open || !isNil(delayCloseTimer.current)) {
      return;
    }

    delayCloseTimer.current = setTimeout(function () {
      if (!isNil(delayCloseTimer.current)) {
        clearTimeout(delayCloseTimer.current);
        delayCloseTimer.current = null;
      }

      handleCloseWhenLeave();
    }, 200);
  }, [enterable, open, handleClose, handleCloseWhenLeave]);
  var handleSpeakerMouseEnter = useCallback(function () {
    isOnOverlay.current = true;
  }, []);
  var handleSpeakerMouseLeave = useCallback(function () {
    isOnOverlay.current = false;

    if (!isOneOf('click', trigger) && !isOneOf('contextMenu', trigger) && !isOneOf('active', trigger)) {
      handleCloseWhenLeave();
    }
  }, [handleCloseWhenLeave, trigger]);
  var handledMoveOverlay = useCallback(function (event) {
    setCursorPosition(function () {
      return {
        top: event.pageY,
        left: event.pageX,
        clientTop: event.clientX,
        clientLeft: event.clientY
      };
    });
  }, []);
  var preventDefault = useCallback(function (event) {
    event.preventDefault();
  }, []);
  var triggerEvents = {
    onClick: onClick,
    onContextMenu: onContextMenu,
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    onFocus: onFocus,
    onBlur: onBlur,
    onMouseMove: onMouseMove
  };

  if (!disabled && !readOnly && !plaintext) {
    if (isOneOf('click', trigger)) {
      triggerEvents.onClick = createChainedFunction(handleOpenState, triggerEvents.onClick);
    }

    if (isOneOf('contextMenu', trigger)) {
      triggerEvents.onContextMenu = createChainedFunction(preventDefault, handleOpenState, triggerEvents.onContextMenu);
    }

    if (isOneOf('active', trigger)) {
      triggerEvents.onClick = createChainedFunction(handleDelayedOpen, triggerEvents.onClick);
    }

    if (isOneOf('hover', trigger)) {
      var onMouseOverListener = null;
      var onMouseOutListener = null;

      if (trigger !== 'none') {
        onMouseOverListener = function onMouseOverListener(e) {
          return onMouseEventHandler(handleDelayedOpen, e);
        };

        onMouseOutListener = function onMouseOutListener(e) {
          return onMouseEventHandler(handleDelayedClose, e);
        };
      }

      triggerEvents.onMouseOver = createChainedFunction(onMouseOverListener, onMouseOver);
      triggerEvents.onMouseOut = createChainedFunction(onMouseOutListener, onMouseOut);
    }

    if (isOneOf('focus', trigger)) {
      triggerEvents.onFocus = createChainedFunction(handleDelayedOpen, onFocus);
      triggerEvents.onBlur = createChainedFunction(handleDelayedClose, onBlur);
    }

    if (trigger !== 'none') {
      triggerEvents.onMouseMove = createChainedFunction(handledMoveOverlay, onMouseMove);
    }
  }

  var renderOverlay = function renderOverlay() {
    var overlayProps = _extends({}, rest, {
      rootClose: rootClose,
      triggerTarget: triggerRef,
      onClose: trigger !== 'none' ? createChainedFunction(handleClose, onClose) : undefined,
      onExited: createChainedFunction(followCursor ? handleExited : undefined, onExited),
      placement: placement,
      container: container,
      open: open
    });

    var speakerProps = {
      id: controlId
    }; // The purpose of adding mouse entry and exit events to the Overlay is to record whether the current cursor is on the Overlay.
    // When `trigger` is equal to `hover`, if the cursor leaves the `triggerTarget` and stays on the Overlay,
    // the Overlay will continue to remain open.

    if (trigger !== 'none' && enterable) {
      speakerProps.onMouseEnter = handleSpeakerMouseEnter;
      speakerProps.onMouseLeave = handleSpeakerMouseLeave;
    }

    return /*#__PURE__*/React.createElement(Overlay, _extends({}, overlayProps, {
      ref: overlayRef,
      childrenProps: speakerProps,
      followCursor: followCursor,
      cursorPosition: cursorPosition
    }), typeof speaker === 'function' ? function (props, ref) {
      return speaker(_extends({}, props, {
        onClose: handleClose
      }), ref);
    } : speaker);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, typeof children === 'function' ? children(triggerEvents, triggerRef) : /*#__PURE__*/React.cloneElement(children, _extends({
    ref: triggerRef,
    'aria-describedby': controlId
  }, mergeEvents(triggerEvents, children.props))), /*#__PURE__*/React.createElement(Portal, null, renderOverlay()));
});
OverlayTrigger.displayName = 'OverlayTrigger';
export default OverlayTrigger;