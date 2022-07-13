import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles";

function DescriptionItemView({ item }) {
  return (
    <View style={styles.descriptionBase}>
      <Text
        style={[
          styles.titleDescription,
          item.isOffDay && styles.offDayDescription,
        ]}
      >
        {item.description ?? "-"}
      </Text>
    </View>
  );
}

export default DescriptionItemView;
