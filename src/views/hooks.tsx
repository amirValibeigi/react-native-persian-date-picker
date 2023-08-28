import React from 'react';
import type {
  PersianDatePickerState,
  RenderDay,
  RenderDayItemViewAccess,
  RenderDayItemViewProp,
} from './index.types';
import { type PersianDatePickerProps } from './index.types';
import moment from 'jalali-moment';
import {
  fillDays,
  getNumberSelectedDays,
  mixDisabledDate,
  safeParseDate,
} from '../libs/Utils';
import { FORMAT_ENGLISH, PERSIAN } from 'react-native-persian-date-picker';
import { type CalendarType, type DayType } from '../types/types';
import DayItemView from './items/DayItemView';

export function useUI(props: PersianDatePickerProps) {
  const [state, setState] = React.useState<PersianDatePickerState>({
    isPersian: (props.locale ?? PERSIAN).type === 'fa',
    selectedDays: [],
    userDate: safeParseDate(
      props.date,
      props.inputDateFormat ?? FORMAT_ENGLISH
    ),
    days: fillDays(
      props.locale ?? PERSIAN,
      safeParseDate(props.date, props.inputDateFormat ?? FORMAT_ENGLISH),
      mixDisabledDate(props),
      props.days?.map((d) => ({
        ...d,
        date: safeParseDate(d.date, props.inputDateFormat ?? FORMAT_ENGLISH),
      })) ?? []
    ),
  });

  const onPressChangeMonth = React.useCallback(
    (isNext: boolean) => {
      const userDate = moment(state.userDate);

      if ((state?.isPersian && isNext) || (!state?.isPersian && !isNext)) {
        userDate.add('month', 1);
      } else {
        userDate.add('month', -1);
      }

      const { locale } = props;
      const _days = fillDays(
        locale ?? PERSIAN,
        userDate,
        mixDisabledDate(props),
        state.days as any
      );

      setState((pv) => ({ ...pv, userDate, days: _days }));
    },
    [state, props]
  );

  const onPressDay = React.useCallback(
    (item: DayType) => {
      const { type, outputDateFormat, locale } = props;
      const { userDate } = state;
      const { day } = item;
      let date: string | moment.Moment = moment(userDate);

      date = (
        (locale ?? PERSIAN).type === 'fa'
          ? date.jDate(parseInt(day as string, 10))
          : date.date(parseInt(day as string, 10))
      ).format('YYYY-MM-DD');

      let selectedDays: Array<string | number | undefined> =
        type === 'one' || type === 'calendar' ? [] : [...state.selectedDays];

      if (type === 'range' || type === 'multi') {
        let iItem;
        if ((iItem = selectedDays.indexOf(date)) >= 0) {
          selectedDays.splice(iItem, 1);
        } else {
          selectedDays.push(date);
          selectedDays = (selectedDays as Array<number>).sort(
            (a, b) => (a >= b) as any
          );
        }
      } else {
        selectedDays.push(date);
      }

      if (type === 'range') {
        if (selectedDays && selectedDays.length > 2) {
          selectedDays = [
            selectedDays[0],
            selectedDays[selectedDays.length - 1],
          ];
        }
      }

      setState((pv) => ({ ...pv, selectedDays }));

      props?.onPressDay?.(
        selectedDays.map((tDate) => moment(tDate).format(outputDateFormat))
      );
    },
    [props, state]
  );

  const onPressList = React.useMemo(
    () => ({
      onPressNextMonth: onPressChangeMonth.bind(null, true),
      onPressPreviousMonth: onPressChangeMonth.bind(null, false),
    }),
    [onPressChangeMonth]
  );

  const renderDayFunc = React.useMemo(() => {
    const selectedDaysThisMonth = getNumberSelectedDays(
      state.selectedDays,
      state.userDate,
      props.type,
      state.isPersian
    );

    console.log('make');
    return props?.renderDay
      ? renderCustomDayItemView.bind(null, {
          style: props.styleDay,
          type: props.type ?? 'calendar',
          renderDay: props?.renderDay,
          locale: props.locale ?? PERSIAN,
          isPersian: state.isPersian,
          selectedDays: (selectedDaysThisMonth ?? []) as number[],
          onPress: onPressDay,
        })
      : renderDayItemView.bind(null, {
          style: props.styleDay,
          type: props.type ?? 'calendar',
          locale: props.locale ?? PERSIAN,
          isPersian: state.isPersian,
          selectedDays: (selectedDaysThisMonth ?? []) as number[],
          onPress: onPressDay,
        });
  }, [
    state.selectedDays,
    state.userDate,
    state.isPersian,
    props.type,
    props?.renderDay,
    props.styleDay,
    props.locale,
    onPressDay,
  ]);

  return { ...state, ...onPressList, renderDayFunc };
}

const renderDayItemView = (
  {
    style,
    locale,
    isPersian,
    selectedDays,
    type,
    onPress,
  }: Omit<
    RenderDayItemViewAccess,
    'isSelected' | 'isSelectedFirst' | 'isSelectedMiddle' | 'isSelectedLast'
  >,
  { item, index }: RenderDayItemViewProp
) => {
  const { isSelected, isSelectedFirst, isSelectedLast, isSelectedMiddle } =
    statusSelected(item.day, index, type, selectedDays);

  return (
    <DayItemView
      key={`${item}:${index}`}
      index={index}
      item={item}
      type={type}
      locale={locale}
      isPersian={isPersian}
      isSelected={isSelected}
      isSelectedFirst={isSelectedFirst}
      isSelectedLast={isSelectedLast}
      isSelectedMiddle={isSelectedMiddle}
      style={style}
      onPress={onPress}
    />
  );
};

const renderCustomDayItemView = (
  {
    style,
    locale,
    isPersian,
    renderDay,
    selectedDays,
    type,
    onPress,
  }: Omit<
    RenderDayItemViewAccess,
    'isSelected' | 'isSelectedFirst' | 'isSelectedMiddle' | 'isSelectedLast'
  > & {
    renderDay: RenderDay;
  },
  { item, index }: RenderDayItemViewProp
) => {
  const { isSelected, isSelectedFirst, isSelectedLast, isSelectedMiddle } =
    statusSelected(item.day, index, type, selectedDays);

  return renderDay({
    index,
    item,
    type,
    locale,
    isPersian,
    isSelected,
    isSelectedFirst,
    isSelectedLast,
    isSelectedMiddle,
    selectedDays,
    style,
    onPress,
  });
};

function statusSelected(
  item: string | number | undefined,
  index: number,
  type: CalendarType,
  selectedDays: Array<number | string>
) {
  const indexSelected = selectedDays.indexOf(item ?? '-99');
  let isSelected = indexSelected >= 0;
  let isSelectedFirst = false;
  let isSelectedLast = false;
  let isSelectedMiddle = false;

  if (type === 'range' && selectedDays.length >= 2) {
    const _item = parseInt((item ?? (index > 30 ? 90 : 0)) as string, 10);
    const isInRange =
      selectedDays &&
      selectedDays.length > 0 &&
      _item > parseInt(selectedDays[0] as string, 10) &&
      _item < parseInt(selectedDays[selectedDays.length - 1] as string, 10);

    isSelectedFirst = indexSelected === 0;
    isSelectedLast = selectedDays.length === indexSelected + 1;
    isSelectedMiddle = (indexSelected > 0 || isInRange) && !isSelectedLast;

    isSelected = isSelected || isInRange;
  }

  return {
    isSelected,
    isSelectedFirst,
    isSelectedLast,
    isSelectedMiddle,
  };
}
