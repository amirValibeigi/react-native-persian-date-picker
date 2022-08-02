import * as React from "react";
import Locale from "../libs/Locales";
import { TextStyle, ViewStyle } from "react-native";

export declare type StyleYearMonth = {
  container?: ViewStyle;
  icons?: TextStyle;
  title?: TextStyle;
};

export declare type RenderNextMonth = React.FC<{
  onPress: () => void;
}>;

export declare type RenderPreviousMonth = React.FC<{
  onPress: () => void;
}>;

declare function YearMonthView(props: {
  style?: StyleYearMonth;

  userDate: Object;
  locale: Locale;
  isPersian: Boolean;

  renderNextMonth: RenderNextMonth;
  renderPreviousMonth: RenderPreviousMonth;

  onPressNext: () => void;
  onPressPrevious: () => void;
}): React.ReactNode;

export default YearMonthView;
