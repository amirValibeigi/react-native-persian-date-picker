# React Native Persian Date Picker
[![Version](https://img.shields.io/npm/v/@rhv79/react-native-persian-date-picker.svg)](https://amirvalibeigi.github.io/react-native-persian-date-picker)

[Docs En](https://amirvalibeigi.github.io/?/react-native-persian-date-picker?lng=en)

[Docs Fa](https://amirvalibeigi.github.io/?/react-native-persian-date-picker?lng=fa)


| platform     | support |
|--------------|---------|
| android      | ✅       |
| expo         | ✅       |
| ios          | ✅       |
| react-native | ✅       |
| web          | ✅       |

---

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

![custom style, normal and dark](screenshots/normal.png?raw=false "custom style, normal and dark")

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

![one, normal and dark](screenshots/selectOne.png?raw=false "one, normal and dark")

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

```
output: ["2022-03-28T00:00:00+04:30"]
```

---

### type: range

![range, normal and dark](screenshots/selectRange.png?raw=false "range, normal and dark")

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

```
output: ["1401-01-08", "1401-01-18"]
```

---

### locales

![locales, normal and dark](screenshots/locales.png?raw=false "locales, normal and dark")

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

![custom locales, normal and dark](screenshots/customLocal.png?raw=false "custom locales,normal and dark")

```javascript
import PersianDatePicker, {
  PERSIAN,
} from "@rhv79/react-native-persian-date-picker";

const customLocale = {
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
  locale={customLocale}
/>;
```

### Year and Month Picker

![year picker](screenshots/yearPicker.png?raw=false "year picker")

![month picker](screenshots/monthPicker.png?raw=false "month picker")


```javascript
<PersianDatePicker
  size="m"
  onChangeYearMonth={(date) => console.log('changeYearMonth', date)}
/>;
```

```
output: changeYearMonth 2023-09-04T10:45:35+04:30
```
