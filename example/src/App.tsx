import * as React from 'react';

import { SafeAreaView } from 'react-native';
import PersianDatePicker from 'react-native-persian-date-picker';

export default function App() {
  console.log('test');
  return (
    <SafeAreaView style={{ padding: 40 }}>
      <PersianDatePicker
        size="s"
        type="calendar"
        onPressDay={(dates) => console.log(dates)}
      />
    </SafeAreaView>
  );
}
