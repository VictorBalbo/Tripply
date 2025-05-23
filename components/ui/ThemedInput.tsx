import { getThemeProperty, useThemeColor } from '@/hooks';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export const ThemedInput = (props: TextInputProps) => {
  const backgroundColor = useThemeColor('backgroundAccent');
  const color = useThemeColor('text');
  const placeholderTextColor = useThemeColor('inactiveTint');
  const cursorColor = useThemeColor('link');
  return (
    <TextInput
      placeholderTextColor={placeholderTextColor}
      cursorColor={cursorColor}
      {...props}
      style={[styles.input, { backgroundColor, color }, props.style]}
    />
  );
};

const fontSize = getThemeProperty('textSize');
const borderRadius = getThemeProperty('borderRadius');
const smallSpacing = getThemeProperty('smallSpacing');

const styles = StyleSheet.create({
  input: {
    fontSize,
    lineHeight: fontSize * 1.25,
    textAlign: 'center',
    borderRadius: borderRadius,
    padding: smallSpacing,    
  },
});
