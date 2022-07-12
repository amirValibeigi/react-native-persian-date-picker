import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  arrow: {
    color: '#3c3c3c',
    fontSize: 20,
    marginHorizontal: 8,
    minHeight: 30,
    minWidth: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  container: {
    backgroundColor: '#fff',
    elevation: 4,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  containerM: {
    width: 300,
  },
  containerS: {
    width: 240,
  },
  dayBase: {
    alignContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    flex: 1,
    justifyContent: 'center',
    marginVertical: 5,
  },
  dayOccasion: {
    fontSize: 10,
    fontWeight: '800',
    lineHeight: 8,
    opacity: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dayOccasionShow: {
    opacity: 1,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  offDayTitle: {
    color: '#F44336',
  },
  selectDayBase: {
    backgroundColor: '#fff',
    borderColor: '#03a9f488',
    borderRadius: 5,
    borderWidth: 1,
  },
  selectDayMargin: {
    margin: 2,
  },
  selectDayTitle: {
    color: '#03a9f4',
    fontWeight: 'bold',
  },
  selectEndDayBase: {
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    fontWeight: 'bold',
    marginRight: 2,
    paddingLeft: 1,
  },
  selectMiddleDayBase: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingLeft: 1,
    paddingRight: 1,
  },
  selectStartDayBase: {
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    fontWeight: 'bold',
    marginLeft: 2,
    paddingRight: 1,
  },
  textL: {
    fontSize: 20,
  },
  todayBase: {
    backgroundColor: '#03a9f4',
    borderRadius: 5,
  },
  todayTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weekBase: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
    minHeight: 30,
    minWidth: 30,
  },
  weekTitle: {
    color: '#2c2c2c',
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  yearBase: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  yearMonthTitle: {
    color: '#2c2c2c',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
