import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { ThemedInput } from '../ThemedInput';
import { ThemedText } from '../ThemedText';

export type FakeCurrencyInputProps = Omit<TextInputProps, 'value'> & {
  containerStyle?: StyleProp<ViewStyle>;
  value?: number;
  precision?: number;
  maxValue?: number;
  minValue?: number;
  onChangeValue?(value?: number): void;
};

/**
 * This component hides the real currency input and use a Text to imitate the input and fix the flickering issue.
 */
const FakeCurrencyInput = (props: FakeCurrencyInputProps) => {
  const {
    value,
    precision = 2,
    maxValue,
    minValue,
    style,
    onChangeValue,
    containerStyle,
    ...rest
  }: FakeCurrencyInputProps = props;

  const [formattedValue, setFormattedValue] = useState<number>();

  const handleChangeText = useCallback(
    (text: string) => {
      const textNumericValue = text.replace(/\D+/g, '');
      const numberValue = Number(textNumericValue);
      const zerosOnValue = textNumericValue.replace(/[^0]/g, '').length;

      let newValue: number | undefined;

      if (!numberValue && zerosOnValue === precision) {
        // Allow to clean the value instead of being 0
        newValue = undefined;
      } else {
        newValue = numberValue / 10 ** precision;
      }

      if (newValue && maxValue && newValue > maxValue) {
        return;
      } else if (newValue && minValue && newValue < minValue) {
        return;
      }

      setFormattedValue(newValue);
      onChangeValue && onChangeValue(newValue);
    },
    [precision, maxValue, minValue, onChangeValue]
  );

  const inputProps: TextInputProps = useMemo(
    () => ({
      keyboardType: 'numeric' as const,
      ...rest,
      value: formattedValue?.toString(),
      onChangeText: handleChangeText,
    }),
    [handleChangeText, rest, formattedValue]
  );

  return (
    <View style={[containerStyle, styles.inputContainer]}>
      <ThemedText style={styles.fakeContent}>{formattedValue}</ThemedText>
      <ThemedInput {...inputProps} style={styles.inputHidden} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  fakeContent: {
    textAlign: 'center',
  },
  inputHidden: {
    color: 'transparent',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default FakeCurrencyInput;
