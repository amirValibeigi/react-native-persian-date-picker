import React from 'react';
import {FlatList, Text, View} from 'react-native';
import DayItemView from './DayItemView';
import {PERSIAN} from './libs/Locales';
import {styles} from './styles';
import WeekView from './WeekView';
import moment from 'jalali-moment';
import {formatNumber} from './libs/Utils';

/**
 * @typedef PersianDatePickerProps
 * @property {Object} local
 * @property {String|Number} date
 * @property {"f"|"m"|"s"} size
 * @property {"calendar"|"range"|"one"|"multi"} type
 * @property {Array<String|Number>} occasion just day 1-31
 */

/**
 * @typedef PersianDatePickerState
 * @property {moment.Moment} now
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
    now: undefined,
    days: undefined,
    selectedDays: [],
  };

  /**
   *
   * @param {PersianDatePickerProps} props
   */
  constructor(props) {
    super(props);

    this.state.now = moment(props.date);

    this.state.days = this.#fillDays(
      this.state.now.daysInMonth(),
      props.local.type === 'fa'
        ? moment(props.date).startOf('jMonth').jDay()
        : moment(props.date).startOf('month').day(),
      props.occasion,
    );
  }

  render() {
    const {local = PERSIAN, size = 'f', type = 'calendar'} = this.props;
    const isPersian = local.type === 'fa';

    const {now, days, selectedDays} = this.state;
    const [year, month, today] = now
      .format(isPersian ? 'jYYYY-jM-jDD' : 'YYYY-M-DD')
      .split('-')
      .map(v => Number(v));

    return (
      <View
        style={[
          styles.container,
          size === 's' && {width: 240},
          size === 'm' && {width: 300},
        ]}>
        <View style={styles.yearBase}>
          <Text style={styles.arrow}>{'<'}</Text>

          <Text style={styles.yearMonthTitle}>
            {local.nameMonth[month - 1] + '\t\t\t' + formatNumber(year, local)}
          </Text>

          <Text style={styles.arrow}>{'>'}</Text>
        </View>

        <WeekView local={local} />

        <FlatList
          data={days}
          renderItem={DayItemView.bind(null, {
            type,
            size,
            local,
            isFa: local.type === 'fa',
            today: today,
            offDay: local.dayOffOfWeek + 1,
            selectedDays,
            onPress: this.#onPressDay,
          })}
          numColumns={7}
          keyExtractor={(item, index) => `${item}:${index}`}
        />
      </View>
    );
  }

  #onPressDay = item => {
    const {type} = this.props;
    const {day} = item;

    if (type !== 'calendar') {
      let selectedDays = type === 'one' ? [] : [...this.state.selectedDays];

      if (type === 'range') {
        let iItem;
        if ((iItem = selectedDays.indexOf(day)) >= 0) {
          selectedDays.splice(iItem, 1);
        } else {
          selectedDays.push(day);
          selectedDays = selectedDays.sort((a, b) => a >= b);
        }
        if (selectedDays.length > 2) {
          selectedDays = [
            selectedDays[0],
            selectedDays[selectedDays.length - 1],
          ];
        }
      } else {
        selectedDays.push(day);
      }
      this.setState({selectedDays});
    }
  };

  #fillDays = (max = 31, start = 0, occasion) => {
    return [
      ...[...Array(start).keys()].map(() => ''),
      ...[...Array(max).keys()].map(v => ({
        day: v + 1,
        occasion: occasion?.includes(v + 1),
      })),
      ...[
        ...Array(
          Math.max(0, (max + start <= 35 ? 35 : 42) - max - start),
        ).keys(),
      ].map(() => ''),
    ];
  };
}
