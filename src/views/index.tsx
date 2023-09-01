import React from 'react';
import { FlatList, View } from 'react-native';
import { PERSIAN } from '../libs/Locales';
import { styles } from '../styles';
import WeekView from './WeekView';
import DescriptionView from './DescriptionView';
import YearMonthView from './YearMonthView';
import type { PersianDatePickerProps } from './index.types';
import { useUI } from './hooks';
import SelectYearMonthView from './SelectYearMonthView';

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
    maxDate,
    minDate,
  } = props;

  const {
    refSelectYearMonth,
    days,
    isPersian,
    selectedDays,
    userDate,
    onPressYearMonth,
    onPressNextMonth,
    onPressPreviousMonth,
    renderDayFunc,
    onChangeDate,
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
        onPress={onPressYearMonth}
        onPressNext={onPressNextMonth}
        onPressPrevious={onPressPreviousMonth}
        // onChangeYearMonth={onPressChangeMonth} //TODO: bug
      />

      <WeekView locale={locale} isPersian={isPersian} style={styleWeek} />

      <FlatList
        data={days}
        renderItem={renderDayFunc}
        numColumns={7}
        keyExtractor={(item, index) => `${item.day}:${index}`}
        columnWrapperStyle={isPersian && styles.rowReverse}
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
      <SelectYearMonthView
        ref={refSelectYearMonth}
        userDate={userDate}
        locale={locale}
        isPersian={isPersian}
        maxDate={maxDate}
        minDate={minDate}
        onChange={onChangeDate}
      />
    </View>
  );
});
