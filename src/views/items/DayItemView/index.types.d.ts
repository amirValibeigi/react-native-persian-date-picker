import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { CalendarType, DayType } from '../../../types/types';
import { Locale } from 'react-native-persian-date-picker';

export declare type StyleDayItem = {
  container?: StyleProp<ViewStyle>;
  containerIsToday?: StyleProp<ViewStyle>;
  containerIsSelected?: StyleProp<ViewStyle>;
  containerIsDisabled?: StyleProp<ViewStyle>;
  containerSelectStart?: StyleProp<ViewStyle>;
  containerSelectEnd?: StyleProp<ViewStyle>;
  containerSelectMiddle?: StyleProp<ViewStyle>;

  title?: StyleProp<TextStyle>;
  titleIsToday?: StyleProp<TextStyle>;
  titleIsSelected?: StyleProp<TextStyle>;
  titleIsSelectedMiddle?: StyleProp<TextStyle>;
  titleIsOffDay?: StyleProp<TextStyle>;
  titleIsPersian?: StyleProp<TextStyle>;

  occasion?: StyleProp<TextStyle>;
  occasionIsOffDay?: StyleProp<TextStyle>;
  occasionDescription?: StyleProp<TextStyle>;
};

export declare type DayItemViewProp = {
  style?: StyleDayItem;

  index: number;
  item: DayType;
  type: CalendarType;
  locale: Locale;
  isPersian: boolean;
  isSelected: boolean;
  isSelectedFirst: boolean;
  isSelectedLast: boolean;
  isSelectedMiddle: boolean;

  onPress: (item: DayType) => void;
};
