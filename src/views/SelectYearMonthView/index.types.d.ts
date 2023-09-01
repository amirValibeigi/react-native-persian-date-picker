import { Locale } from 'react-native-persian-date-picker';
import { Moment, MomentInput } from 'jalali-moment';

export declare type SelectYearMonthViewProps = {
  locale: Locale;
  isPersian: boolean;
  userDate: Moment;
  maxDate?: MomentInput;
  minDate?: MomentInput;
  maxCountYear?: number;
  onChange?: (date: Moment) => void;
};
export declare type SelectYearMonthViewAccess = {
  show: () => void;
};
