import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { deepAssign } from "../../libs/Utils";
import { formatNumber } from "../../libs/Utils";
import { styles } from "../../styles";

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
  }) => {
    return (
      <TouchableOpacity
        disabled={!item || item.isDisabled}
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
          type != "range" && styles.selectDayMargin,
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
  }
);

export default DayItemView;
