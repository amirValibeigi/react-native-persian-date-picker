import * as React from "react";
import Locale from "../libs/Locales";
import { TextStyle, ViewStyle } from "react-native";

export declare type StyleWeek = {
  container?: ViewStyle;
  item?: TextStyle;
  itemOffDay?: TextStyle;
};

declare function YearMonthView(props: {
  style?: StyleWeek;

  locale: Locale;
  isPersian: Boolean;
}): React.ReactNode;

export default YearMonthView;
