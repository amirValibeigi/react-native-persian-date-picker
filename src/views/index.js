import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import DayItemView from "./items/DayItemView";
import { PERSIAN } from "../libs/Locales";
import { styles } from "../styles";
import WeekView from "./WeekView";
import moment from "jalali-moment";
import {
  fillDays,
  formatNumber,
  getNumberSelectedDays,
  mixDisabledDate,
  safeParseDate,
} from "../libs/Utils";
import { FORMAT_ENGLISH, FORMAT_PERSIAN } from "../libs/Format";
import DescriptionView from "./DescriptionView";
import YearMonthView from "./YearMonthView";

/**
 * @typedef PersianDatePickerProps
 * @property {Object} locale
 * @property {String|Number} date
 * @property {String} inputDateFormat
 * @property {String} outputDateFormat
 * @property {Array<{date:String|Number,isOffDay:Boolean,description:String}>} days
 * @property {"f"|"m"|"s"} size
 * @property {Boolean} [showDescription=true] only calendar and one
 * @property {"calendar"|"range"|"one"|"multi"} type
 * @property {React.FC<{days:Object}>} renderDescription
 * @property {React.FC<{onPress:Function}>} renderNextMonth
 * @property {React.FC<{onPress:Function}>} renderPreviousMonth
 * @property {(day:{day:String|Number,isOffDay:Boolean,isToday:Boolean,description:String})=>void} onPressDay
 */

/**
 * @typedef PersianDatePickerState
 * @property {moment.Moment} userDate
 * @property {Array<Object>} days
 * @property {Array<String|Number>} selectedDays
 */

export default class PersianDatePicker extends React.Component {
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
   * @param {PersianDatePickerProps} props
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

  render() {
    const {
      locale = PERSIAN,
      size = "f",
      type = "calendar",
      showDescription,
      renderDescription,
      renderNextMonth,
      renderPreviousMonth,
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
        ]}
      >
        <YearMonthView
          userDate={userDate}
          isPersian={isPersian}
          locale={locale}
          renderNextMonth={renderNextMonth}
          renderPreviousMonth={renderPreviousMonth}
          onPressNext={this._onPressNextMonth}
          onPressPrevious={this._onPressPreviousMonth}
        />

        <WeekView locale={locale} isPersian={isPersian} />

        <FlatList
          data={days}
          renderItem={renderDayItemView.bind(null, {
            type,
            size,
            locale,
            isPersian,
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

    if (type === "range") {
      let iItem;
      if ((iItem = selectedDays.indexOf(date)) >= 0) {
        selectedDays.splice(iItem, 1);
      } else {
        selectedDays.push(date);
        selectedDays = selectedDays.sort((a, b) => a >= b);
      }
      if (selectedDays.length > 2) {
        selectedDays = [selectedDays[0], selectedDays[selectedDays.length - 1]];
      }
    } else {
      selectedDays.push(date);
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
  { locale, isPersian, selectedDays, type, onPress },
  { item, index }
) => {
  const { isSelected, isSelectedFirst, isSelectedLast, isSelectedMiddle } =
    statusSelected(item.day, index, type, selectedDays);

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
