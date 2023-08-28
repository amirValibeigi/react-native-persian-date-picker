import React from 'react';
import { type StyleProp, Text, type TextStyle } from 'react-native';
import { deepAssign } from '../../libs/Utils';
import { styles } from '../../styles';

export declare type WeekItemViewAccess = {
  style?: StyleProp<TextStyle>;
  styleOffDay?: StyleProp<TextStyle>;
  dayOffOfWeek: number;
};
export declare type WeekItemViewProp = {
  item: string | number;
  index: number;
};

const WeekItemView = (
  { style, styleOffDay, dayOffOfWeek }: WeekItemViewAccess,
  { item, index }: WeekItemViewProp
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
