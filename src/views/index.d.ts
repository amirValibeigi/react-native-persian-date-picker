import React from "react";

interface PersianDatePickerProps {
  local?: Object;
  date?: String | Number | Date;
  minDate?: String | Number | Date;
  maxDate?: String | Number | Date;
  disabledDate?: Array<String | Number | Date>;
  inputDateFormat?: String;
  outputDateFormat?: String;
  days?: Array<{
    date: String | Number;
    isOffDay: Boolean;
    description: String;
  }>;
  size?: "f" | "m" | "s" = "f";
  type?: "calendar" | "range" | "one" | "multi" = "calendar";
  onPressDay?: (day: {
    day: String | Number | Date;
    isOffDay: Boolean;
    isToday: Boolean;
    description: String;
  }) => void;
}

export declare class PersianDatePicker extends React.Component<PersianDatePickerProps> {}
