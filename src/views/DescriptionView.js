import React from "react";
import { FlatList, View } from "react-native";
import { getDescriptionSelectedDays } from "../libs/Utils";
import { styles } from "../styles";
import DescriptionItemView from "./items/DescriptionItemView";

/**
 *
 * @param {Object} props
 * @param {Array<Object>} props.days
 * @param {Array<String>} props.selectedDays
 * @param {String} props.userDate
 * @param {"calendar"|"range"|"one"|"multi"} props.type
 * @param {Boolean} props.isPersian
 * @param {Boolean} props.show
 * @returns
 */
const DescriptionView = ({
  days,
  selectedDays,
  userDate,
  renderDescription,
  type = "calendar",
  isPersian = true,
  show = true,
}) => {
  if (!show || _days?.length == 0 || type == "multi" || type == "range")
    return <></>;

  const _days = React.useMemo(
    () => getDescriptionSelectedDays(days, selectedDays, userDate, isPersian),
    [days, selectedDays, userDate, isPersian]
  );

  if (renderDescription) {
    return renderDescription({ days: _days });
  }

  return (
    <FlatList
      data={_days}
      keyExtractor={(item, index) => `${item}:${index}`}
      renderItem={DescriptionItemView}
      ListHeaderComponent={_days?.length > 0 && <View style={styles.line} />}
    />
  );
};

export default React.memo(DescriptionView);
