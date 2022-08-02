import React from "react";
import { FlatList } from "react-native";
import { PERSIAN } from "../libs/Locales";
import WeekItemView from "./items/WeekItemView";

const WeekView = ({ style, locale = PERSIAN, isPersian }) => {
  return (
    <FlatList
      data={locale.nameDaysOfWeek}
      renderItem={WeekItemView.bind(null, {
        style: style?.item,
        styleOffDay: style?.itemOffDay,
        dayOffOfWeek: locale?.dayOffOfWeek,
      })}
      numColumns={7}
      keyExtractor={(item, index) => `${item}:${index}`}
      columnWrapperStyle={isPersian && { flexDirection: "row-reverse" }}
      style={style?.container}
    />
  );
};

export default React.memo(WeekView);
