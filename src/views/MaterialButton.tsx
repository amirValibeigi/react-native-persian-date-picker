import React from 'react';
import {
  type StyleProp,
  Text,
  type TextProps,
  type TextStyle,
  TouchableOpacity,
} from 'react-native';
import { styles } from './SelectYearMonthView/styles';

export declare type MaterialButtonProp = TextProps & {
  children?: string | number;
  onPress?: () => void;
  selected?: boolean;
  styleTitle?: StyleProp<TextStyle>;
};

const MaterialButton = React.memo(
  ({
    children,
    onPress,
    selected,
    styleTitle,
    ...props
  }: MaterialButtonProp) => {
    return (
      <TouchableOpacity
        style={[styles.btn, selected && styles.btnSelected]}
        onPress={onPress}
      >
        <Text
          style={[styles.text, selected && styles.textSelected, styleTitle]}
          {...props}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default MaterialButton;
