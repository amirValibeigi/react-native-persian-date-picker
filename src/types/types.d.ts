export declare type DateType = String | Number | Date;

export declare type DayType = {
  date?: DateType;
  isOffDay?: Boolean;
  isToday?: Boolean;
  description?: String;
};

export declare type DateType = Date | String | Number | Object;

/**
 * size type
 *
 * f: Full flex:1
 * m: Medium 300
 * s: Small 250
 */
export declare type SizeType = "s" | "m" | "f";

/**
 * calendar type
 *
 * calendar: normal calendar
 *
 * multi: select multi date
 *
 * one: select one date
 *
 * range: select range date
 */
export declare type CalendarType = "calendar" | "range" | "one" | "multi";
