import { styles } from '../../styles';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import type { YearMonthType } from '../../types/types';

export declare type YearItemViewAccess = {
  width: number;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
};

export declare type YearItemViewProp = {
  item: YearMonthType;
};

const YearItemViewBase = React.memo(
  ({ style, width, item, onPress }: YearItemViewAccess & YearItemViewProp) => {
    const vStyle = React.useMemo(() => ({ width }), [width]);

    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.yearMonthTitle, vStyle, style]}>
          {item.month + '\t\t\t' + item.year}
        </Text>
      </TouchableOpacity>
    );
  }
);

function YearItemView(access: YearItemViewAccess, props: YearItemViewProp) {
  return <YearItemViewBase {...access} {...props} />;
}

export default YearItemView;
