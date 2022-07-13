import React from "react";
import { FlatList } from "react-native";
import { PERSIAN } from "../libs/Locales";
import WeekItemView from "./items/WeekItemView";

/**
 *
 * @param {Object} props
 * @param {Object} props.locale
 * @param {Array<String>} props.locale.nameDaysOfWeek
 * @param {Number} props.locale.dayOffOfWeek
 * @param {Object} props.isPersian
 * @returns {React.ReactNode}
 */
const WeekView = ({ locale = PERSIAN, isPersian }) => {
  return (
    <FlatList
      data={locale.nameDaysOfWeek}
      renderItem={WeekItemView.bind(null, {
        dayOffOfWeek: locale.dayOffOfWeek,
      })}
      numColumns={7}
      keyExtractor={(item, index) => `${item}:${index}`}
      columnWrapperStyle={isPersian && { flexDirection: "row-reverse" }}
    />
  );
};

export default React.memo(WeekView);
