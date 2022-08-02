import * as React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { Locale } from "../../index";
import { CalendarType } from "../../types/types";
import { DayType } from "../types/types";

export declare type StyleDayItem = {
  container?: ViewStyle;
  containerIsToday?: ViewStyle;
  containerIsSelected?: ViewStyle;
  containerIsDisabled?: ViewStyle;
  containerSelectStart?: ViewStyle;
  containerSelectEnd?: ViewStyle;
  containerSelectMiddle?: ViewStyle;

  title?: TextStyle;
  titleIsToday?: TextStyle;
  titleIsSelected?: TextStyle;
  titleIsSelectedMiddle?: TextStyle;
  titleIsOffDay?: TextStyle;
  titleIsPersian?: TextStyle;

  occasion?: TextStyle;
  occasionIsOffDay?: TextStyle;
  occasionDescription?: TextStyle;
};

declare function DayItemView(props: {
  style?: StyleDayItem;

  item: DayType;
  type: CalendarType;
  locale: Locale;
  isPersian: Boolean;
  isSelected: Boolean;
  isSelectedFirst: Boolean;
  isSelectedLast: Boolean;
  isSelectedMiddle: Boolean;

  onPress: () => void;
}): React.ReactNode;

export default DayItemView;
