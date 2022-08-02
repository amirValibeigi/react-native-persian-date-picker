import * as React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { DayType } from "../types/types";

export declare type StyleDescriptionItem = {
  container?: ViewStyle;
  title?: TextStyle;
  titleIsOffDay?: TextStyle;
};

declare function DescriptionItemView(props: {
  style?: StyleDescriptionItem;
  item: DayType;
}): React.ReactNode;

export default DescriptionItemView;
