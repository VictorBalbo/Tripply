import { getThemeProperty, useThemeColor } from '@/hooks';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export const DatePicker = () => {
  const [date, setDate] = useState<Date>(new Date());

  const backgroundColor = useThemeColor('backgroundAccent');
  const color = useThemeColor('text');
  return (
    <input
      type="datetime-local"
      style={{ ...styles.webDateTime, backgroundColor, color }}
      value={date.toISOString().replace('Z', '')}
      onChange={(e) => setDate(new Date(e.target.value))}
    />
  );
};
const borderRadius = getThemeProperty('borderRadius');
const smallSpacing = getThemeProperty('smallSpacing');

const styles = StyleSheet.create({
  webDateTime: {
    height: 30,
    borderRadius: borderRadius,
    borderWidth: 0,
    paddingLeft: smallSpacing,
    paddingRight: smallSpacing,
  },
});
