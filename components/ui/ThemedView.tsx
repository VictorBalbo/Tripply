import { useThemeColor } from '@/hooks';
import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  softBackground?: boolean;
  background?: boolean;
};

export function ThemedView({
  style,
  softBackground,
  background,
  ...otherProps
}: ThemedViewProps) {
  let backgroundColor;
  const defaultBackgroundColor = useThemeColor('background');
  const defaultBackgroundSoftColor = useThemeColor('backgroundSoft');

  if (background) {
    backgroundColor = defaultBackgroundColor;
  } else if (softBackground) {
    backgroundColor = defaultBackgroundSoftColor;
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
