import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import React from 'react';
import { Moment } from 'jalali-moment';
import { Locale } from '../../libs/Locales';
import { OnChangeYearMonth } from '../../types/types';

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

  onPress?: () => void;
  onPressNext?: () => void;
  onPressPrevious?: () => void;
  onChangeYearMonth?: OnChangeYearMonth;
};
