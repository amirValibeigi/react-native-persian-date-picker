import { styles } from '../../styles';
import { type StyleProp, Text, type TextStyle } from 'react-native';
import React from 'react';
import type { YearMonthType } from '../../types/types';

export declare type YearItemViewAccess = {
  width: number;
  style?: StyleProp<TextStyle>;
};

export declare type YearItemViewProp = {
  item: YearMonthType;
};

const YearItemViewBase = React.memo(
  ({ style, width, item }: YearItemViewAccess & YearItemViewProp) => {
    const vStyle = React.useMemo(() => ({ width }), [width]);

    return (
      <Text style={[styles.yearMonthTitle, vStyle, style]}>
        {item.month + '\t\t\t' + item.year}
      </Text>
    );
  }
);

function YearItemView(access: YearItemViewAccess, props: YearItemViewProp) {
  return <YearItemViewBase {...access} {...props} />;
}

export default YearItemView;
