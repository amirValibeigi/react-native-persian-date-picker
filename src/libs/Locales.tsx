export interface Locale {
  dayOffOfWeek: number;
  daysOfWeek: Array<string>;
  nameDaysOfWeek: Array<string>;
  nameMonth: Array<string>;
  type: 'fa' | 'en' | string;
}

export const PERSIAN: Locale = {
  dayOffOfWeek: 6,
  daysOfWeek: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
  nameDaysOfWeek: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
  nameMonth: [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ],
  type: 'fa',
};

export const PERSIAN_EN: Locale = {
  ...PERSIAN,
  daysOfWeek: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
};

export const ENGLISH: Locale = {
  dayOffOfWeek: 6,
  daysOfWeek: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  nameDaysOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  nameMonth: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  type: 'en',
};

export const ENGLISH_FA: Locale = {
  ...ENGLISH,
  daysOfWeek: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
  nameMonth: [
    'ژانویه',
    'فوریه',
    'مارس',
    'آوریل',
    'مه',
    'ژوئن',
    'ژوئیه',
    'آگوست',
    'سپتامبر',
    'اکتبر',
    'نوامبر',
    'دسامبر',
  ],
};
