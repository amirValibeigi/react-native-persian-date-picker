import React from 'react';
import { FlatList, type StyleProp, View, type ViewStyle } from 'react-native';
import { getDescriptionSelectedDays } from '../libs/Utils';
import { styles } from '../styles';
import { type CalendarType, type DayType } from '../types/types';
import type { MomentInput } from 'jalali-moment';
import DescriptionItemView, {
  type DescriptionItemStyle,
} from './items/DescriptionItemView';

export declare type StyleDescription = {
  container?: StyleProp<ViewStyle>;
  item?: DescriptionItemStyle;
};

export declare type RenderDescription = React.FC<{
  days: Array<DayType>;
  style?: StyleDescription;
}>;

export declare type DescriptionViewType = {
  style?: StyleDescription;

  days: Array<DayType>;
  selectedDays: Array<MomentInput>;
  userDate: MomentInput;
  type: CalendarType;
  isPersian: boolean;
  show: boolean;

  renderDescription?: RenderDescription;
};

const DescriptionView = ({
  style,
  days,
  selectedDays,
  userDate,
  renderDescription,
  type = 'calendar',
  isPersian = true,
  show = true,
}: DescriptionViewType) => {
  const _days = React.useMemo(
    () => getDescriptionSelectedDays(days, selectedDays, userDate, isPersian),
    [days, selectedDays, userDate, isPersian]
  );

  if (!show || _days?.length === 0 || type === 'range') return <></>;

  if (renderDescription) {
    return renderDescription({ days: _days, style });
  }

  return (
    <FlatList
      data={_days}
      keyExtractor={(item, index) => `${item}:${index}`}
      renderItem={DescriptionItemView.bind(null, { style: style?.item })}
      ListHeaderComponent={
        _days?.length > 0 ? <View style={styles.line} /> : undefined
      }
      style={style?.container}
    />
  );
};

export default React.memo(DescriptionView);
