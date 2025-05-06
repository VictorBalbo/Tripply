import { getThemeProperty } from '@/hooks';
import { StyleSheet, type ViewProps } from 'react-native';
import { ThemedView } from './ThemedView';

export function CardView({ style, ...otherProps }: ViewProps) {
  return (
    <ThemedView
      softBackground
      style={[cardStyle.card, style]}
      {...otherProps}
    />
  );
}
const smallSpacing = getThemeProperty('smallSpacing');
const borderRadius = getThemeProperty('borderRadius');

const cardStyle = StyleSheet.create({
  card: {
    padding: smallSpacing,
    borderRadius: borderRadius,
  },
});
