"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _Calendar = _interopRequireDefault(require("@rsuite/icons/legacy/Calendar"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _CustomProvider = require("../CustomProvider");

var _Toolbar = _interopRequireDefault(require("../DatePicker/Toolbar"));

var _Picker = require("../Picker");

var _utils = require("../utils");

var _dateUtils = require("../utils/dateUtils");

var _Calendar2 = _interopRequireDefault(require("./Calendar"));

var disabledDateUtils = _interopRequireWildcard(require("./disabledDateUtils"));

var _utils2 = require("./utils");

var DateRangePicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _ref, _ref2, _merge;

  var _props$as = props.as,
      Component = _props$as === void 0 ? 'div' : _props$as,
      _props$classPrefix = props.classPrefix,
      classPrefix = _props$classPrefix === void 0 ? 'picker' : _props$classPrefix,
      className = props.className,
      _props$appearance = props.appearance,
      appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
      _props$cleanable = props.cleanable,
      cleanable = _props$cleanable === void 0 ? true : _props$cleanable,
      _props$character = props.character,
      character = _props$character === void 0 ? ' ~ ' : _props$character,
      defaultCalendarValue = props.defaultCalendarValue,
      defaultValue = props.defaultValue,
      disabled = props.disabled,
      disabledDateProp = props.disabledDate,
      _props$format = props.format,
      formatStr = _props$format === void 0 ? 'yyyy-MM-dd' : _props$format,
      hoverRange = props.hoverRange,
      _props$isoWeek = props.isoWeek,
      isoWeek = _props$isoWeek === void 0 ? false : _props$isoWeek,
      _props$limitEndYear = props.limitEndYear,
      limitEndYear = _props$limitEndYear === void 0 ? 1000 : _props$limitEndYear,
      overrideLocale = props.locale,
      menuClassName = props.menuClassName,
      menuStyle = props.menuStyle,
      oneTap = props.oneTap,
      _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? '' : _props$placeholder,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
      ranges = props.ranges,
      renderValue = props.renderValue,
      _props$showOneCalenda = props.showOneCalendar,
      showOneCalendar = _props$showOneCalenda === void 0 ? false : _props$showOneCalenda,
      showWeekNumbers = props.showWeekNumbers,
      showMeridian = props.showMeridian,
      style = props.style,
      toggleAs = props.toggleAs,
      caretAs = props.caretAs,
      valueProp = props.value,
      onChange = props.onChange,
      onClean = props.onClean,
      onClose = props.onClose,
      onEnter = props.onEnter,
      onEntered = props.onEntered,
      onExited = props.onExited,
      onOk = props.onOk,
      onOpen = props.onOpen,
      onSelect = props.onSelect,
      renderTitle = props.renderTitle,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "classPrefix", "className", "appearance", "cleanable", "character", "defaultCalendarValue", "defaultValue", "disabled", "disabledDate", "format", "hoverRange", "isoWeek", "limitEndYear", "locale", "menuClassName", "menuStyle", "oneTap", "placeholder", "placement", "ranges", "renderValue", "showOneCalendar", "showWeekNumbers", "showMeridian", "style", "toggleAs", "caretAs", "value", "onChange", "onClean", "onClose", "onEnter", "onEntered", "onExited", "onOk", "onOpen", "onSelect", "renderTitle"]);

  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
      merge = _useClassNames.merge,
      prefix = _useClassNames.prefix;

  var _useCustom = (0, _utils.useCustom)('DateRangePicker', overrideLocale),
      locale = _useCustom.locale,
      formatDate = _useCustom.formatDate,
      parseDate = _useCustom.parseDate;

  var rangeFormatStr = "" + formatStr + character + formatStr;

  var _useControlled = (0, _utils.useControlled)(valueProp, defaultValue !== null && defaultValue !== void 0 ? defaultValue : null),
      value = _useControlled[0],
      setValue = _useControlled[1];
  /**
   * Whether to complete the selection.
   * Everytime selection will change this value. If the value is false, it means that the selection has not been completed.
   *
   * In `oneTap` mode, select action will not change this value, its value should be true always.
   */


  var hasDoneSelect = (0, _react.useRef)(true);
  /**
   * The currently selected date range.
   *
   * The time range is selected by two clicks. After the first click,
   * the cursor will store a temporary event date in the process until
   * the second click to determine the end date of the date range.
   *
   */

  var _useState = (0, _react.useState)((_ref = valueProp !== null && valueProp !== void 0 ? valueProp : defaultValue) !== null && _ref !== void 0 ? _ref : []),
      selectedDates = _useState[0],
      setSelectedDates = _useState[1]; // The date of the current hover, used to reduce the calculation of `handleMouseMove`


  var _useState2 = (0, _react.useState)(null),
      hoverDateRange = _useState2[0],
      setHoverDateRange = _useState2[1]; // The displayed calendar panel is rendered based on this value.


  var _useState3 = (0, _react.useState)((0, _utils2.getCalendarDate)({
    value: (_ref2 = valueProp !== null && valueProp !== void 0 ? valueProp : defaultCalendarValue) !== null && _ref2 !== void 0 ? _ref2 : null
  })),
      calendarDate = _useState3[0],
      setCalendarDate = _useState3[1];

  var _useState4 = (0, _react.useState)(),
      inputState = _useState4[0],
      setInputState = _useState4[1];
  /**
   * When hoverRange is set, `selectValue` will be updated during the hover process,
   * which will cause the `selectValue` to be updated after the first click,
   * so declare a Ref to temporarily store the `selectValue` of the first click.
   */


  var selectRangeValueRef = (0, _react.useRef)(null);
  /**
   * Call this function to update the calendar panel rendering benchmark value.
   * If params `value` is not passed, it defaults to [new Date(), addMonth(new Date(), 1)].
   */

  var updateCalendarDate = (0, _react.useCallback)(function (value) {
    setCalendarDate((0, _utils2.getCalendarDate)({
      value: value
    }));
  }, []); // if valueProp changed then update selectValue/hoverValue

  (0, _react.useEffect)(function () {
    setSelectedDates(valueProp !== null && valueProp !== void 0 ? valueProp : []);
    setHoverDateRange(valueProp !== null && valueProp !== void 0 ? valueProp : null);
  }, [valueProp]);

  var _useState5 = (0, _react.useState)(false),
      isPickerToggleActive = _useState5[0],
      setPickerToggleActive = _useState5[1];

  var rootRef = (0, _react.useRef)(null);
  var overlayRef = (0, _react.useRef)(null);
  var targetRef = (0, _react.useRef)(null);
  var triggerRef = (0, _react.useRef)(null);
  var handleCloseDropdown = (0, _react.useCallback)(function () {
    var _triggerRef$current, _triggerRef$current$c;

    (_triggerRef$current = triggerRef.current) === null || _triggerRef$current === void 0 ? void 0 : (_triggerRef$current$c = _triggerRef$current.close) === null || _triggerRef$current$c === void 0 ? void 0 : _triggerRef$current$c.call(_triggerRef$current);
  }, []);
  (0, _Picker.usePublicMethods)(ref, {
    triggerRef: triggerRef,
    overlayRef: overlayRef,
    targetRef: targetRef,
    rootRef: rootRef
  });
  var getDisplayString = (0, _react.useCallback)(function (nextValue, isPlaintext) {
    var _nextValue$, _nextValue$2;

    var startDate = (_nextValue$ = nextValue === null || nextValue === void 0 ? void 0 : nextValue[0]) !== null && _nextValue$ !== void 0 ? _nextValue$ : null;
    var endDate = (_nextValue$2 = nextValue === null || nextValue === void 0 ? void 0 : nextValue[1]) !== null && _nextValue$2 !== void 0 ? _nextValue$2 : null;

    if (startDate && endDate) {
      var displayValue = [startDate, endDate].sort(_dateUtils.compareAsc);

      if (isPlaintext) {
        return formatDate(displayValue[0], formatStr) + character + formatDate(displayValue[1], formatStr);
      }

      return renderValue ? renderValue(displayValue, formatStr) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CustomProvider.FormattedDate, {
        date: displayValue[0],
        formatStr: formatStr
      }), character, /*#__PURE__*/_react.default.createElement(_CustomProvider.FormattedDate, {
        date: displayValue[1],
        formatStr: formatStr
      }));
    }

    return isPlaintext ? '' : placeholder || rangeFormatStr;
  }, [character, formatDate, formatStr, placeholder, rangeFormatStr, renderValue]);
  /**
   * preset hover range
   */

  var getHoverRangeValue = (0, _react.useCallback)(function (date) {
    function getHoverRangeFunc() {
      if (hoverRange === 'week') {
        return (0, _partial.default)(_utils2.getWeekHoverRange, isoWeek);
      } else if (hoverRange === 'month') {
        return _utils2.getMonthHoverRange;
      }

      return hoverRange;
    }

    var hoverRangeFunc = getHoverRangeFunc();

    if ((0, _isNil.default)(hoverRangeFunc)) {
      return null;
    }

    var hoverValues = hoverRangeFunc(date);
    var isHoverRangeValid = hoverValues instanceof Array && hoverValues.length === 2;

    if (!isHoverRangeValid) {
      return null;
    }

    if (_utils.DateUtils.isAfter(hoverValues[0], hoverValues[1])) {
      hoverValues.reverse();
    }

    return hoverValues;
  }, [hoverRange, isoWeek]);
  var handleValueUpdate = (0, _react.useCallback)(function (event, nextValue, closeOverlay) {
    if (closeOverlay === void 0) {
      closeOverlay = true;
    }

    // If nextValue is null, it means that the user is erasing the selected dates.
    setSelectedDates(nextValue !== null && nextValue !== void 0 ? nextValue : []);

    if (!(0, _utils2.isSameRange)(nextValue, value, formatStr)) {
      setValue(nextValue);
      onChange === null || onChange === void 0 ? void 0 : onChange(nextValue, event);
    } // `closeOverlay` default value is `true`


    if (closeOverlay !== false) {
      handleCloseDropdown();
    }
  }, [formatStr, handleCloseDropdown, onChange, setValue, value]);
  /**
   * Select the date range. If oneTap is not set, you need to click twice to select the start time and end time.
   * The MouseMove event is called between the first click and the second click to update the selection state.
   */

  var handleMouseMove = (0, _react.useCallback)(function (date) {
    var nextHoverDateRange = getHoverRangeValue(date); // If hasDoneSelect is false,
    // it means there's already one selected date
    // and waiting for user to select the second date to complete the selection.

    if (!hasDoneSelect.current) {
      // If `hoverRange` is set, you need to change the value of hoverDateRange according to the rules
      if (!(0, _isNil.default)(nextHoverDateRange) && !(0, _isNil.default)(selectRangeValueRef.current)) {
        var nextSelectedDates = [selectRangeValueRef.current[0], nextHoverDateRange[1]];

        if (_utils.DateUtils.isBefore(nextHoverDateRange[0], selectRangeValueRef.current[0])) {
          nextSelectedDates = [nextHoverDateRange[0], selectRangeValueRef.current[1]];
        }

        setSelectedDates(nextSelectedDates);
      } else {
        setHoverDateRange(function (prevHoverValue) {
          return (0, _isNil.default)(prevHoverValue) ? null : [prevHoverValue[0], date];
        });
      } // Before the first click, if nextHoverDateRange has a value, hoverDateRange needs to be updated

    } else if (!(0, _isNil.default)(nextHoverDateRange)) {
      setHoverDateRange(nextHoverDateRange);
    }
  }, [getHoverRangeValue]);
  /**
   * Callback for selecting a date cell in the calendar grid
   */

  var handleSelectDate = (0, _react.useCallback)(function (date, event) {
    var nextSelectDates = hoverDateRange !== null && hoverDateRange !== void 0 ? hoverDateRange : [];
    var hoverRangeValue = getHoverRangeValue(date);
    var noHoverRangeValid = (0, _isNil.default)(hoverRangeValue); // in `oneTap` mode

    if (hasDoneSelect.current && oneTap) {
      handleValueUpdate(event, noHoverRangeValid ? [(0, _utils2.setTimingMargin)(date), (0, _utils2.setTimingMargin)(date, 'right')] : hoverRangeValue);
      hasDoneSelect.current = false;
      return;
    } // no preset hover range can use


    if (noHoverRangeValid) {
      // start select
      if (hasDoneSelect.current) {
        nextSelectDates = [date];
      } else {
        // finish select
        nextSelectDates[1] = date;
      }
    } else {
      if (!hasDoneSelect.current) {
        nextSelectDates = selectedDates;
        selectRangeValueRef.current = null;
      } else {
        nextSelectDates = hoverRangeValue;
        selectRangeValueRef.current = hoverRangeValue;
      }
    } // If user have completed the selection, then sort


    if (nextSelectDates.length === 2 && _utils.DateUtils.isAfter(nextSelectDates[0], nextSelectDates[1])) {
      nextSelectDates.reverse();
    }

    setHoverDateRange(nextSelectDates.length === 2 ? nextSelectDates : [nextSelectDates[0], nextSelectDates[0]]);
    setSelectedDates(nextSelectDates);
    updateCalendarDate(nextSelectDates);
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(date, event);
    hasDoneSelect.current = !hasDoneSelect.current;
  }, [getHoverRangeValue, handleValueUpdate, hoverDateRange, onSelect, oneTap, selectedDates, updateCalendarDate]);
  /**
   * If `selectValue` changed, there will be the following effects.
   * 1. Check if the selection is completed.
   * 2. if the selection is completed, set the temporary `hoverValue` empty.
   */

  (0, _react.useEffect)(function () {
    var selectValueLength = selectedDates.length;
    var doneSelected = selectValueLength === 0 || selectValueLength === 2;
    doneSelected && setHoverDateRange(null);
  }, [selectedDates]);
  var handleChangeCalendarDate = (0, _react.useCallback)(function (index, date) {
    var nextCalendarDate = Array.from(calendarDate);
    nextCalendarDate[index] = date;
    updateCalendarDate(nextCalendarDate);
  }, [calendarDate, updateCalendarDate]);
  var handleChangeCalendarTime = (0, _react.useCallback)(function (index, date) {
    setSelectedDates(function (prev) {
      var next = [].concat(prev);
      var clonedDate = new Date(date.valueOf()); // if next[index] is not empty, only update the time after aligning the year, month and day

      if (next[index]) {
        clonedDate.setFullYear(next[index].getFullYear(), next[index].getMonth(), next[index].getDate());
      }

      next[index] = clonedDate;
      return next;
    });
    handleChangeCalendarDate(index, date);
  }, [handleChangeCalendarDate]);
  /**
   * The callback triggered when PM/AM is switched.
   */

  var handleToggleMeridian = (0, _react.useCallback)(function (index) {
    var next = Array.from(calendarDate);
    var clonedDate = new Date(next[index].valueOf());

    var hours = _utils.DateUtils.getHours(clonedDate);

    var nextHours = hours >= 12 ? hours - 12 : hours + 12;
    next[index] = _utils.DateUtils.setHours(clonedDate, nextHours);
    setCalendarDate(next); // If the value already exists, update the value again.

    if (selectedDates.length === 2) {
      setSelectedDates(next);
    }
  }, [calendarDate, selectedDates]);
  /**
   * Toolbar operation callback function
   */

  var handleShortcutPageDate = (0, _react.useCallback)(function (value, closeOverlay, event) {
    if (closeOverlay === void 0) {
      closeOverlay = false;
    }

    handleValueUpdate(event, value, closeOverlay); // End unfinished selections.

    hasDoneSelect.current = true;
  }, [handleValueUpdate]);
  var handleOK = (0, _react.useCallback)(function (event) {
    handleValueUpdate(event, selectedDates);
    onOk === null || onOk === void 0 ? void 0 : onOk(selectedDates, event);
  }, [handleValueUpdate, onOk, selectedDates]);
  var handleClean = (0, _react.useCallback)(function (event) {
    updateCalendarDate(null);
    handleValueUpdate(event, null);
  }, [handleValueUpdate, updateCalendarDate]);
  /**
   * Callback after the input box value is changed.
   */

  var handleInputChange = (0, _react.useCallback)(function (value) {
    setInputState('Typing');
    var rangeValue = value.split(character); // isMatch('01/11/2020', 'MM/dd/yyyy') ==> true
    // isMatch('2020-11-01', 'MM/dd/yyyy') ==> false

    if (!_utils.DateUtils.isMatch(rangeValue[0], formatStr, {
      locale: locale.dateLocale
    }) || !_utils.DateUtils.isMatch(rangeValue[1], formatStr, {
      locale: locale.dateLocale
    })) {
      setInputState('Error');
      return;
    }

    var startDate = parseDate(rangeValue[0], formatStr);
    var endDate = parseDate(rangeValue[1], formatStr);
    var selectValue = [startDate, endDate];

    if (!_utils.DateUtils.isValid(startDate) || !_utils.DateUtils.isValid(endDate)) {
      setInputState('Error');
      return;
    }

    if (isDateDisabled(startDate, selectValue, true, _utils.DATERANGE_DISABLED_TARGET.CALENDAR)) {
      setInputState('Error');
      return;
    }

    setHoverDateRange(selectValue);
    setSelectedDates(selectValue);
    updateCalendarDate(selectValue);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [character, rangeFormatStr, updateCalendarDate]);
  /**
   * The callback after the enter key is triggered on the input
   */

  var handleInputPressEnd = (0, _react.useCallback)(function (event) {
    if (inputState === 'Typing') {
      handleValueUpdate(event, selectedDates.length === 2 ? selectedDates : null);
    }

    setInputState('Initial');
  }, [handleValueUpdate, selectedDates, inputState]);
  var handleEnter = (0, _react.useCallback)(function () {
    var nextCalendarDate;

    if (value && value.length) {
      var _startDate = value[0],
          endData = value[1];
      nextCalendarDate = [_startDate, (0, _dateUtils.isSameMonth)(_startDate, endData) ? (0, _dateUtils.addMonths)(endData, 1) : endData];
    } else {
      nextCalendarDate = (0, _utils2.getCalendarDate)({
        value: defaultCalendarValue !== null && defaultCalendarValue !== void 0 ? defaultCalendarValue : null
      });
    }

    setSelectedDates(value !== null && value !== void 0 ? value : []);
    updateCalendarDate(nextCalendarDate);
  }, [defaultCalendarValue, updateCalendarDate, setSelectedDates, value]);
  var handleEntered = (0, _react.useCallback)(function () {
    onOpen === null || onOpen === void 0 ? void 0 : onOpen();
    setPickerToggleActive(true);
  }, [onOpen]);
  var handleExited = (0, _react.useCallback)(function () {
    setPickerToggleActive(false);
    hasDoneSelect.current = true;
    onClose === null || onClose === void 0 ? void 0 : onClose();
  }, [onClose]);
  var isDateDisabled = (0, _react.useCallback)(function (date, selectDate, selectedDone, target) {
    var _disabledDateProp;

    return (_disabledDateProp = disabledDateProp === null || disabledDateProp === void 0 ? void 0 : disabledDateProp(date, selectDate, selectedDone, target)) !== null && _disabledDateProp !== void 0 ? _disabledDateProp : false;
  }, [disabledDateProp]);
  var disabledByBetween = (0, _react.useCallback)(function (start, end, type) {
    // If the date is between the start and the end
    // the button is disabled
    while (_utils.DateUtils.isBefore(start, end) || _utils.DateUtils.isSameDay(start, end)) {
      if (isDateDisabled(start, selectedDates, hasDoneSelect.current, type)) {
        return true;
      }

      start = _utils.DateUtils.addDays(start, 1);
    }

    return false;
  }, [isDateDisabled, selectedDates]);
  var disabledOkButton = (0, _react.useCallback)(function () {
    var start = selectedDates[0],
        end = selectedDates[1];

    if (!start || !end || !hasDoneSelect.current) {
      return true;
    }

    return disabledByBetween(start, end, _utils.DATERANGE_DISABLED_TARGET.TOOLBAR_BUTTON_OK);
  }, [disabledByBetween, selectedDates]);
  var disabledShortcutButton = (0, _react.useCallback)(function (value) {
    if (value === void 0) {
      value = [];
    }

    var _value = value,
        start = _value[0],
        end = _value[1];

    if (!start || !end) {
      return true;
    }

    return disabledByBetween(start, end, _utils.DATERANGE_DISABLED_TARGET.TOOLBAR_SHORTCUT);
  }, [disabledByBetween]);
  var handleDisabledDate = (0, _react.useCallback)(function (date, values, type) {
    return isDateDisabled(date, values, hasDoneSelect.current, type);
  }, [isDateDisabled]);
  var onPickerKeyDown = (0, _Picker.useToggleKeyDownEvent)((0, _extends2.default)({
    triggerRef: triggerRef,
    targetRef: targetRef,
    active: isPickerToggleActive,
    onExit: handleClean
  }, rest));

  var renderDropdownMenu = function renderDropdownMenu(positionProps, speakerRef) {
    var left = positionProps.left,
        top = positionProps.top,
        className = positionProps.className;
    var classes = merge(className, menuClassName, prefix('daterange-menu'));
    var panelClasses = prefix('daterange-panel', {
      'daterange-panel-show-one-calendar': showOneCalendar
    });
    var styles = (0, _extends2.default)({}, menuStyle, {
      left: left,
      top: top
    });
    var panelProps = {
      calendarDate: calendarDate,
      disabledDate: handleDisabledDate,
      format: formatStr,
      hoverRangeValue: hoverDateRange !== null && hoverDateRange !== void 0 ? hoverDateRange : undefined,
      isoWeek: isoWeek,
      limitEndYear: limitEndYear,
      locale: locale,
      showOneCalendar: showOneCalendar,
      showWeekNumbers: showWeekNumbers,
      value: selectedDates,
      showMeridian: showMeridian,
      onChangeCalendarDate: handleChangeCalendarDate,
      onChangeCalendarTime: handleChangeCalendarTime,
      onMouseMove: handleMouseMove,
      onSelect: handleSelectDate,
      onToggleMeridian: handleToggleMeridian,
      renderTitle: renderTitle
    };
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerOverlay, {
      className: classes,
      ref: (0, _utils.mergeRefs)(overlayRef, speakerRef),
      target: triggerRef,
      style: styles
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: panelClasses
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('daterange-content')
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('daterange-header')
    }, getDisplayString(selectedDates)), /*#__PURE__*/_react.default.createElement("div", {
      className: prefix("daterange-calendar-" + (showOneCalendar ? 'single' : 'group'))
    }, /*#__PURE__*/_react.default.createElement(_Calendar2.default, (0, _extends2.default)({
      index: 0
    }, panelProps)), !showOneCalendar && /*#__PURE__*/_react.default.createElement(_Calendar2.default, (0, _extends2.default)({
      index: 1
    }, panelProps)))), /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
      locale: locale,
      calendarDate: selectedDates,
      disabledOkBtn: disabledOkButton,
      disabledShortcut: disabledShortcutButton,
      hideOkBtn: oneTap,
      onOk: handleOK,
      onClickShortcut: handleShortcutPageDate,
      ranges: ranges
    })));
  };

  var hasValue = !(0, _isNil.default)(value) && value.length > 1;

  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends2.default)({}, props, {
    classPrefix: classPrefix,
    name: 'daterange',
    appearance: appearance,
    hasValue: hasValue,
    cleanable: cleanable
  })),
      classes = _usePickerClassName[0],
      usedClassNamePropKeys = _usePickerClassName[1];

  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    pickerProps: (0, _pick.default)(props, _Picker.pickTriggerPropKeys),
    ref: triggerRef,
    placement: placement,
    onEnter: (0, _utils.createChainedFunction)(handleEnter, onEnter),
    onEntered: (0, _utils.createChainedFunction)(handleEntered, onEntered),
    onExited: (0, _utils.createChainedFunction)(handleExited, onExited),
    speaker: renderDropdownMenu
  }, /*#__PURE__*/_react.default.createElement(Component, {
    ref: rootRef,
    className: merge(className, classes, (_merge = {}, _merge[prefix('error')] = inputState === 'Error', _merge)),
    style: style
  }, /*#__PURE__*/_react.default.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, (0, _omit.default)(rest, [].concat(_Picker.omitTriggerPropKeys, usedClassNamePropKeys, _utils.DateUtils.calendarOnlyProps)), {
    as: toggleAs,
    ref: targetRef,
    appearance: appearance,
    input: true,
    inputMask: _utils.DateUtils.getDateMask(rangeFormatStr),
    inputValue: value ? getDisplayString(value, true) : '',
    inputPlaceholder: typeof placeholder === 'string' && placeholder ? placeholder : rangeFormatStr,
    onInputChange: handleInputChange,
    onInputBlur: handleInputPressEnd,
    onInputPressEnter: handleInputPressEnd,
    onKeyDown: onPickerKeyDown,
    onClean: (0, _utils.createChainedFunction)(handleClean, onClean),
    cleanable: cleanable && !disabled,
    hasValue: hasValue,
    active: isPickerToggleActive,
    placement: placement,
    disabled: disabled,
    caretAs: caretAs || _Calendar.default
  }), getDisplayString(value))));
});

DateRangePicker.after = disabledDateUtils.after;
DateRangePicker.afterToday = disabledDateUtils.afterToday;
DateRangePicker.allowedDays = disabledDateUtils.allowedDays;
DateRangePicker.allowedMaxDays = disabledDateUtils.allowedMaxDays;
DateRangePicker.allowedRange = disabledDateUtils.allowedRange;
DateRangePicker.before = disabledDateUtils.before;
DateRangePicker.beforeToday = disabledDateUtils.beforeToday;
DateRangePicker.combine = disabledDateUtils.combine;
DateRangePicker.displayName = 'DateRangePicker';
DateRangePicker.propTypes = (0, _extends2.default)({}, _Picker.pickerPropTypes, {
  ranges: _propTypes.default.array,
  value: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  defaultValue: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  defaultCalendarValue: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  hoverRange: _propTypes.default.oneOfType([_propTypes.default.oneOf(['week', 'month']), _propTypes.default.func]),
  format: _propTypes.default.string,
  isoWeek: _propTypes.default.bool,
  oneTap: _propTypes.default.bool,
  limitEndYear: _propTypes.default.number,
  onChange: _propTypes.default.func,
  onOk: _propTypes.default.func,
  disabledDate: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  showWeekNumbers: _propTypes.default.bool,
  showMeridian: _propTypes.default.bool,
  showOneCalendar: _propTypes.default.bool
});
var _default = DateRangePicker;
exports.default = _default;