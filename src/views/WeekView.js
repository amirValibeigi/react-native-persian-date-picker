import React from "react";
import { FlatList } from "react-native";
import { PERSIAN } from "../libs/Locales";
import WeekItemView from "./items/WeekItemView";

/**
 *
 * @param {Object} props
 * @param {Object} props.local
 * @param {Array<String>} props.local.nameDaysOfWeek
 * @param {Number} props.local.dayOffOfWeek
 * @param {Object} props.isPersian
 * @returns {React.ReactNode}
 */
const WeekView = ({ local = PERSIAN, isPersian }) => {
  return (
    <FlatList
      data={local.nameDaysOfWeek}
      renderItem={WeekItemView.bind(null, { dayOffOfWeek: local.dayOffOfWeek })}
      numColumns={7}
      keyExtractor={(item, index) => `${item}:${index}`}
      columnWrapperStyle={isPersian && { flexDirection: "row-reverse" }}
    />
  );
};

export default React.memo(WeekView);
