import { ViewStyle } from "react-native";
import { Locale } from "../index";
import { CalendarType, DayType, SizeType } from "../types/types";
import { RenderDescription, StyleDescription } from "./DescriptionView";
import { StyleDayItem } from "./items/DayItemView";
import { StyleWeek } from "./WeekView";
import {
  RenderNextMonth,
  RenderPreviousMonth,
  StyleYearMonth,
} from "./YearMonthView";

export declare type RenderDay = React.FC<{
  item: DayType;
  index: Number;
  type: CalendarType;
  locale: Locale;
  isPersian: Boolean;
  isSelected: Boolean;
  isSelectedFirst: Boolean;
  isSelectedLast: Boolean;
  isSelectedMiddle: Boolean;
  style?: StyleDayItem;
  onPress: (day: DayType) => void;
}>;

export declare type PersianDatePickerProps = {
  style?: ViewStyle;
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
  date?: String | Number | Date;

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
  minDate?: String | Number | Date;

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
  maxDate?: String | Number | Date;

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
  disabledDate?: Array<String | Number | Date>;

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
  days?: Array<DayType>;

  /**
   * input date format:
   * Format of input dates
   */
  inputDateFormat?: String;

  /**
   * output date format:
   * Format of output dates
   */
  outputDateFormat?: String;

  showDescription?: Boolean;
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

  onPressDay?: (dates: Array<String>) => void;
};

export declare function PersianDatePicker(
  props: PersianDatePickerProps
): JSX.Element;

export declare namespace PersianDatePicker {}
