import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {formatNumber} from './libs/Utils';
import {styles} from './styles';

const DayItemView = React.memo(
  ({
    item,
    type,
    local,
    isPersian,
    isSelected,
    isSelectedFirst,
    isSelectedLast,
    isSelectedMiddle,
    onPress,
  }) => {
    return (
      <TouchableOpacity
        disabled={!item}
        onPress={onPress?.bind(null, item)}
        style={[
          styles.dayBase,
          item.isToday && styles.todayBase,
          isSelected && styles.selectDayBase,
          ((!isPersian && isSelectedFirst) || (isPersian && isSelectedLast)) &&
            styles.selectStartDayBase,
          ((!isPersian && isSelectedLast) || (isPersian && isSelectedFirst)) &&
            styles.selectEndDayBase,
          isSelectedMiddle && styles.selectMiddleDayBase,
          type != 'range' && styles.selectDayMargin,
        ]}>
        <Text
          style={[
            styles.dayTitle,
            item.isToday && styles.todayTitle,
            isSelected && styles.selectDayTitle,
            isSelectedMiddle && styles.selectMiddleDayBase,
            item.isOffDay && styles.offDayTitle,
            isPersian && styles.textL,
          ]}>
          {formatNumber(item.day, local)}
        </Text>

        <Text
          style={[
            styles.dayOccasion,
            item.isOffDay && styles.offDayTitle,
            item.description && styles.dayOccasionShow,
          ]}>
          ☼
        </Text>
      </TouchableOpacity>
    );
  },
  (pP, nP) => {
    return !(
      pP.item !== nP.item ||
      pP.type !== nP.type ||
      pP.local !== nP.local ||
      pP.isToday !== nP.isToday ||
      pP.isOffDay !== nP.isOffDay ||
      pP.isPersian !== nP.isPersian ||
      pP.isSelected !== nP.isSelected ||
      pP.isSelectedFirst !== nP.isSelectedFirst ||
      pP.isSelectedLast !== nP.isSelectedLast ||
      pP.isSelectedMiddle !== nP.isSelectedMiddle ||
      pP.onPress !== nP.onPress
    );
  },
);

export default DayItemView;
