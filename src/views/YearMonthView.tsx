import React from 'react';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { FORMAT_ENGLISH, FORMAT_PERSIAN } from '../libs/Format';
import { formatNumber } from '../libs/Utils';
import { styles } from '../styles';
import { type Moment } from 'jalali-moment';
import { type Locale, PERSIAN } from '../libs/Locales';

export declare type StyleYearMonth = {
  container?: StyleProp<ViewStyle>;
  icons?: StyleProp<TextStyle>;
  title?: StyleProp<TextStyle>;
};

export declare type RenderNextMonth = React.FC<{
  onPress?: () => void;
}>;

export declare type RenderPreviousMonth = React.FC<{
  onPress?: () => void;
}>;

export declare type YearMonthViewType = {
  style?: StyleYearMonth;

  userDate: Moment;
  locale?: Locale;
  isPersian?: boolean;

  renderNextMonth?: RenderNextMonth;
  renderPreviousMonth?: RenderPreviousMonth;

  onPressNext?: () => void;
  onPressPrevious?: () => void;
};

function YearMonthView({
  style,
  userDate,
  locale,
  isPersian,
  renderNextMonth,
  renderPreviousMonth,
  onPressNext,
  onPressPrevious,
}: YearMonthViewType) {
  const [year, month] = userDate
    .format(isPersian ? FORMAT_PERSIAN : FORMAT_ENGLISH)
    .split('-')
    .map((v) => Number(v));

  return (
    <View style={[styles.yearBase, style?.container]}>
      {(renderNextMonth && renderNextMonth({ onPress: onPressNext })) || (
        <TouchableOpacity onPress={onPressNext}>
          <Text style={[styles.arrow, style?.icons]}>{'<'}</Text>
        </TouchableOpacity>
      )}

      <Text style={[styles.yearMonthTitle, style?.title]}>
        {(month &&
          year &&
          (locale ?? PERSIAN).nameMonth[month - 1] +
            '\t\t\t' +
            formatNumber(year, locale)) ||
          '-'}
      </Text>

      {(renderPreviousMonth &&
        renderPreviousMonth({ onPress: onPressPrevious })) || (
        <TouchableOpacity onPress={onPressPrevious}>
          <Text style={[styles.arrow, style?.icons]}>{'>'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default React.memo(YearMonthView);
