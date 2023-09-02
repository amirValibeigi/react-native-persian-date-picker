import { CalendarType, DayType, SizeType } from '../types/types';
import { Locale } from '../libs/Locales';
import { StyleDayItem } from './items/DayItemView/index.types';
import { StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import {
  RenderNextMonth,
  RenderPreviousMonth,
  StyleYearMonth,
} from './YearMonthView/index.types';
import { StyleWeek } from './WeekView';
import { RenderDescription, StyleDescription } from './DescriptionView';
import type { Moment, MomentInput } from 'jalali-moment';

export declare type RenderDay = (
  props: RenderDayItemViewAccess & RenderDayItemViewProp
) => React.JSX.Element;

export declare type PersianDatePickerProps = {
  style?: StyleProp<ViewStyle>;
  styleYearMonth?: StyleYearMonth;
  styleWeek?: StyleWeek;
  styleDay?: StyleDayItem;
  styleDescription?: StyleDescription;

  locale?: Locale;

  /**
   * date:
   * show this month
   *
   * @example
   * date="2022-08-02"
   *
   * ----
   * @example
   * date="1401-05-11"
   * inputDateFormat="jYYYY-jMM-jDD"
   *
   */
  date?: MomentInput;

  /**
   * min date:
   * disable before of date
   *
   * @example
   * minDate="2022-08-02"
   *
   * ----
   * @example
   * minDate="1401-05-11"
   * inputDateFormat="jYYYY-jMM-jDD"
   *
   */
  minDate?: MomentInput;

  /**
   * max date:
   * disable after of date
   *
   * @example
   * maxDate="2022-08-02"
   *
   * ----
   * @example
   * maxDate="1401-05-11"
   * inputDateFormat="jYYYY-jMM-jDD"
   *
   */
  maxDate?: MomentInput;

  /**
   * disabled date:
   * disable date
   *
   * @example
   * disabledDate=["2022-08-02"]
   *
   * ----
   * @example
   * disabledDate=["1401-05-11"]
   * inputDateFormat="jYYYY-jMM-jDD"
   *
   */
  disabledDate?: Array<MomentInput>;

  /**
   * days:
   * Add events to days
   *
   * @example
   *
   * inputDateFormat="jYYYY-jMM-jDD"
   * days=[
   {date: '1401-01-06', isOffDay: false, description: 'روز امید، روز شادباش نویسی'},
   {date: '1401-01-13', isOffDay: true, description: 'جشن سیزده به در'},
   ]

   *
   */
  days?: Array<Omit<DayType, 'day' | 'isToday' | 'isDisabled'>>;

  /**
   * input date format:
   * Format of input dates
   */
  inputDateFormat?: string;

  /**
   * output date format:
   * Format of output dates
   */
  outputDateFormat?: string;

  showDescription?: boolean;
  renderDescription?: RenderDescription;
  renderNextMonth?: RenderNextMonth;
  renderPreviousMonth?: RenderPreviousMonth;
  renderDay?: RenderDay;

  /**
   * size type
   *
   * f: Full flex:1
   * m: Medium 300
   * s: Small 250
   */
  size?: SizeType;

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
  type?: CalendarType;

  onPressDay?: (dates: Array<string>) => void;
  onChangeYearMonth?: (date: string) => void;
};

export declare type PersianDatePickerState = {
  userDate: Moment;
  days: Array<DayType>;
  selectedDays: Array<string, number>;
  isPersian: boolean;
};

export declare type RenderDayItemViewAccess = {
  style?: StyleDayItem;
  locale: Locale;
  isPersian: boolean;
  isSelected: boolean;
  isSelectedFirst: boolean;
  isSelectedLast: boolean;
  isSelectedMiddle: boolean;
  selectedDays: Array<number | string>;
  type: CalendarType;
  onPress: (item: DayType) => void;
};

export declare type RenderDayItemViewProp = {
  item: DayType;
  index: number;
};
