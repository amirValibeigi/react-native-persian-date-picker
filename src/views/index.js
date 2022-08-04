import React from "react";
import { FlatList, View } from "react-native";
import DayItemView from "./items/DayItemView";
import { PERSIAN } from "../libs/Locales";
import { styles } from "../styles";
import WeekView from "./WeekView";
import moment from "jalali-moment";
import {
  fillDays,
  getNumberSelectedDays,
  mixDisabledDate,
  safeParseDate,
} from "../libs/Utils";
import DescriptionView from "./DescriptionView";
import YearMonthView from "./YearMonthView";

/**
 * @typedef PersianDatePickerState
 * @property {moment.Moment} userDate
 * @property {Array<import("../types/types").DayType>} days
 * @property {Array<String|Number>} selectedDays
 */

/**
 * @extends {React.Component<import("./index").PersianDatePickerProps>}
 */
export class PersianDatePicker extends React.Component {
  /**
   * @type {import("./index").PersianDatePickerProps}
   */
  static defaultProps = {
    locale: PERSIAN,
    size: "f",
    type: "calendar",
    showDescription: true,
  };

  /**
   * @type {PersianDatePickerState}
   */
  state = {
    userDate: undefined,
    days: undefined,
    selectedDays: [],
  };

  #isPersian = true;
  #days;

  /**
   *
   * @param {import("./index").PersianDatePickerProps} props
   */
  constructor(props) {
    super(props);

    this.#days = props.days?.map((d) => ({
      ...d,
      date: safeParseDate(d.date, props.inputDateFormat),
    }));

    this.state.userDate = safeParseDate(props.date, props.inputDateFormat);

    this.state.days = fillDays(
      props.locale,
      this.state.userDate,
      mixDisabledDate(props),
      this.#days
    );

    this.#isPersian = props.locale.type == "fa";

    this._onPressNextMonth = this.#onPressChangeMonth.bind(this, true);
    this._onPressPreviousMonth = this.#onPressChangeMonth.bind(this, false);
  }

  UNSAFE_componentWillReceiveProps(props) {
    // safe props
    if (typeof props === "undefined" || !props) return;

    if (
      this.props?.locale != props.locale ||
      this.props?.date != props.date ||
      this.props?.disabledDate != props.disabledDate ||
      this.props?.minDate != props.minDate ||
      this.props?.maxDate != props.maxDate ||
      this.props?.days != props.days ||
      this.props?.inputDateFormat != props.inputDateFormat ||
      this.props?.outputDateFormat != props.outputDateFormat
    ) {
      this.#days = props.days?.map((d) => ({
        ...d,
        date: safeParseDate(d.date, props.inputDateFormat),
      }));

      this.setState({
        userDate: safeParseDate(props.date, props.inputDateFormat),
        days: fillDays(
          props.locale,
          this.state.userDate,
          mixDisabledDate(props),
          this.#days
        ),
      });

      this.#isPersian = props.locale.type == "fa";
    }
  }

  render() {
    const {
      locale = PERSIAN,
      size = "f",
      type = "calendar",
      showDescription,
      renderDescription,
      renderNextMonth,
      renderPreviousMonth,
      renderDay,
      style,
      styleDay,
      styleDescription,
      styleWeek,
      styleYearMonth,
    } = this.props;
    const isPersian = this.#isPersian;

    const { userDate, days, selectedDays } = this.state;

    const selectedDaysThisMonth = getNumberSelectedDays(
      selectedDays,
      userDate,
      type,
      isPersian
    );

    return (
      <View
        style={[
          styles.container,
          size === "s" && styles.containerS,
          size === "m" && styles.containerM,
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
          onPressNext={this._onPressNextMonth}
          onPressPrevious={this._onPressPreviousMonth}
        />

        <WeekView locale={locale} isPersian={isPersian} style={styleWeek} />

        <FlatList
          data={days}
          renderItem={renderDayItemView.bind(null, {
            style: styleDay,
            type,
            size,
            locale,
            isPersian,
            renderDay: renderDay,
            selectedDays: selectedDaysThisMonth,
            onPress: this.#onPressDay,
          })}
          numColumns={7}
          keyExtractor={(item, index) => `${item}:${index}`}
          columnWrapperStyle={isPersian && { flexDirection: "row-reverse" }}
          ListFooterComponent={
            <DescriptionView
              days={this.#days}
              selectedDays={selectedDays}
              userDate={userDate}
              type={type}
              isPersian={isPersian}
              show={showDescription}
              renderDescription={renderDescription}
              style={styleDescription}
            />
          }
        />
      </View>
    );
  }

  #onPressDay = (item) => {
    const { type, outputDateFormat, onPressDay, locale } = this.props;
    const { userDate } = this.state;
    const { day } = item;
    let date = moment(userDate);

    date = (locale.type == "fa" ? date.jDate(day) : date.date(day)).format(
      "YYYY-MM-DD"
    );

    let selectedDays =
      type === "one" || type === "calendar" ? [] : [...this.state.selectedDays];

    if (type == "range" || type == "multi") {
      let iItem;
      if ((iItem = selectedDays.indexOf(date)) >= 0) {
        selectedDays.splice(iItem, 1);
      } else {
        selectedDays.push(date);
        selectedDays = selectedDays.sort((a, b) => a >= b);
      }
    } else {
      selectedDays.push(date);
    }

    if (type === "range") {
      if (selectedDays.length > 2) {
        selectedDays = [selectedDays[0], selectedDays[selectedDays.length - 1]];
      }
    }

    this.setState({ selectedDays });

    onPressDay?.(
      selectedDays.map((tDate) => moment(tDate).format(outputDateFormat))
    );
  };

  #onPressChangeMonth = (isNext) => {
    const userDate = moment(this.state.userDate);

    if ((this.#isPersian && isNext) || (!this.#isPersian && !isNext)) {
      userDate.add("month", 1);
    } else {
      userDate.add("month", -1);
    }

    const { locale } = this.props;
    const _days = fillDays(
      locale,
      userDate,
      mixDisabledDate(this.props),
      this.#days
    );

    this.setState({ userDate, days: _days });
  };
}

/**
 *
 * @param {Object} propsC
 * @param {Object} propsC.locale
 * @param {Boolean} propsC.isFa
 * @param {String|Number} propsC.today
 * @param {Number} propsC.offDay
 * @param {Array<Number|String>} propsC.selectedDays
 * @param {"calendar"|"range"|"one"|"multi"} propsC.type
 * @param {(item:String)=>void} propsC.onPress
 *
 * @param {Object} props
 * @param {Object} props.item
 * @param {String} props.item.day
 * @param {Boolean} props.item.occasion
 * @returns {React.ReactNode}
 */
const renderDayItemView = (
  {
    style,
    renderDay: RenderDay,
    locale,
    isPersian,
    selectedDays,
    type,
    onPress,
  },
  { item, index }
) => {
  const { isSelected, isSelectedFirst, isSelectedLast, isSelectedMiddle } =
    statusSelected(item.day, index, type, selectedDays);

  if (RenderDay)
    return RenderDay({
      index,
      item: item,
      type: type,
      locale: locale,
      isPersian: isPersian,
      isSelected: isSelected,
      isSelectedFirst: isSelectedFirst,
      isSelectedLast: isSelectedLast,
      isSelectedMiddle: isSelectedMiddle,
      style: style,
      onPress: onPress,
    });

  return (
    <DayItemView
      key={`${item}:${index}`}
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
/**
 * @param {String} item
 * @param {"calendar"|"range"|"one"|"multi"} type
 * @param {Array<Number|String>} selectedDays
 */
function statusSelected(item, index, type, selectedDays) {
  const indexSelected = selectedDays.indexOf(item);
  let isSelected = indexSelected >= 0;
  let isSelectedFirst = false;
  let isSelectedLast = false;
  let isSelectedMiddle = false;

  if (type === "range" && selectedDays.length >= 2) {
    const _item = item ?? (index > 30 ? 90 : 0);
    const isInRange =
      _item > selectedDays[0] && _item < selectedDays[selectedDays.length - 1];

    isSelectedFirst = indexSelected === 0;
    isSelectedLast = selectedDays.length === indexSelected + 1;
    isSelectedMiddle =
      (indexSelected > 0 || isInRange) && isSelectedLast === false;

    isSelected = isSelected || isInRange;
  }

  return {
    isSelected,
    isSelectedFirst,
    isSelectedLast,
    isSelectedMiddle,
  };
}
