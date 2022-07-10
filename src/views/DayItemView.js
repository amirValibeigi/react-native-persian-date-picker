import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {formatNumber} from './libs/Utils';
import {styles} from './styles';

/**
 *
 * @param {Object} propsC
 * @param {Object} propsC.local
 * @param {Boolean} propsC.isFa
 * @param {String|Number} propsC.today
 * @param {Number} propsC.offDay
 * @param {Array<Number|String>} propsC.selectedDays
 * @param {"calendar"|"range"|"one"|"multi"} propsC.type
 * @param {(item:String)=>void} propsC.onPress
 *
 * @param {Object} props
 * @param {Object} props.item
 * @param {String} props.item.day
 * @param {Boolean} props.item.occasion
 * @returns {React.ReactNode}
 */
const DayItemView = (
  {local, isFa, selectedDays, type, today, offDay, onPress},
  {item, index},
) => {
  const isOffDay = (index + 1) % offDay === 0;
  const isToday = item === today;
  const {isSelected, isSelectedFirst, isSelectedLast, isSelectedMiddle} =
    statusSelected(item.day, type, selectedDays);

  return (
    <_DayItemView
      key={`${item}:${index}`}
      item={item}
      type={type}
      local={local}
      isToday={isToday}
      isOffDay={isOffDay}
      isFa={isFa}
      isSelected={isSelected}
      isSelectedFirst={isSelectedFirst}
      isSelectedLast={isSelectedLast}
      isSelectedMiddle={isSelectedMiddle}
      onPress={onPress}
    />
  );
};

const _DayItemView = React.memo(
  ({
    item,
    type,
    local,
    isToday,
    isOffDay,
    isFa,
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
          isToday && styles.todayBase,
          isSelected && styles.selectDayBase,
          isSelectedFirst && styles.selectStartDayBase,
          isSelectedLast && styles.selectEndDayBase,
          isSelectedMiddle && styles.selectMiddleDayBase,
          type != 'range' && styles.selectDayMargin,
        ]}>
        <Text
          style={[
            styles.dayTitle,
            isToday && styles.todayTitle,
            isSelected && styles.selectDayTitle,
            isSelectedMiddle && styles.selectMiddleDayBase,
            isOffDay && styles.offDayTitle,
            isFa && styles.textL,
          ]}>
          {formatNumber(item.day, local)}
        </Text>

        <Text
          style={[
            styles.dayOccasion,
            isOffDay && styles.offDayTitle,
            item.occasion && styles.dayOccasionShow,
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
      pP.isFa !== nP.isFa ||
      pP.isSelected !== nP.isSelected ||
      pP.isSelectedFirst !== nP.isSelectedFirst ||
      pP.isSelectedLast !== nP.isSelectedLast ||
      pP.isSelectedMiddle !== nP.isSelectedMiddle ||
      pP.onPress !== nP.onPress
    );
  },
);

/**
 * @param {String} item
 * @param {"calendar"|"range"|"one"|"multi"} type
 * @param {Array<Number|String>} selectedDays
 */
function statusSelected(item, type, selectedDays) {
  const indexSelected = selectedDays.indexOf(item);
  let isSelected = indexSelected >= 0;
  let isSelectedFirst = false;
  let isSelectedLast = false;
  let isSelectedMiddle = false;

  if (type === 'range' && selectedDays.length >= 2) {
    const isInRange =
      item > selectedDays[0] && item < selectedDays[selectedDays.length - 1];
    isSelectedFirst = indexSelected === 0;
    isSelectedLast = selectedDays.length === indexSelected + 1;
    isSelectedMiddle =
      (indexSelected > 0 || isInRange) && isSelectedLast === false;

    isSelected = isSelected || isInRange;
  }

  return {
    isSelected,
    isSelectedFirst,
    isSelectedLast,
    isSelectedMiddle,
  };
}

export default DayItemView;
