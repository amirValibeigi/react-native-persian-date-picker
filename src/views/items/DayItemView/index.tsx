import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { formatNumber } from '../../../libs/Utils';
import { styles } from '../../../styles';
import type { DayItemViewProp } from './index.types';

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
          item.isToday && [styles.todayBase, style?.containerIsToday],
          isSelected && [styles.selectDayBase, style?.containerIsSelected],
          item.isDisabled && [
            styles.disabledDayBase,
            style?.containerIsDisabled,
          ],
          ((!isPersian && isSelectedFirst) ||
            (isPersian && isSelectedLast)) && [
            styles.selectStartDayBase,
            style?.containerSelectStart,
          ],
          ((!isPersian && isSelectedLast) ||
            (isPersian && isSelectedFirst)) && [
            styles.selectEndDayBase,
            style?.containerSelectEnd,
          ],
          isSelectedMiddle && [
            styles.selectMiddleDayBase,
            style?.containerSelectMiddle,
          ],
          type !== 'range' && styles.selectDayMargin,
        ]}
      >
        <Text
          style={[
            styles.dayTitle,
            style?.title,
            item.isToday &&
              !item.isDisabled && [styles.todayTitle, style?.titleIsToday],
            isSelected && [styles.selectDayTitle, style?.titleIsSelected],
            isSelectedMiddle && [
              styles.selectMiddleDayBase,
              style?.titleIsSelectedMiddle,
            ],
            item.isOffDay && [styles.offDayTitle, style?.titleIsOffDay],
            isPersian && [styles.textL, style?.titleIsPersian],
          ]}
        >
          {formatNumber(item.day, locale)}
        </Text>

        <Text
          style={[
            styles.dayOccasion,
            style?.occasion,
            item.isOffDay && [styles.offDayTitle, style?.occasionIsOffDay],
            item.description
              ? [styles.dayOccasionShow, style?.occasionDescription]
              : undefined,
          ]}
        >
          ☼
        </Text>
      </TouchableOpacity>
    );
  }
);

export default DayItemView;
