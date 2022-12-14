export { default as addDays } from 'date-fns/addDays';
export { default as addMonths } from 'date-fns/addMonths';
export { default as compareAsc } from 'date-fns/compareAsc';
export { default as endOfDay } from 'date-fns/endOfDay';
export { default as endOfISOWeek } from 'date-fns/endOfISOWeek';
export { default as endOfMonth } from 'date-fns/endOfMonth';
export { default as endOfWeek } from 'date-fns/endOfWeek';
export { default as format } from 'date-fns/format';
export { default as getDate } from 'date-fns/getDate';
export { default as getDay } from 'date-fns/getDay';
export { default as getDaysInMonth } from 'date-fns/getDaysInMonth';
export { default as getHours } from 'date-fns/getHours';
export { default as getMinutes } from 'date-fns/getMinutes';
export { default as getMonth } from 'date-fns/getMonth';
export { default as getSeconds } from 'date-fns/getSeconds';
export { default as getYear } from 'date-fns/getYear';
export { default as isAfter } from 'date-fns/isAfter';
export { default as isBefore } from 'date-fns/isBefore';
export { default as isEqual } from 'date-fns/isEqual';
export { default as isSameDay } from 'date-fns/isSameDay';
export { default as isSameMonth } from 'date-fns/isSameMonth';
export { default as isSameSecond } from 'date-fns/isSameSecond';
export { default as parse } from 'date-fns/parse';
export { default as parseISO } from 'date-fns/parseISO';
export { default as setDate } from 'date-fns/setDate';
export { default as setHours } from 'date-fns/setHours';
export { default as setMinutes } from 'date-fns/setMinutes';
export { default as setMonth } from 'date-fns/setMonth';
export { default as setSeconds } from 'date-fns/setSeconds';
export { default as setYear } from 'date-fns/setYear';
export { default as startOfDay } from 'date-fns/startOfDay';
export { default as startOfISOWeek } from 'date-fns/startOfISOWeek';
export { default as startOfMonth } from 'date-fns/startOfMonth';
export { default as startOfWeek } from 'date-fns/startOfWeek';
export { default as subDays } from 'date-fns/subDays';
export { default as isMatch } from 'date-fns/isMatch';
export { default as isValid } from 'date-fns/isValid';
export declare type CalendarOnlyPropsType = 'disabledHours' | 'disabledMinutes' | 'disabledSeconds' | 'hideHours' | 'hideMinutes' | 'hideSeconds';
export declare const calendarOnlyProps: CalendarOnlyPropsType[];
/**
 * Verify that the time is valid.
 * @param props
 * @param date
 */
export declare function disabledTime(props: any, date: Date): boolean;
export declare const omitHideDisabledProps: <T extends Record<string, any>>(props: T) => Partial<Omit<T, CalendarOnlyPropsType>>;
export declare const shouldTime: (format: string) => boolean;
export declare const shouldMonth: (format: string) => boolean;
export declare const shouldDate: (format: string) => boolean;
export declare const shouldOnlyTime: (format: string) => boolean;
/**
 * Get all weeks of this month
 * @params monthDate
 * @return date[]
 */
export declare function getMonthView(monthDate: Date, isoWeek: boolean): Date[];
export declare function getDateMask(formatStr: string): (string | RegExp)[];
