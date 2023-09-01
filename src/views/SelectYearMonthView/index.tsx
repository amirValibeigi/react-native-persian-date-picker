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
    (
      { userDate, locale, isPersian, maxDate, maxCountYear, minDate, onChange },
      ref
    ) => {
      const {
        data,
        isShow,
        isYear,
        currentUserYear,
        currentUserNameMonth,
        renderItem,
        onPressCancel,
        onPressMonth,
        onPressSubmit,
        onPressYear,
      } = useUI({
        isPersian,
        locale,
        maxCountYear,
        maxDate,
        minDate,
        ref,
        userDate,
        onChange,
      });

      if (!isShow) {
        return <></>;
      }

      return (
        <View style={styles.container}>
          <View style={GlobalStyles.row}>
            <MaterialButton selected={isYear} onPress={onPressYear}>
              {currentUserYear}
            </MaterialButton>
            <MaterialButton
              selected={!isYear}
              onPress={onPressMonth}
              onLayout={data.onLayout}
            >
              {currentUserNameMonth}
            </MaterialButton>
          </View>
          <FlatList
            ref={data.refList}
            style={GlobalStyles.fillParent}
            data={data.data}
            renderItem={renderItem}
            numColumns={2}
            viewabilityConfigCallbackPairs={
              data.refViewabilityConfigCallbackPair.current
            }
            getItemLayout={data.getItemLayout}
            maxToRenderPerBatch={Math.min(maxCountYear ?? 40, 100)}
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
