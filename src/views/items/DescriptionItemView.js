import React from "react";
import { Text, View } from "react-native";
import { deepAssign } from "../../libs/Utils";
import { styles } from "../../styles";

function DescriptionItemView({ style }, { item }) {
  return (
    <View style={[styles.descriptionBase, style?.container]}>
      <Text
        style={[
          styles.titleDescription,
          style?.title,
          item.isOffDay &&
            deepAssign(styles.offDayDescription, style?.titleIsOffDay),
        ]}
      >
        {item.description ?? "-"}
      </Text>
    </View>
  );
}

export default DescriptionItemView;
