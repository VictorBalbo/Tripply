import { ThemedSelect } from '@/components/ui/ThemedSelect';
import { ThemedView } from '@/components/ui/ThemedView';
import { getThemeProperty, useThemeColor } from '@/hooks/useTheme';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import FakeCurrencyInput from './FakeCurrencyInput';

interface InputMoneyProps {
  model: { value?: number; currency?: string };
  onValueChange: ({
    value,
    currency,
  }: {
    value?: number;
    currency?: string;
  }) => void;
  placeholder?: string;
  style: StyleProp<ViewStyle>;
}

export const InputMoney = ({
  model,
  onValueChange,
  style,
}: InputMoneyProps) => {
  const backgroundColor = useThemeColor('backgroundAccent');
  const color = useThemeColor('text');
  const placeholderColor = useThemeColor('inactiveTint');
  const divider = useThemeColor('border');

  const currencies = [
    { label: 'USD ($)', value: 'USD' },
    { label: 'EUR (€)', value: 'EUR' },
    { label: 'GBP (£)', value: 'GBP' },
    { label: 'BRL (R$)', value: 'BRL' },
  ];
  model.currency ??= 'BRL';
  console.log('model', model);

  return (
    <ThemedView style={[styles.inputMoneyContainer, style]}>
      <ThemedSelect
        options={currencies}
        onValueChange={(currency) =>
          onValueChange({ value: model.value, currency })
        }
        selectedValue={model.currency}
        buttonStyle={[styles.currencyButton]}
      />
      <FakeCurrencyInput
        value={model.value}
        placeholder="0.00"
        onChangeValue={(val) =>
          onValueChange({ value: val, currency: model.currency })
        }
        maxValue={1000000}
        keyboardType="numeric"
        autoComplete="off"
        autoCorrect={false}
        placeholderTextColor={placeholderColor}
        containerStyle={[
          styles.fakeInputContainer,
          { borderLeftColor: divider, backgroundColor },
        ]}
        style={[styles.fakeInput, { color }]}
      />
    </ThemedView>
  );
};

const fontSize = getThemeProperty('textSize');
const borderRadius = getThemeProperty('borderRadius');

const styles = StyleSheet.create({
  inputMoneyContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  currencyButton: {
    fontWeight: 300,
    borderRadius: 0,
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
  },
  fakeInputContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    justifyContent: 'center',
  },
  fakeInput: {
    fontSize: fontSize,
    lineHeight: fontSize * 1.25,
  },
});
