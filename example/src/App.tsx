import * as React from 'react';

import { SafeAreaView } from 'react-native';
import PersianDatePicker from 'react-native-persian-date-picker';

export default function App() {
  return (
    <SafeAreaView style={{ padding: 40 }}>
      <PersianDatePicker
        size="s"
        type="multi"
        outputDateFormat="jYYYY-jMM-jDD"
        onPressDay={(dates) => console.log('change', dates)}
      />
    </SafeAreaView>
  );
}
