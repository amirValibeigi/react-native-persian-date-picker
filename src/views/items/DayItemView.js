import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { formatNumber } from "../../libs/Utils";
import { styles } from "../../styles";
/**
 * @type {React.NamedExoticComponent<{item:{isDisabled:Boolean,isToday:Boolean,isOffDay:Boolean,day:String|Number,description:String|Boolean},type:"calendar"|"range"|"one"|"multi",local:Object,isPersian:Boolean,isSelected:Boolean,isSelectedFirst:Boolean,isSelectedLast:Boolean,isSelectedMiddle:Boolean,onPress:()=>void}>}
 */
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
        disabled={!item || item.isDisabled}
        onPress={onPress?.bind(null, item)}
        style={[
          styles.dayBase,
          item.isToday && styles.todayBase,
          isSelected && styles.selectDayBase,
          item.isDisabled && styles.disabledDayBase,
          ((!isPersian && isSelectedFirst) || (isPersian && isSelectedLast)) &&
            styles.selectStartDayBase,
          ((!isPersian && isSelectedLast) || (isPersian && isSelectedFirst)) &&
            styles.selectEndDayBase,
          isSelectedMiddle && styles.selectMiddleDayBase,
          type != "range" && styles.selectDayMargin,
        ]}
      >
        <Text
          style={[
            styles.dayTitle,
            item.isToday && !item.isDisabled && styles.todayTitle,
            isSelected && styles.selectDayTitle,
            isSelectedMiddle && styles.selectMiddleDayBase,
            item.isOffDay && styles.offDayTitle,
            isPersian && styles.textL,
          ]}
        >
          {formatNumber(item.day, local)}
        </Text>

        <Text
          style={[
            styles.dayOccasion,
            item.isOffDay && styles.offDayTitle,
            item.description && styles.dayOccasionShow,
          ]}
        >
          ☼
        </Text>
      </TouchableOpacity>
    );
  }
);

export default DayItemView;
