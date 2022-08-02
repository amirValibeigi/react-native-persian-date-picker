import React from "react";
import { Text } from "react-native";
import { deepAssign } from "../../libs/Utils";
import { styles } from "../../styles";

/**
 *
 * @param {Object} param0
 * @param {import("react-native").TextStyle} param0.style
 * @param {import("react-native").TextStyle} param0.styleOffDay
 * @param {Number} param0.dayOffOfWeek
 * @param {Object} param1
 * @param {String} param1.item
 * @param {index} param1.index
 */
const WeekItemView = (
  { style, styleOffDay, dayOffOfWeek },
  { item, index }
) => {
  return (
    <Text
      style={[
        styles.weekTitle,
        style,
        dayOffOfWeek === index && deepAssign(styles.offDayTitle, styleOffDay),
      ]}
    >
      {item}
    </Text>
  );
};

export default WeekItemView;
