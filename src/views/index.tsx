import React from 'react';
import { FlatList, View } from 'react-native';
import { PERSIAN } from '../libs/Locales';
import { styles } from '../styles';
import WeekView from './WeekView';
import DescriptionView from './DescriptionView';
import YearMonthView from './YearMonthView';
import type { PersianDatePickerProps } from './index.types';
import { useUI } from './hooks';

export const PersianDatePicker = React.memo((props: PersianDatePickerProps) => {
  const {
    locale = PERSIAN,
    size = 'f',
    type = 'calendar',
    showDescription,
    renderDescription,
    renderNextMonth,
    renderPreviousMonth,
    style,
    styleDescription,
    styleWeek,
    styleYearMonth,
  } = props;

  const {
    userDate,
    days,
    selectedDays,
    isPersian,
    onPressPreviousMonth,
    onPressNextMonth,
    renderDayFunc,
  } = useUI(props);

  return (
    <View
      style={[
        styles.container,
        size === 's' && styles.containerS,
        size === 'm' && styles.containerM,
        style,
      ]}
    >
      <YearMonthView
        userDate={userDate}
        isPersian={isPersian}
        locale={locale}
        renderNextMonth={renderNextMonth}
        renderPreviousMonth={renderPreviousMonth}
        style={styleYearMonth}
        onPressNext={onPressNextMonth}
        onPressPrevious={onPressPreviousMonth}
      />

      <WeekView locale={locale} isPersian={isPersian} style={styleWeek} />

      <FlatList
        data={days}
        renderItem={renderDayFunc}
        numColumns={7}
        keyExtractor={(item, index) => `${item.day}:${index}`}
        columnWrapperStyle={isPersian && { flexDirection: 'row-reverse' }}
        ListFooterComponent={
          <DescriptionView
            days={days ?? []}
            selectedDays={selectedDays}
            userDate={userDate}
            type={type}
            isPersian={isPersian}
            show={Boolean(showDescription)}
            renderDescription={renderDescription}
            style={styleDescription}
          />
        }
      />
    </View>
  );
});
