import { type Locale, PERSIAN } from '../../libs/Locales';
import { type Moment } from 'jalali-moment';
import YearItemView from '../items/YearItemView';
import React from 'react';
import type { StyleYearMonth } from './index.types';
import type { OnChangeYearMonth, YearMonthType } from '../../types/types';
import type {
  FlatList,
  LayoutChangeEvent,
  ViewabilityConfigCallbackPairs,
  ViewToken,
} from 'react-native';
import { useDebounceInput } from '../../libs/Utils';
import { FORMAT_ENGLISH, FORMAT_PERSIAN } from '../../libs/Format';

export function useUI({
  isPersian,
  userDate,
  style,
  locale,
  onChangeYearMonth,
  onPress,
}: {
  isPersian?: boolean;
  userDate: Moment;
  locale?: Locale;
  style?: StyleYearMonth;
  onChangeYearMonth?: OnChangeYearMonth;
  onPress?: () => void;
}) {
  const refList = React.useRef<FlatList>(null);
  const { width, onLayout } = useWidth();
  const [years, setYears] = React.useState<Array<YearMonthType>>();

  const [year, month] = React.useMemo(
    () =>
      userDate
        .format(isPersian ? FORMAT_PERSIAN : FORMAT_ENGLISH)
        .split('-')
        .map((v) => Number(v)),
    [isPersian, userDate]
  );

  const makeData = React.useCallback(() => {
    if (year && year > 0) {
      const minYear = Number(year) - 1;
      const maxYear = Number(year) + 1;
      const vLocal = locale ?? PERSIAN;
      const vYears: Array<YearMonthType> = [];

      for (let y = maxYear; y >= minYear; y--) {
        for (let m = 11; m >= 0; m--) {
          vYears.push({
            year: y,
            month: vLocal.nameMonth[m] ?? '-',
            monthNumber: m + 1,
          });
        }
      }
      setYears(vYears);
    }
  }, [year, locale]);

  const getItemLayout = React.useCallback(
    (_, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width]
  );

  const onChangeDebounce = useDebounceInput(
    (item?: ViewToken) => {
      if (item?.isViewable) {
        onChangeYearMonth?.(
          item.item.year,
          item.item.monthNumber,
          isPersian ?? true
        );
      }
    },
    200,
    []
  );

  const onViewableItemsChanged = React.useCallback(
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: Array<ViewToken>;
      changed: Array<ViewToken>;
    }) => {
      if (!viewableItems || viewableItems.length === 0 || changed.length > 1) {
        return;
      }
      //TODO: fix bug loop change
      onChangeDebounce(viewableItems[0]);
    },
    // eslint-disable-next-line
    []
  );

  const refViewabilityConfigCallbackPairs =
    React.useRef<ViewabilityConfigCallbackPairs>([
      {
        onViewableItemsChanged,
        viewabilityConfig: {
          minimumViewTime: 150,
          itemVisiblePercentThreshold: 80,
        },
      },
    ]);

  const renderItem = React.useMemo(
    () =>
      YearItemView.bind(null, {
        style: style?.title,
        width,
        onPress,
      }),
    [onPress, style?.title, width]
  );

  React.useEffect(makeData, [makeData]);

  React.useEffect(() => {
    if (year && years && years.length > 0) {
      setTimeout(() => {
        const vLocal = locale ?? PERSIAN;
        const item = years?.find(
          (el) =>
            el.year === year && el.month === vLocal.nameMonth[(month ?? 12) - 1]
        );

        if (item) refList.current?.scrollToItem({ item: item });
      }, 200);
    }
  }, [locale, month, year, years]);

  return {
    refViewabilityConfigCallbackPairs,
    refList,
    width,
    years,
    getItemLayout,
    onLayout,
    renderItem,
  };
}

export function useWidth() {
  const [width, setWidth] = React.useState<number>(0);

  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent?.layout?.width ?? 0);
  }, []);

  return { width, onLayout };
}
