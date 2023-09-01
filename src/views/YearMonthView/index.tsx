import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../styles';
import { useUI } from './hooks';
import type { YearMonthViewType } from './index.types';

function YearMonthView({
  style,
  userDate,
  locale,
  isPersian,
  renderNextMonth,
  renderPreviousMonth,
  onPress,
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
    onPress,
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
        scrollEnabled={false} //TODO: fix bug temporary
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
        initialNumToRender={6}
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
