import React from 'react';
import {
  FlatList,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { type Locale, PERSIAN } from '../libs/Locales';
import WeekItemView from './items/WeekItemView';
import { styles } from '../styles';

export declare type StyleWeek = {
  item?: StyleProp<TextStyle>;
  itemOffDay?: StyleProp<TextStyle>;
  container?: StyleProp<ViewStyle>;
};

export declare type WeekViewType = {
  style?: StyleWeek;
  locale?: Locale;
  isPersian: boolean;
};

const WeekView = ({ style, locale = PERSIAN, isPersian }: WeekViewType) => {
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
      columnWrapperStyle={isPersian && styles.rowReverse}
      style={style?.container}
    />
  );
};

export default React.memo(WeekView);
