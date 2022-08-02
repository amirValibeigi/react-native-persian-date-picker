import * as React from "react";
import { TextStyle } from "react-native";

declare function WeekItemView(
  props: {
    style?: TextStyle;
    styleOffDay?: TextStyle;
    dayOffOfWeek: Number;
  },
  item: {
    item: String | Number;
    index: Number;
  }
): React.ReactNode;

export default WeekItemView;
