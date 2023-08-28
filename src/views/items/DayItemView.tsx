import React from 'react';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';
import { deepAssign, formatNumber } from '../../libs/Utils';
import { styles } from '../../styles';
import { type CalendarType, type DayType } from '../../types/types';
import { type Locale } from '../../libs/Locales';

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

const DayItemView = React.memo(
  ({
    item,
    style,
    type,
    locale,
    isPersian,
    isSelected,
    isSelectedFirst,
    isSelectedLast,
    isSelectedMiddle,
    onPress,
  }: DayItemViewProp) => {
    return (
      <TouchableOpacity
        disabled={Boolean(!item || item.isDisabled)}
        onPress={onPress?.bind(null, item)}
        style={[
          styles.dayBase,
          style?.container,
          item.isToday && deepAssign(styles.todayBase, style?.containerIsToday),
          isSelected &&
            deepAssign(styles.selectDayBase, style?.containerIsSelected),
          item.isDisabled &&
            deepAssign(styles.disabledDayBase, style?.containerIsDisabled),
          ((!isPersian && isSelectedFirst) || (isPersian && isSelectedLast)) &&
            deepAssign(styles.selectStartDayBase, style?.containerSelectStart),
          ((!isPersian && isSelectedLast) || (isPersian && isSelectedFirst)) &&
            deepAssign(styles.selectEndDayBase, style?.containerSelectEnd),
          isSelectedMiddle &&
            deepAssign(
              styles.selectMiddleDayBase,
              style?.containerSelectMiddle
            ),
          type !== 'range' && styles.selectDayMargin,
        ]}
      >
        <Text
          style={[
            styles.dayTitle,
            style?.title,
            item.isToday &&
              !item.isDisabled &&
              deepAssign(styles.todayTitle, style?.titleIsToday),
            isSelected &&
              deepAssign(styles.selectDayTitle, style?.titleIsSelected),
            isSelectedMiddle &&
              deepAssign(
                styles.selectMiddleDayBase,
                style?.titleIsSelectedMiddle
              ),
            item.isOffDay &&
              deepAssign(styles.offDayTitle, style?.titleIsOffDay),
            isPersian && deepAssign(styles.textL, style?.titleIsPersian),
          ]}
        >
          {formatNumber(item.day, locale)}
        </Text>

        <Text
          style={[
            styles.dayOccasion,
            style?.occasion,
            item.isOffDay &&
              deepAssign(styles.offDayTitle, style?.occasionIsOffDay),
            item.description &&
              deepAssign(styles.dayOccasionShow, style?.occasionDescription),
          ]}
        >
          ☼
        </Text>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.index === nextProps.index &&
      prevProps.isSelectedFirst === nextProps.isSelectedFirst &&
      prevProps.isSelectedMiddle === nextProps.isSelectedMiddle &&
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.isSelectedLast === nextProps.isSelectedLast &&
      prevProps.isPersian === nextProps.isPersian &&
      prevProps.type === nextProps.type &&
      prevProps.style === nextProps.style &&
      prevProps.item.day === nextProps.item.day &&
      prevProps.item.isDisabled === nextProps.item.isDisabled &&
      prevProps.item.isOffDay === nextProps.item.isOffDay &&
      prevProps.item.isToday === nextProps.item.isToday &&
      prevProps.item.description === nextProps.item.description
    );
  }
);

export default DayItemView;
