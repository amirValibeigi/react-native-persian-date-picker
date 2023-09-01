import React from 'react';
import { type Locale, PERSIAN } from '../../libs/Locales';
import { FORMAT_ENGLISH, FORMAT_PERSIAN } from '../../libs/Format';
import type { Moment, MomentInput } from 'jalali-moment';
import type { SelectYearMonthViewAccess } from './index.types';
import type { MonthType } from '../../types/types';
import moment from 'jalali-moment';
import SelectYearMonthItemView from '../items/SelectYearMonthItemView';
import type {
  FlatList,
  LayoutChangeEvent,
  ViewabilityConfigCallbackPairs,
  ViewToken,
} from 'react-native';

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
  >(undefined);
  const [isYear, setIsYear] = React.useState(true);

  const [year, month] = React.useMemo(() => {
    const ym = formatDate(userDate, isPersian);

    return [ym[0], locale.nameMonth[(ym[1] ?? 12) - 1]];
  }, [isPersian, locale.nameMonth, userDate]);

  const [currentUserYear, currentUserMonth, currentUserNameMonth] =
    React.useMemo(() => {
      const ym = formatDate(currentUserDate, isPersian);

      return [ym[0], ym[1] ?? 12, locale.nameMonth[(ym[1] ?? 12) - 1]];
    }, [currentUserDate, isPersian, locale.nameMonth]);

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
    if (currentUserDate) {
      onChange?.(currentUserDate);
    }
    onPressCancel();
  }, [onChange, onPressCancel, currentUserDate]);

  const onPressYearMonthItem = React.useCallback(
    (item: string | number | MonthType) => {
      setCurrentUserDate((pv) => {
        if (typeof item === 'number' || typeof item === 'string') {
          if (isPersian) {
            pv?.jYear(Number(item));
          } else {
            pv?.year(Number(item));
          }
        } else {
          if (isPersian) {
            pv?.jMonth(Number(item.monthNumber ?? 12) - 1);
          } else {
            pv?.month(Number(item.monthNumber ?? 12) - 1);
          }
        }

        return moment(pv);
      });
    },
    [isPersian]
  );

  const listOnPress = React.useMemo(
    () => ({
      onPressYear: setIsYear.bind(null, true),
      onPressMonth: setIsYear.bind(null, false),
    }),
    []
  );

  const data = useData({
    userDate,
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
        onPress: onPressYearMonthItem,
      }),
    [currentUserMonth, currentUserYear, isYear, onPressYearMonthItem]
  );

  return {
    currentUserDate,
    data,
    isShow: Boolean(currentUserDate),
    isYear,
    month,
    year,
    currentUserYear,
    currentUserNameMonth,
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
  const refShow = React.useRef<{
    data: Array<string | number | MonthType>;
    currentUserMonth?: number;
    currentUserYear?: number;
    isYear: boolean;
  }>({
    data: [],
    isYear: true,
  });
  const data = React.useMemo(() => {
    if (!userDate) {
      return [];
    }

    const vMaxCountYear = maxCountYear ?? 100;
    const [year, month] = formatDate(userDate, isPersian);
    let [minYear, minMonth] = formatDate(minDate, isPersian);
    let [maxYear, maxMonth] = formatDate(maxDate, isPersian);

    minYear ??= (year ?? vMaxCountYear) - vMaxCountYear;
    maxYear ??= (year ?? vMaxCountYear) + vMaxCountYear;

    refShow.current.isYear = isYear ?? true;
    refShow.current.currentUserYear = year ?? 1;
    refShow.current.currentUserMonth = month ?? 1;

    const vData: Array<number> = [];

    if (isYear) {
      for (let y = maxYear!; y >= minYear!; y--) {
        vData.push(y);
      }
      refShow.current.data = vData;
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

    refShow.current.data = months;
    return months;
  }, [isPersian, isYear, locale, maxCountYear, maxDate, minDate, userDate]);

  const refList = React.useRef<FlatList>(null);

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (
        refShow.current.data.length === 0 ||
        !viewableItems?.[0]?.isViewable
      ) {
        return;
      }

      const tmpData = refShow.current.data;
      const indexItem = refShow.current.isYear
        ? tmpData.findIndex((el) => el === refShow.current.currentUserYear)
        : tmpData.findIndex(
            (el) =>
              (el as MonthType).monthNumber === refShow.current.currentUserMonth
          );
      refShow.current.data = [];

      if (indexItem >= 0) {
        refList.current?.scrollToItem({
          item: tmpData[indexItem],
          animated: true,
        });
      }
    },
    []
  );

  const refViewabilityConfigCallbackPair =
    React.useRef<ViewabilityConfigCallbackPairs>([
      {
        viewabilityConfig: { itemVisiblePercentThreshold: 70 },
        onViewableItemsChanged,
      },
    ]);

  const [width, setWidth] = React.useState(0);

  const onLayout = React.useCallback((e: LayoutChangeEvent) => {
    if (e.nativeEvent?.layout?.width > 0) {
      setWidth(e.nativeEvent?.layout?.height);
    }
  }, []);

  const getItemLayout = React.useCallback(
    (_, index: number) => ({
      length: width,
      offset: width * index - index * 4,
      index,
    }),
    [width]
  );

  return {
    data,
    refList,
    refViewabilityConfigCallbackPair,
    onLayout,
    getItemLayout,
  };
}

function formatDate(date: MomentInput, isPersian?: boolean) {
  if (!date) return [];

  return moment(date)
    .format(isPersian ? FORMAT_PERSIAN : FORMAT_ENGLISH)
    .split('-')
    .map((v) => Number(v));
}
