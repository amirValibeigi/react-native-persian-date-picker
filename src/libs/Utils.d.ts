import { Locale, PERSIAN } from "./Locales";
import { CalendarType, DateType, DayType } from "../types/types";

export declare function formatNumber(
  num: String | Number,
  locale: Locale = PERSIAN
): String;

export declare function isMonth(
  isPersian: Boolean,
  date: DateType,
  dateMonth: DateType
): Boolean;

export declare function isAfterMonth(
  date: DateType,
  dateMonth: DateType
): Boolean;

export declare function getNumberSelectedDays(
  selectedDays: Array<String>,
  userDate: DateType,
  type: CalendarType = "calendar",
  isPersian: Boolean = true
): Number;

export declare function getSelectedDays(
  selectedDays: Array<String>,
  userDate: DateType,
  isPersian: Boolean = true
): Array<String>;

export declare function getDescriptionSelectedDays(
  days: Array<DayType>,
  selectedDays: Array<String>,
  userDate: DateType,
  isPersian: Boolean = true
): Array<DayType>;

export declare function getSplitDate(
  isPersian: Boolean,
  date: DateType
): Array<Number>;

/**
 * @param {Object} local
 * @param {DateType} userDate
 * @param {Array<Object>} days
 * @param {Array<{date:Number|String,inclusivity:'<'|'='|'>'}>} disabledDays
 * @returns {Array<Object>}
 */
export declare function fillDays(
  local: Locale,
  userDate: DateType,
  disabledDays: Array<DateType>,
  days: Array<DayType>
): Array<DayType>;

export declare function mixDisabledDate(props: {
  minDate: DateType;
  disabledDate: Array<DateType>;
  maxDate: DateType;
  inputDateFormat: String;
}): Array<{
  date: DateType;
  inclusivity: "<" | "=" | ">";
}>;

export declare function safeParseDate(
  date: DateType,
  inputDateFormat: String
): DateType;

export declare function deepAssign(...objects: Object): Object;
