import React from 'react';
import { Text, type TextStyle, View, type ViewStyle } from 'react-native';
import { deepAssign } from '../../libs/Utils';
import { styles } from '../../styles';
import type { DayType } from '../../types/types';

export declare type DescriptionItemStyle = {
  container?: ViewStyle;
  title?: TextStyle;
  titleIsOffDay?: TextStyle;
};

export declare type DescriptionItemAccess = {
  style?: DescriptionItemStyle;
};

export declare type DescriptionItemViewProp = {
  item: DayType;
};

function DescriptionItemView(
  { style }: DescriptionItemAccess,
  { item }: DescriptionItemViewProp
) {
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
        {item.description ?? '-'}
      </Text>
    </View>
  );
}

export default DescriptionItemView;
