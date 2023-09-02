import { type Locale, PERSIAN } from './Locales';
import moment from 'jalali-moment';
import { FORMAT_ENGLISH } from './Format';
import type { CalendarType, DayType, DisableDateType } from '../types/types';
import React, { type DependencyList } from 'react';

export function formatNumber(num?: string | number, locale = PERSIAN): string {
  return ([...String(num)] as Array<any>)
    .map((v) => locale.daysOfWeek[v])
    .join('');
}

export function isMonth(
  isPersian: boolean,
  date: moment.MomentInput,
  dateMonth: moment.MomentInput
): boolean {
  const _now = moment(dateMonth);

  return moment(moment(date).format(FORMAT_ENGLISH)).isBetween(
    _now.startOf(isPersian ? 'jmonth' : 'month').format(FORMAT_ENGLISH),
    _now.endOf(isPersian ? 'jmonth' : 'month').format(FORMAT_ENGLISH),
    undefined,
    '[]'
  );
}

export function isAfterMonth(
  date: moment.MomentInput,
  dateMonth: moment.MomentInput
): boolean {
  return moment(date).isAfter(moment(dateMonth).format(FORMAT_ENGLISH));
}

export function getNumberSelectedDays(
  selectedDays: Array<moment.MomentInput>,
  userDate: moment.MomentInput,
  type: CalendarType = 'calendar',
  isPersian = true
) {
  if (type === 'range' && selectedDays.length === 2) {
    return selectedDays.map((v) =>
      isMonth(isPersian, v, userDate)
        ? getSplitDate(isPersian, v)[2]
        : isAfterMonth(v, userDate)
        ? 99
        : -99
    );
  }

  return getSelectedDays(selectedDays, userDate, isPersian)?.map((v) =>
    typeof v === 'number' ? v : getSplitDate(isPersian, v)[2]
  );
}

export function getSelectedDays(
  selectedDays: Array<moment.MomentInput>,
  userDate: moment.MomentInput,
  isPersian = true
) {
  return selectedDays.filter((v) => isMonth(isPersian, v, userDate));
}

export function getDescriptionSelectedDays(
  days: Array<DayType>,
  selectedDays: Array<moment.MomentInput>,
  userDate: moment.MomentInput,
  isPersian = true
) {
  const _SDays = getSelectedDays(selectedDays, userDate, isPersian);

  return days?.filter(
    (v) => v.date && _SDays.includes(moment(v.date).format(FORMAT_ENGLISH))
  );
}

export function getSplitDate(isPersian: boolean, date: moment.MomentInput) {
  const _date = moment(date);

  if (isPersian) {
    return [_date.jYear(), _date.jMonth(), _date.jDate()];
  }

  return [_date.year(), _date.month(), _date.date()];
}

export function fillDays(
  local: Locale,
  userDate: moment.Moment,
  disabledDays: Array<DayType & DisableDateType>,
  days: Array<DayType & DisableDateType>
): Array<DayType> {
  const max = userDate.daysInMonth();
  let _UserDate = moment(userDate);
  const isPersian = local?.type === 'fa';
  const start = isPersian
    ? _UserDate.startOf('jMonth').jDay()
    : _UserDate.startOf('month').day();

  _UserDate = moment(userDate);

  let now = moment();
  const today = local?.type === 'fa' ? now.jDate() : now.date();
  const isThisMonth = isMonth(isPersian, userDate, undefined);
  const _minDisabledDate = disabledDays.find((v) => v.inclusivity === '>');
  const _maxDisabledDate = disabledDays.find((v) => v.inclusivity === '<');
  const _disabledDate = disabledDays
    .filter((v) => v.inclusivity === '=')
    ?.map((v) => v.date?.format(FORMAT_ENGLISH));

  const _days = days
    ?.filter(
      (v) => typeof v.date === 'number' || isMonth(isPersian, v.date, userDate)
    )
    ?.map((v) =>
      typeof v.date !== 'number'
        ? { ...v, day: getSplitDate(isPersian, v.date)[2] }
        : v
    );

  //fix bug moment
  now = moment();

  return [
    ...[...Array(start).keys()].map(() => ''),
    ...[...Array(max).keys()].map((item, index) => {
      const v = item + 1;
      const tmp = _days?.filter((tmpDay) => tmpDay.day === v)?.[0];
      const _tmpDate = isPersian ? _UserDate.jDate(v) : _UserDate.date(v);
      const _tmpFDate = _tmpDate.format(FORMAT_ENGLISH);

      return {
        day: v,
        date: tmp?.date,
        isToday: isThisMonth && v === today,
        isOffDay:
          tmp?.isOffDay ||
          (index + start + 1) % (local?.dayOffOfWeek + 1) === 0,
        isDisabled:
          (_minDisabledDate?.date &&
            _tmpDate.isBefore(_minDisabledDate.date)) ||
          (_maxDisabledDate?.date && _tmpDate.isAfter(_maxDisabledDate.date)) ||
          _disabledDate?.includes(_tmpFDate),
        description: tmp?.description,
      };
    }),
    ...[
      ...Array(Math.max(0, (max + start <= 35 ? 35 : 42) - max - start)).keys(),
    ].map(() => ''),
  ] as DayType[];
}

export function mixDisabledDate(props?: {
  minDate?: moment.MomentInput;
  maxDate?: moment.MomentInput;
  inputDateFormat?: string;
  disabledDate?: Array<moment.MomentInput>;
}): Array<any> {
  const date = [];

  if (props?.minDate) {
    date.push({ date: props.minDate, inclusivity: '>' });
  }

  if (props?.disabledDate && props?.disabledDate?.length > 0) {
    date.push(
      ...props.disabledDate.map((v) => ({ date: v, inclusivity: '=' }))
    );
  }

  if (props?.maxDate) {
    date.push({ date: props.maxDate, inclusivity: '<' });
  }

  return date.map((v) => ({
    ...v,
    date: safeParseDate(v.date, props?.inputDateFormat ?? FORMAT_ENGLISH),
  }));
}

export function safeParseDate(
  date: moment.MomentInput,
  inputDateFormat: string
) {
  let _date;
  try {
    _date = moment(date, (date && inputDateFormat) || undefined);

    if (typeof _date === 'undefined' || _date === undefined || _date === null) {
      throw Error('invalid date');
    }
  } catch (error) {
    _date = moment();
    console.warn('Error Parse date: invalid date');
  }

  return _date;
}

export function deepAssign(...objects: any[]) {
  const isObject = (obj: any) => obj && typeof obj === 'object';

  return objects.reduce((prev, obj) => {
    if (typeof obj === 'undefined') return prev;

    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepAssign(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

export function useDebounceInput<T extends Function>(
  callback: T,
  delay = 1000,
  deps: DependencyList
): T {
  const refTimeout = React.useRef<NodeJS.Timeout>();

  const makerFunc = React.useCallback(
    (...args: any[]) => {
      clearTimeout(refTimeout.current);
      refTimeout.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay, ...(deps ?? [])]
  );

  return makerFunc as any;
}
