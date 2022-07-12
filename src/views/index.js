import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import DayItemView from './DayItemView';
import {PERSIAN} from './libs/Locales';
import {styles} from './styles';
import WeekView from './WeekView';
import moment from 'jalali-moment';
import {
  fillDays,
  formatNumber,
  getSelectedDays,
  getSplitDate,
  isMonth,
} from './libs/Utils';
import {FORMAT_ENGLISH, FORMAT_PERSIAN} from './libs/Format';

/**
 * @typedef PersianDatePickerProps
 * @property {Object} local
 * @property {String|Number} date
 * @property {String} inputDateFormat
 * @property {String} outputDateFormat
 * @property {Array<{date:String|Number,isOffDay:Boolean,description:String}>} days
 * @property {"f"|"m"|"s"} size
 * @property {"calendar"|"range"|"one"|"multi"} type
 * @property {(day:{day:String|Number,isOffDay:Boolean,isToday:Boolean,description:String})=>void} onPressDay
 */

/**
 * @typedef PersianDatePickerState
 * @property {moment.Moment} userDate
 * @property {Array<Number?>} days
 * @property {Array<Number>} selectedDays
 */

export default class PersianDatePicker extends React.Component {
  static defaultProps = {
    local: PERSIAN,
    date: moment(),
    size: 'f',
    type: 'calendar',
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

  /**
   *
   * @param {PersianDatePickerProps} props
   */
  constructor(props) {
    super(props);

    this.state.userDate = moment(props.date, props.inputDateFormat);

    this.state.days = fillDays(
      props.local,
      this.state.userDate,
      props.days,
      props.inputDateFormat,
    );

    this.#isPersian = props.local.type == 'fa';

    this._onPressNextMonth = this.#onPressChangeMonth.bind(this, true);
    this._onPressPreviousMonth = this.#onPressChangeMonth.bind(this, false);
  }

  render() {
    const {
      local = PERSIAN,
      inputDateFormat,
      size = 'f',
      type = 'calendar',
    } = this.props;
    const isPersian = this.#isPersian;

    const {userDate, days, selectedDays} = this.state;
    const [year, month] = userDate
      .format(isPersian ? FORMAT_PERSIAN : FORMAT_ENGLISH)
      .split('-')
      .map(v => Number(v));

    const selectedDaysThisMonth = getSelectedDays(
      selectedDays,
      userDate,
      type,
      isPersian,
      inputDateFormat,
    );

    return (
      <View
        style={[
          styles.container,
          size === 's' && styles.containerS,
          size === 'm' && styles.containerM,
        ]}>
        <View style={styles.yearBase}>
          <TouchableOpacity onPress={this._onPressNextMonth}>
            <Text style={styles.arrow}>{'<'}</Text>
          </TouchableOpacity>

          <Text style={styles.yearMonthTitle}>
            {local.nameMonth[month - 1] + '\t\t\t' + formatNumber(year, local)}
          </Text>

          <TouchableOpacity onPress={this._onPressPreviousMonth}>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <WeekView local={local} isPersian={isPersian} />

        <FlatList
          data={days}
          renderItem={renderDayItemView.bind(null, {
            type,
            size,
            local,
            isPersian,
            selectedDays: selectedDaysThisMonth,
            onPress: this.#onPressDay,
          })}
          numColumns={7}
          keyExtractor={(item, index) => `${item}:${index}`}
          columnWrapperStyle={isPersian && {flexDirection: 'row-reverse'}}
        />
      </View>
    );
  }

  #onPressDay = item => {
    const {type, outputDateFormat, onPressDay, local} = this.props;
    const {userDate} = this.state;
    const {day} = item;
    let date = moment(userDate);

    date = (local.type == 'fa' ? date.jDate(day) : date.date(day)).format(
      'YYYY-MM-DD',
    );

    let selectedDays =
      type === 'one' || type === 'calendar' ? [] : [...this.state.selectedDays];

    if (type === 'range') {
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
    this.setState({selectedDays});

    onPressDay?.(
      selectedDays.map(tDate => moment(tDate).format(outputDateFormat)),
    );
  };

  #onPressChangeMonth = isNext => {
    const userDate = moment(this.state.userDate);

    if ((this.#isPersian && isNext) || (!this.#isPersian && !isNext)) {
      userDate.add('month', 1);
    } else {
      userDate.add('month', -1);
    }

    const {local, days, inputDateFormat} = this.props;
    const _days = fillDays(local, userDate, days, inputDateFormat);

    this.setState({userDate, days: _days});
  };
}

/**
 *
 * @param {Object} propsC
 * @param {Object} propsC.local
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
  {local, isPersian, selectedDays, type, onPress},
  {item, index},
) => {
  const {isSelected, isSelectedFirst, isSelectedLast, isSelectedMiddle} =
    statusSelected(item.day, index, type, selectedDays);

  return (
    <DayItemView
      key={`${item}:${index}`}
      item={item}
      type={type}
      local={local}
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

  if (type === 'range' && selectedDays.length >= 2) {
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
