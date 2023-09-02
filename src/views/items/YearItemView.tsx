import { styles } from '../../styles';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import type { YearMonthType } from '../../types/types';
import type { Locale } from '../../libs/Locales';
import { PERSIAN } from '../../libs/Locales';
import { formatNumber } from '../../libs/Utils';

export declare type YearItemViewAccess = {
  width: number;
  style?: StyleProp<TextStyle>;
  locale?: Locale;
  onPress?: () => void;
};

export declare type YearItemViewProp = {
  item: YearMonthType;
};

const YearItemViewBase = React.memo(
  ({
    style,
    width,
    item,
    locale,
    onPress,
  }: YearItemViewAccess & YearItemViewProp) => {
    const vStyle = React.useMemo(() => ({ width }), [width]);
    const vLocale = React.useMemo(() => locale ?? PERSIAN, [locale]);

    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.yearMonthTitle, vStyle, style]}>
          {item.month + '\t\t\t' + formatNumber(item.year, vLocale)}
        </Text>
      </TouchableOpacity>
    );
  }
);

function YearItemView(access: YearItemViewAccess, props: YearItemViewProp) {
  return <YearItemViewBase {...access} {...props} />;
}

export default YearItemView;
