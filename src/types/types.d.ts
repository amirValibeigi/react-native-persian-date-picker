import type { Moment, MomentInput } from 'jalali-moment';

export declare type DateType = MomentInput;

export declare type DisableDateType = {
  date: Moment;
  inclusivity?: '<' | '=' | '>';
};

export declare type DayType = {
  date?: DateType;
  isOffDay?: boolean;
  isToday?: boolean;
  isDisabled?: boolean;
  day?: number | string;
  description?: string;
};

/**
 * size type
 *
 * f: Full flex:1
 * m: Medium 300
 * s: Small 250
 */
export declare type SizeType = 's' | 'm' | 'f';

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
export declare type CalendarType = 'calendar' | 'range' | 'one' | 'multi';

export declare type YearMonthType = {
  monthNumber: number;
  month: string | number;
  year: string | number;
};

export declare type OnChangeYearMonth = (
  year: number,
  month: number,
  isPersian: boolean
) => void;
