import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FORMAT_ENGLISH, FORMAT_PERSIAN } from "../libs/Format";
import { formatNumber } from "../libs/Utils";
import { styles } from "../styles";

function YearMonthView({
  style,
  userDate,
  locale,
  isPersian,
  renderNextMonth,
  renderPreviousMonth,
  onPressNext,
  onPressPrevious,
}) {
  const [year, month] = userDate
    .format(isPersian ? FORMAT_PERSIAN : FORMAT_ENGLISH)
    .split("-")
    .map((v) => Number(v));

  return (
    <View style={[styles.yearBase, style?.container]}>
      {(renderNextMonth && renderNextMonth({ onPress: onPressNext })) || (
        <TouchableOpacity onPress={onPressNext}>
          <Text style={[styles.arrow, style?.icons]}>{"<"}</Text>
        </TouchableOpacity>
      )}

      <Text style={[styles.yearMonthTitle, style?.title]}>
        {locale.nameMonth[month - 1] + "\t\t\t" + formatNumber(year, locale)}
      </Text>

      {(renderPreviousMonth &&
        renderPreviousMonth({ onPress: onPressPrevious })) || (
        <TouchableOpacity onPress={onPressPrevious}>
          <Text style={[styles.arrow, style?.icons]}>{">"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default React.memo(YearMonthView);
