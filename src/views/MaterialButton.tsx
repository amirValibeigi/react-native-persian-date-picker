import React from 'react';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
} from 'react-native';
import { styles } from './SelectYearMonthView/styles';

export declare type MaterialButtonProp = {
  children?: string | number;
  onPress?: () => void;
  selected?: boolean;
  styleTitle?: StyleProp<TextStyle>;
};

const MaterialButton = React.memo(
  ({ children, onPress, selected, styleTitle }: MaterialButtonProp) => {
    return (
      <TouchableOpacity
        style={[styles.btn, selected && styles.btnSelected]}
        onPress={onPress}
      >
        <Text
          style={[styles.text, selected && styles.textSelected, styleTitle]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default MaterialButton;
