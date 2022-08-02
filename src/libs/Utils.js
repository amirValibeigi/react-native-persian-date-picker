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

export function isMonth(isPersian, date, dateMonth) {
  const _now = moment(dateMonth);

  return moment(date).isBetween(
    _now.startOf(isPersian ? "jmonth" : "month").format(FORMAT_ENGLISH),
    _now.endOf(isPersian ? "jmonth" : "month").format(FORMAT_ENGLISH),
    undefined,
    "[]"
  );
}

export function isAfterMonth(date, dateMonth) {
  return moment(date).isAfter(moment(dateMonth).format(FORMAT_ENGLISH));
}

export function getNumberSelectedDays(
  selectedDays,
  userDate,
  type = "calendar",
  isPersian = true
) {
  if (type == "range" && selectedDays.length === 2) {
    return selectedDays.map((v) =>
      isMonth(isPersian, v, userDate)
        ? getSplitDate(isPersian, v)[2]
        : isAfterMonth(v, userDate)
        ? 99
        : -99
    );
  }

  return getSelectedDays(selectedDays, userDate, isPersian)?.map((v) =>
    typeof v === "number" ? v : getSplitDate(isPersian, v)[2]
  );
}

export function getSelectedDays(selectedDays, userDate, isPersian = true) {
  return selectedDays.filter((v) => isMonth(isPersian, v, userDate));
}

export function getDescriptionSelectedDays(
  days,
  selectedDays,
  userDate,
  isPersian = true
) {
  const _SDays = getSelectedDays(selectedDays, userDate, isPersian);

  return days?.filter((v) =>
    _SDays.includes(moment(v.date).format(FORMAT_ENGLISH))
  );
}

export function getSplitDate(isPersian, date) {
  const _date = moment(date);

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
 * @returns {Array<Object>}
 */
export function fillDays(local, userDate, disabledDays, days) {
  const max = userDate.daysInMonth();
  let _UserDate = moment(userDate);
  const isPersian = local?.type === "fa";
  const start = isPersian
    ? _UserDate.startOf("jMonth").jDay()
    : _UserDate.startOf("month").day();

  _UserDate = moment(userDate);

  let now = moment();
  const today = local?.type === "fa" ? now.jDate() : now.date();
  const isThisMonth = isMonth(isPersian, userDate, undefined);
  const _minDisabledDate = disabledDays.find((v) => v.inclusivity == ">");
  const _maxDisabledDate = disabledDays.find((v) => v.inclusivity == "<");
  const _disabledDate = disabledDays
    .filter((v) => v.inclusivity == "=")
    ?.map((v) => v.date?.format(FORMAT_ENGLISH));

  const _days = days
    ?.filter(
      (v) => typeof v.date === "number" || isMonth(isPersian, v.date, userDate)
    )
    ?.map((v) =>
      typeof v.date != "number"
        ? { ...v, date: getSplitDate(isPersian, v.date)[2] }
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
    date: safeParseDate(v.date, props.inputDateFormat),
  }));
}

export function safeParseDate(date, inputDateFormat) {
  let _date;
  try {
    _date = moment(date, (date && inputDateFormat) || undefined);

    if (typeof _date == "undefined" || _date == undefined || _date == null) {
      throw Error("invalid date");
    }
  } catch (error) {
    _date = moment();
    console.warn("Error Parse date: invalid date");
  }

  return _date;
}

export function deepAssign(...objects) {
  const isObject = (obj) => obj && typeof obj === "object";

  return objects.reduce((prev, obj) => {
    if (typeof obj == "undefined") return prev;

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
