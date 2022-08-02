import React from "react";
import { FlatList, View } from "react-native";
import { getDescriptionSelectedDays } from "../libs/Utils";
import { styles } from "../styles";
import DescriptionItemView from "./items/DescriptionItemView";

const DescriptionView = ({
  style,
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const _days = React.useMemo(
    () => getDescriptionSelectedDays(days, selectedDays, userDate, isPersian),
    [days, selectedDays, userDate, isPersian]
  );

  if (renderDescription) {
    return renderDescription({ days: _days, style });
  }

  return (
    <FlatList
      data={_days}
      keyExtractor={(item, index) => `${item}:${index}`}
      renderItem={DescriptionItemView.bind(null, { style: style?.item })}
      ListHeaderComponent={_days?.length > 0 && <View style={styles.line} />}
      style={style?.container}
    />
  );
};

export default React.memo(DescriptionView);
