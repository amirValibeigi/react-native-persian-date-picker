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
import { FORMAT_ENGLISH, FORMAT_PERSIAN } from '../libs/Format';
import { PERSIAN } from '../libs/Locales';
import { type CalendarType, type DayType } from '../types/types';
import DayItemView from './items/DayItemView';
import type { SelectYearMonthViewAccess } from './SelectYearMonthView/index.types';

export function useUI(props: PersianDatePickerProps) {
  const refSelectYearMonth = React.useRef<SelectYearMonthViewAccess>(null);
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

  const onPressYearMonth = React.useCallback(() => {
    refSelectYearMonth.current?.show();
  }, []);

  const onChangeDate = React.useCallback((date: moment.MomentInput) => {
    setState((pv) => ({ ...pv, userDate: moment(date) }));
  }, []);

  const onPressChangeMonth = React.useCallback(
    (isNext: boolean | number, month?: number, isPersian?: boolean) => {
      setState((pv) => {
        const userDate = moment(pv.userDate);

        if (typeof isNext !== 'boolean') {
          const [currentYear, currentMonth] = userDate
            .format(isPersian ? FORMAT_PERSIAN : FORMAT_ENGLISH)
            .split('-')
            .map((v) => Number(v));

          if (
            !isNext ||
            !month ||
            !currentYear ||
            !currentMonth ||
            (currentYear === isNext && currentMonth === month)
          ) {
            return pv;
          }

          userDate.add(
            'month',
            isNext! * 12 +
              (currentYear >= isNext
                ? currentYear - isNext
                : (currentYear - isNext) * -1) +
              month -
              (currentYear! * 12 + currentMonth)
          );
        } else {
          if ((pv?.isPersian && isNext) || (!pv?.isPersian && !isNext)) {
            userDate.add('month', 1);
          } else {
            userDate.add('month', -1);
          }
        }

        const { locale, outputDateFormat, onChangeYearMonth } = props;
        const _days = fillDays(
          locale ?? PERSIAN,
          userDate,
          mixDisabledDate(props),
          pv.days as any
        );

        onChangeYearMonth?.(userDate.format(outputDateFormat));

        return { ...pv, userDate, days: _days };
      });
    },
    [props]
  );

  const onPressDay = React.useCallback(
    (item: DayType) => {
      setState((pv) => {
        const { type, outputDateFormat, locale } = props;
        const { userDate } = pv;
        const { day } = item;
        let date: string | moment.Moment = moment(userDate);

        date = (
          (locale ?? PERSIAN).type === 'fa'
            ? date.jDate(parseInt(day as string, 10))
            : date.date(parseInt(day as string, 10))
        ).format('YYYY-MM-DD');

        let selectedDays: Array<string | number | undefined> =
          type === 'one' || type === 'calendar' ? [] : [...pv.selectedDays];

        if (type === 'range' || type === 'multi') {
          let iItem;
          if ((iItem = selectedDays.indexOf(date)) >= 0) {
            selectedDays.splice(iItem, 1);
          } else {
            selectedDays.push(date);
            selectedDays = (selectedDays as Array<number>).sort();
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

        props?.onPressDay?.(
          selectedDays.map((tDate) => moment(tDate).format(outputDateFormat))
        );
        return { ...pv, selectedDays };
      });
    },
    [props]
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

  return {
    ...state,
    ...onPressList,
    refSelectYearMonth,
    renderDayFunc,
    onPressChangeMonth,
    onPressYearMonth,
    onChangeDate,
  };
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
