import { PERSIAN } from "./Locales";
import moment from "jalali-moment";
import { FORMAT_ENGLISH } from "./Format";

/**
 *
 * @param {String|Number} num
 *
 * @return {String}
 */
export function formatNumber(num, locale = PERSIAN) {
  return [...String(num)].map((v) => locale.daysOfWeek[v]).join("");
}

export function isMonth(isPersian, date, dateMonth, inputDateFormat) {
  const _now = moment(dateMonth, inputDateFormat);

  return moment(date).isBetween(
    _now.startOf(isPersian ? "jmonth" : "month").format(FORMAT_ENGLISH),
    _now.endOf(isPersian ? "jmonth" : "month").format(FORMAT_ENGLISH),
    undefined,
    "[]"
  );
}

export function isAfterMonth(date, dateMonth, inputDateFormat) {
  return moment(date).isAfter(
    moment(dateMonth, inputDateFormat).format(FORMAT_ENGLISH)
  );
}

export function getSelectedDays(
  selectedDays,
  userDate,
  type = "fa",
  isPersian = true,
  inputDateFormat
) {
  if (type == "range" && selectedDays.length === 2) {
    return selectedDays.map((v) =>
      isMonth(isPersian, v, userDate, inputDateFormat)
        ? getSplitDate(isPersian, v, inputDateFormat)[2]
        : isAfterMonth(v, userDate, inputDateFormat)
        ? 99
        : -99
    );
  }

  return selectedDays
    .filter((v) => isMonth(isPersian, v, userDate, inputDateFormat))
    ?.map((v) =>
      typeof v === "number" ? v : getSplitDate(isPersian, v, inputDateFormat)[2]
    );
}

export function getSplitDate(isPersian, date, inputDateFormat) {
  const _date = moment(date, inputDateFormat);

  if (isPersian) {
    return [_date.jYear(), _date.jMonth(), _date.jDate()];
  }

  return [_date.year(), _date.month(), _date.date()];
}

/**
 * @param {Object} local
 * @param {moment.Moment} userDate
 * @param {Array<Object>} days
 * @param {Array<{date:Number|String,inclusivity:'<'|'='|'>'}>} disabledDays
 * @param {String} inputDateFormat
 * @returns {Array<Object>}
 */
export function fillDays(local, userDate, disabledDays, days, inputDateFormat) {
  const max = userDate.daysInMonth();
  let _UserDate = moment(userDate);
  const isPersian = local?.type === "fa";
  const start = isPersian
    ? _UserDate.startOf("jMonth").jDay()
    : _UserDate.startOf("month").day();

  _UserDate = moment(userDate);

  let now = moment();
  const today = local?.type === "fa" ? now.jDate() : now.date();
  const isThisMonth = isMonth(isPersian, userDate, undefined, inputDateFormat);
  const _minDisabledDate = disabledDays.find((v) => v.inclusivity == ">");
  const _maxDisabledDate = disabledDays.find((v) => v.inclusivity == "<");
  const _disabledDate = disabledDays
    .filter((v) => v.inclusivity == "=")
    .map((v) => v.date?.format(FORMAT_ENGLISH));

  const _days = days
    ?.filter(
      (v) =>
        typeof v.date === "number" ||
        isMonth(isPersian, v.date, userDate, inputDateFormat)
    )
    .map((v) =>
      typeof v.date != "number"
        ? { ...v, date: getSplitDate(isPersian, v.date, inputDateFormat)[2] }
        : v
    );

  //fix bug moment
  now = moment();

  return [
    ...[...Array(start).keys()].map(() => ""),
    ...[...Array(max).keys()].map((item, index) => {
      const v = item + 1;
      const tmp = _days?.filter((tmpDay) => tmpDay.date == v)?.[0];
      const _tmpDate = isPersian ? _UserDate.jDate(v) : _UserDate.date(v);
      const _tmpFDate = _tmpDate.format(FORMAT_ENGLISH);

      return {
        day: v,
        isToday: isThisMonth && v == today,
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
    ].map(() => ""),
  ];
}

export function mixDisabledDate(props) {
  const date = [];

  if (props?.minDate) {
    date.push({ date: props.minDate, inclusivity: ">" });
  }

  if (props?.disabledDate?.length > 0) {
    date.push(
      ...props.disabledDate.map((v) => ({ date: v, inclusivity: "=" }))
    );
  }

  if (props?.maxDate) {
    date.push({ date: props.maxDate, inclusivity: "<" });
  }

  return date.map((v) => ({
    ...v,
    date: moment(v.date, props.inputDateFormat),
  }));
}
