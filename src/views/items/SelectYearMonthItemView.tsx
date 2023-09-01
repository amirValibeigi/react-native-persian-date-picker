import type { MonthType } from '../../types/types';
import MaterialButton from '../MaterialButton';
import React from 'react';

export declare type SelectYearMonthItemViewProp = {
  item: string | number | MonthType;
  onPress?: (item: string | MonthType) => void;
};

export declare type SelectYearMonthItemViewAccess = {
  selected?: string | number;
};

const YearItemView = React.memo(
  ({
    selected,
    item,
    onPress,
  }: SelectYearMonthItemViewProp &
    SelectYearMonthItemViewAccess & { item: string }) => {
    return (
      <MaterialButton
        selected={selected === item}
        onPress={onPress?.bind(null, item)}
      >
        {item}
      </MaterialButton>
    );
  }
);
const MonthItemView = React.memo(
  ({
    selected,
    item,
    onPress,
  }: SelectYearMonthItemViewProp &
    SelectYearMonthItemViewAccess & { item: MonthType }) => {
    return (
      <MaterialButton
        selected={selected === item.monthNumber}
        onPress={onPress?.bind(null, item)}
      >
        {item.month}
      </MaterialButton>
    );
  }
);

function SelectYearMonthItemView(
  access: SelectYearMonthItemViewAccess,
  { item, ...props }: SelectYearMonthItemViewProp
) {
  if (typeof item === 'string' || typeof item === 'number') {
    return <YearItemView {...access} item={item as string} {...props} />;
  }

  return <MonthItemView {...access} item={item as MonthType} {...props} />;
}

export default SelectYearMonthItemView;
