import * as React from "react";
import { ViewStyle } from "react-native";
import { CalendarType, DayType } from "../types/types";
import { StyleDescriptionItem } from "./items/DescriptionItemView";

export declare type StyleDescription = {
  container?: ViewStyle;
  item?: StyleDescriptionItem;
};

export declare type RenderDescription = React.FC<{
  days: DayType;
  style?: StyleDescription;
}>;

declare function DescriptionView(props: {
  style?: StyleDescription;

  days: Array<DayType>;
  selectedDays: Array<String>;
  userDate: Object;
  type: CalendarType;
  isPersian: Boolean;
  show: Boolean;

  renderDescription: RenderDescription;
}): React.ReactNode;

export default DescriptionView;
