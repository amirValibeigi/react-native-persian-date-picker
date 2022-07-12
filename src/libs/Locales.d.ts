export interface Locale {
  dayOffOfWeek: Number;
  daysOfWeek: Array<String>;
  nameDaysOfWeek: Array<String>;
  nameMonth: Array<String>;
  type: "fa" | "en";
}

export const PERSIAN: Locale;
export const PERSIAN_EN: Locale;
export const ENGLISH: Locale;
export const ENGLISH_FA: Locale;
