import { StyleSheet } from 'react-native';
import { styles as GlobalStyles } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
  },
  btn: {
    flex: 1,
    ...GlobalStyles.selectDayBase,
    margin: 4,
    padding: 2,
  },
  btnSelected: {
    backgroundColor: '#03a9f488',
  },
  text: {
    textAlign: 'center',
  },
  textSelected: {
    ...GlobalStyles.todayTitle,
    color: '#fff',
  },
  textSubmit: { color: '#03a9f488' },
  textCancel: { color: '#F44336' },
});
