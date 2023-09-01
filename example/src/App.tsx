import * as React from 'react';

import { SafeAreaView } from 'react-native';
import PersianDatePicker, { ENGLISH } from 'react-native-persian-date-picker';

export default function App() {
  return (
    <SafeAreaView style={{ padding: 40 }}>
      <PersianDatePicker
        size="s"
        type="multi"
        outputDateFormat="jYYYY-jMM-jDD"
        onPressDay={(dates) => console.log('onPressDay', dates)}
        onChangeYearMonth={(date) => console.log('changeYearMonth', date)}
      />
      <PersianDatePicker
        size="s"
        type="multi"
        locale={ENGLISH}
        outputDateFormat="YYYY-MM-DD"
        onPressDay={(dates) => console.log('EN:onPressDay', dates)}
        onChangeYearMonth={(date) => console.log('EN:changeYearMonth', date)}
      />
    </SafeAreaView>
  );
}
