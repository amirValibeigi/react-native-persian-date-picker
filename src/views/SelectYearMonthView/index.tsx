import React from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './styles';
import { styles as GlobalStyles } from '../../styles';
import type {
  SelectYearMonthViewAccess,
  SelectYearMonthViewProps,
} from './index.types';
import { useUI } from './hooks';
import MaterialButton from '../MaterialButton';

const SelectYearMonthView = React.memo(
  React.forwardRef<SelectYearMonthViewAccess, SelectYearMonthViewProps>(
    ({ userDate, locale, isPersian, maxDate, maxCountYear, minDate }, ref) => {
      const {
        isShow,
        isYear,
        year,
        month,
        data,
        renderItem,
        onPressYear,
        onPressMonth,
        onPressSubmit,
        onPressCancel,
      } = useUI({
        userDate,
        locale,
        isPersian,
        ref,
        maxDate,
        minDate,
        maxCountYear,
      });

      if (!isShow) {
        return <></>;
      }

      return (
        <View style={styles.container}>
          <View style={GlobalStyles.row}>
            <MaterialButton selected={isYear} onPress={onPressYear}>
              {year}
            </MaterialButton>
            <MaterialButton selected={!isYear} onPress={onPressMonth}>
              {month}
            </MaterialButton>
          </View>
          <FlatList
            style={GlobalStyles.fillParent}
            data={data}
            renderItem={renderItem}
            numColumns={2}
          />
          <View style={GlobalStyles.row}>
            <MaterialButton
              styleTitle={styles.textSubmit}
              onPress={onPressSubmit}
            >
              ✔
            </MaterialButton>
            <MaterialButton
              styleTitle={styles.textCancel}
              onPress={onPressCancel}
            >
              ✖
            </MaterialButton>
          </View>
        </View>
      );
    }
  )
);

export default SelectYearMonthView;
