/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
import { BaseScheme, ColorScheme, Theme } from '@/constants/Theme';
import { useColorScheme } from 'react-native';

export function useThemeColor(propertyName: keyof ColorScheme) {
  const currentTheme = useColorScheme() ?? 'dark';
  return Theme[currentTheme][propertyName];
}
export function getThemeProperty(propertyName: keyof BaseScheme) {
  return Theme.base[propertyName];
}
