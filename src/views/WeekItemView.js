import React from 'react';
import {Text} from 'react-native';
import {styles} from './styles';

const WeekItemView = ({dayOffOfWeek}, {item, index}) => {
  return (
    <Text
      style={[styles.weekTitle, dayOffOfWeek === index && styles.offDayTitle]}>
      {item}
    </Text>
  );
};

export default WeekItemView;
