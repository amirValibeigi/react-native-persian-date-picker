import React from 'react';
import {
  FlatList,
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { styles } from '../../styles';
import { type Moment } from 'jalali-moment';
import { type Locale } from '../../libs/Locales';
import { useUI } from './hooks';
import type { OnChangeYearMonth } from '../../types/types';

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
  onChangeYearMonth?: OnChangeYearMonth;
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
  onChangeYearMonth,
}: YearMonthViewType) {
  const {
    refList,
    years,
    width,
    getItemLayout,
    refViewabilityConfigCallbackPairs,
    onLayout,
    renderItem,
  } = useUI({
    isPersian,
    userDate,
    locale,
    onChangeYearMonth,
  });

  return (
    <View style={[styles.yearBase, style?.container]}>
      {(renderNextMonth && renderNextMonth({ onPress: onPressNext })) || (
        <TouchableOpacity onPress={onPressNext}>
          <Text style={[styles.arrow, style?.icons]}>{'<'}</Text>
        </TouchableOpacity>
      )}

      <FlatList
        ref={refList}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={width}
        getItemLayout={getItemLayout}
        bounces={false}
        decelerationRate={0}
        snapToAlignment="start"
        data={years}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.year}_${item.month}`}
        onLayout={onLayout}
        viewabilityConfigCallbackPairs={
          refViewabilityConfigCallbackPairs.current
        }
      />

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
