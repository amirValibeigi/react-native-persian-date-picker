# React Native Persian Date Picker

## Install

```bash
npm i @rhv79/react-native-persian-date-picker
```

## Usage

### basic

```javascript
import PersianDatePicker from "@rhv79/react-native-persian-date-picker";

<PersianDatePicker />;
```

### custom style

![Alt text](screenshots/normal.png?raw=false "normal and dark")

```javascript
import PersianDatePicker from "@rhv79/react-native-persian-date-picker";

const days = [
  {
    date: "1401-01-06",
    isOffDay: false,
    description: "روز امید، روز شادباش نویسی",
  },
  {
    date: "1401-01-13",
    isOffDay: true,
    description: "جشن سیزده به در",
  },
];

const minDisableDate = "1401-01-03";
const disableDate = ["1401-01-09"];
const maxDisableDate = "1401-01-20";

<View>
  {/** dark mode */}
  <PersianDatePicker
    inputDateFormat="jYYYY-jMM-jDD"
    days={days}
    minDate={minDisableDate}
    maxDate={maxDisableDate}
    disabledDate={disableDate}
    size="m"
    style={{ backgroundColor: "#3c3c3c" }}
    styleYearMonth={{ icons: { color: "#fff" }, title: { color: "#fff" } }}
    styleDay={{
      title: { color: "#fff" },
      containerIsDisabled: { backgroundColor: "#8c8c8c55", margin: 2 },
      containerIsSelected: { backgroundColor: "#ffffff66" },
      occasion: { color: "#fff" },
    }}
    styleWeek={{ item: { color: "#fff" } }}
    styleDescription={{ item: { title: { color: "#fff" } } }}
  />

  {/** normal */}
  <PersianDatePicker
    inputDateFormat="jYYYY-jMM-jDD"
    days={days}
    minDate={minDisableDate}
    maxDate={maxDisableDate}
    disabledDate={disableDate}
    styleDay={{
      containerIsDisabled: { margin: 2 },
    }}
    size="m"
  />
</View>;
```

---

### type: calendar or one

![Alt text](screenshots/selectOne.png?raw=false "normal and dark")

```javascript
<View>
  <PersianDatePicker
    type="one"
    inputDateFormat="jYYYY-jMM-jDD"
    days={days}
    minDate={minDisableDate}
    maxDate={maxDisableDate}
    disabledDate={disableDate}
    size="m"
    onPressDay={(dates) => console.log(dates)}
  />
</View>
```

```bash
output: ["2022-03-28T00:00:00+04:30"]
```

---

### type: range

![Alt text](screenshots/selectRange.png?raw=false "normal and dark")

```javascript
<View>
  <PersianDatePicker
    type="range"
    inputDateFormat="jYYYY-jMM-jDD"
    outputDateFormat="jYYYY-jMM-jDD"
    days={days}
    minDate={minDisableDate}
    maxDate={maxDisableDate}
    disabledDate={disableDate}
    size="m"
    onPressDay={(dates) => console.log(dates)}
  />
</View>
```

```bash
output: ["1401-01-08", "1401-01-18"]
```

---

### locales

![Alt text](screenshots/locales.png?raw=false "normal and dark")

```javascript
import PersianDatePicker, {
  ENGLISH_FA,
  PERSIAN_EN,
} from "@rhv79/react-native-persian-date-picker";

<PersianDatePicker
  type="range"
  inputDateFormat="jYYYY-jMM-jDD"
  days={days}
  minDate={minDisableDate}
  maxDate={maxDisableDate}
  disabledDate={disableDate}
  size="m"
  locale={PERSIAN_EN}
/>;

<PersianDatePicker
  type="range"
  inputDateFormat="jYYYY-jMM-jDD"
  days={days}
  minDate={minDisableDate}
  maxDate={maxDisableDate}
  disabledDate={disableDate}
  size="m"
  locale={ENGLISH_FA}
/>;
```

### custom locales

![Alt text](screenshots/customLocal.png?raw=false "normal and dark")

```javascript
import PersianDatePicker, {
  PERSIAN,
} from "@rhv79/react-native-persian-date-picker";

const customLocal = {
  ...PERSIAN,
  nameDaysOfWeek: ["😥", "😑", "😐", "🤐", "🙄", "🤩", "😍"],
  nameMonth: ["🤑"], //فروردین
};

<PersianDatePicker
  inputDateFormat="jYYYY-jMM-jDD"
  days={days}
  minDate={minDisableDate}
  maxDate={maxDisableDate}
  disabledDate={disableDate}
  size="m"
/>;

<PersianDatePicker
  type="range"
  inputDateFormat="jYYYY-jMM-jDD"
  days={days}
  minDate={minDisableDate}
  maxDate={maxDisableDate}
  disabledDate={disableDate}
  size="m"
/>;
```

---

## props

| prop                | type                            |
| ------------------- | ------------------------------- |
| date                | String \| Number \| Date        |
| days                | Array<DayType>                  |
| disabledDate        | Array<String \| Number \| Date> |
| inputDateFormat     | String                          |
| locale              | Locale                          |
| maxDate             | String                          |
| minDate             | String                          |
| onPressDay          | (dates:Array<String>)=>void     |
| outputDateFormat    | String                          |
| renderDay           | RenderDay                       |
| renderDescription   | RenderDescription               |
| renderNextMonth     | RenderNextMonth                 |
| renderPreviousMonth | RenderPreviousMonth             |
| showDescription     | Boolean                         |
| size                | SizeType                        |
| style               | ViewStyle                       |
| styleDay            | StyleDayItem                    |
| styleDescription    | StyleDescription                |
| styleWeek           | StyleWeek                       |
| styleYearMonth      | StyleYearMonth                  |
| type                | CalendarType                    |

### CalendarType

"calendar" \| "range" \| "one" \| "multi"

### DateType

Date | String | Number | Object

### SizeType

"s" \| "m" \| "f"

- s: small
- m: medium
- f: full flex=1

### DayType

| prop         | type     |
| ------------ | -------- |
| date?        | DateType |
| isOffDay?    | Boolean  |
| isToday?     | Boolean  |
| description? | String   |

### Locale

| prop           | type           |
| -------------- | -------------- |
| dayOffOfWeek   | Number         |
| daysOfWeek     | Array\<String> |
| nameDaysOfWeek | Array\<String> |
| nameMonth      | Array\<String> |
| type           | String         |

### RenderDay

| prop             | type                           |
| ---------------- | ------------------------------ |
| item             | DayType                        |
| index            | Number                         |
| type             | CalendarType                   |
| locale           | Locale                         |
| isPersian        | Boolean                        |
| isSelected       | Boolean                        |
| isSelectedFirst  | Boolean                        |
| isSelectedLast   | Boolean                        |
| isSelectedMiddle | Boolean                        |
| style?           | StyleDayItem                   |
| onPress          | (day: Array\<DayType>) => void |

### StyleDayItem

| prop                   | type      |
| ---------------------- | --------- |
| container?             | ViewStyle |
| containerIsToday?      | ViewStyle |
| containerIsSelected?   | ViewStyle |
| containerIsDisabled?   | ViewStyle |
| containerSelectStart?  | ViewStyle |
| containerSelectEnd?    | ViewStyle |
| containerSelectMiddle? | ViewStyle |
| title?                 | TextStyle |
| titleIsToday?          | TextStyle |
| titleIsSelected?       | TextStyle |
| titleIsSelectedMiddle? | TextStyle |
| titleIsOffDay?         | TextStyle |
| titleIsPersian?        | TextStyle |
| occasion?              | TextStyle |
| occasionIsOffDay?      | TextStyle |
| occasionDescription?   | TextStyle |
