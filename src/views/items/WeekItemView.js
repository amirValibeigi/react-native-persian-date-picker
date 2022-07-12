import React from "react";
import { Text } from "react-native";
import { styles } from "../../styles";

/**
 *
 * @param {Object} param0
 * @param {Number} param0.dayOffOfWeek
 * @param {Object} param1
 * @param {String} param1.item
 * @param {index} param1.index
 */
const WeekItemView = ({ dayOffOfWeek }, { item, index }) => {
  return (
    <Text
      style={[styles.weekTitle, dayOffOfWeek === index && styles.offDayTitle]}
    >
      {item}
    </Text>
  );
};

export default WeekItemView;
