import React from 'react';
import {Text, View} from 'react-native';
import {PERSIAN} from './libs/Locales';
import {styles} from './styles';

/**
 *
 * @param {Object} props
 * @param {Object} props.local
 * @param {Array<String>} props.local.nameDaysOfWeek
 * @param {Number} props.local.dayOffOfWeek
 * @returns {React.ReactNode}
 */
const WeekView = ({local = PERSIAN, size}) => {
  return (
    <View style={styles.weekBase}>
      {local.nameDaysOfWeek?.map((name, index) => (
        <Text
          key={index}
          style={[
            styles.weekTitle,
            local.dayOffOfWeek === index && styles.offDayTitle,
            size && styles.offDayTitle,
          ]}>
          {name}
        </Text>
      ))}
    </View>
  );
};

export default React.memo(WeekView);
