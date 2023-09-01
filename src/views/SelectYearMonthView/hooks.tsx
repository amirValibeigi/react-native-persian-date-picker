import React from 'react';
import { type Locale, PERSIAN } from '../../libs/Locales';
import { FORMAT_ENGLISH, FORMAT_PERSIAN } from '../../libs/Format';
import type { Moment, MomentInput } from 'jalali-moment';
import type { SelectYearMonthViewAccess } from './index.types';
import type { MonthType } from '../../types/types';
import moment from 'jalali-moment';
import SelectYearMonthItemView from '../items/SelectYearMonthItemView';

export function useUI({
  isPersian,
  locale,
  maxCountYear,
  maxDate,
  minDate,
  ref,
  userDate,
  onChange,
}: {
  userDate: Moment;
  maxCountYear?: number;
  isPersian: boolean;
  locale: Locale;
  ref: React.ForwardedRef<SelectYearMonthViewAccess>;
  minDate?: MomentInput;
  maxDate?: MomentInput;
  onChange?: (date: Moment) => void;
}) {
  const [currentUserDate, setCurrentUserDate] = React.useState<
    Moment | undefined
  >(userDate);
  const [isYear, setIsYear] = React.useState(true);

  const [year, month] = React.useMemo(() => {
    const ym = formatDate(userDate, isPersian);

    return [ym[0], locale.nameMonth[ym[1] ?? 11]];
  }, [isPersian, locale.nameMonth, userDate]);

  const [currentUserYear, currentUserMonth] = React.useMemo(() => {
    const ym = formatDate(currentUserDate, isPersian);

    return [ym[0], ym[1] ?? 11];
  }, [isPersian, currentUserDate]);

  React.useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setCurrentUserDate(userDate);
      },
    }),
    [userDate]
  );

  const onPressCancel = React.useCallback(() => {
    setCurrentUserDate(undefined);
  }, []);

  const onPressSubmit = React.useCallback(() => {
    onChange?.(userDate);
    onPressCancel();
  }, [onChange, onPressCancel, userDate]);

  const listOnPress = React.useMemo(
    () => ({
      onPressYear: setIsYear.bind(null, true),
      onPressMonth: setIsYear.bind(null, false),
    }),
    []
  );

  const data = useData({
    userDate: currentUserDate,
    minDate,
    maxDate,
    locale,
    isPersian,
    isYear,
    maxCountYear,
  });

  const renderItem = React.useMemo(
    () =>
      SelectYearMonthItemView.bind(null, {
        selected: isYear ? currentUserYear : currentUserMonth,
      }),
    [currentUserMonth, currentUserYear, isYear]
  );

  return {
    currentUserDate,
    data,
    isShow: Boolean(currentUserDate),
    isYear,
    month,
    year,
    onPressCancel,
    onPressSubmit,
    renderItem,
    ...listOnPress,
  };
}

export function useData({
  locale,
  userDate,
  minDate,
  maxDate,
  isPersian,
  isYear,
  maxCountYear,
}: {
  locale?: Locale;
  userDate?: Moment;
  minDate?: MomentInput;
  maxDate?: MomentInput;
  isPersian?: boolean;
  isYear?: boolean;
  maxCountYear?: number;
}) {
  return React.useMemo(() => {
    if (!userDate) {
      return [];
    }

    const vMaxCountYear = maxCountYear ?? 100;
    const [year] = formatDate(userDate, isPersian);
    let [minYear, minMonth] = formatDate(minDate, isPersian);
    let [maxYear, maxMonth] = formatDate(maxDate, isPersian);

    minYear ??= (year ?? vMaxCountYear) - vMaxCountYear;
    maxYear ??= (year ?? vMaxCountYear) + vMaxCountYear;

    const vData: Array<number> = [];

    if (isYear) {
      for (let y = maxYear!; y >= minYear!; y--) {
        vData.push(y);
      }
      return vData;
    }

    const vLocal = locale ?? PERSIAN;
    let months: Array<MonthType> = vLocal.nameMonth.map((el, index) => ({
      month: el,
      disable: false,
      monthNumber: index + 1,
    }));

    if ((minMonth || maxMonth) && (year === maxMonth || year === minYear)) {
      months
        .filter(
          (el) =>
            el.monthNumber < (minMonth ?? 1) ||
            el.monthNumber > (maxMonth ?? 12)
        )
        .forEach((el) => {
          el.disable = true;
        });
    }

    return months;
  }, [isPersian, isYear, locale, maxCountYear, maxDate, minDate, userDate]);
}

function formatDate(date: MomentInput, isPersian?: boolean) {
  if (!date) return [];

  return moment(date)
    .format(isPersian ? FORMAT_PERSIAN : FORMAT_ENGLISH)
    .split('-')
    .map((v) => Number(v));
}
