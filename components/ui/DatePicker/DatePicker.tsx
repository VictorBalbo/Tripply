import { getThemeProperty } from '@/hooks/useTheme';
import DateTimePicker, {
  AndroidNativeProps,
  DateTimePickerAndroid,
  DateTimePickerEvent,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { ButtonType, ThemedButton } from '../ThemedButton';
import { ThemedView } from '../ThemedView';

export const DatePicker = (props: IOSNativeProps & AndroidNativeProps) => {
  const toUtc = (date?: Date) =>
    date
      ? dayjs(date).subtract(dayjs(date).utcOffset(), 'minute').toDate()
      : undefined;
  const fromUtc = (date?: Date) =>
    date
      ? dayjs(date).add(dayjs(date).utcOffset(), 'minute').toDate()
      : undefined;

  const date = useMemo(() => toUtc(props.value ?? new Date())!, [props.value]);
  const setDate = (e: DateTimePickerEvent, date?: Date) => {
    if (e.type === 'set') {
      console.log(fromUtc(date), e.type)
      props.onChange?.(e, fromUtc(date));
    }
  };
  const minDate = useMemo(() => toUtc(props.minimumDate), [props.minimumDate]);
  const maxDate = useMemo(() => toUtc(props.maximumDate), [props.maximumDate]);

  if (Platform.OS === 'ios') {
    return (
      <DateTimePicker
        {...props}
        value={date}
        minimumDate={minDate}
        maximumDate={maxDate}
        mode="datetime"
        onChange={setDate}
      />
    );
  } else if (Platform.OS === 'android') {
    const showMode = (currentMode: 'date' | 'time') => {
      DateTimePickerAndroid.open({
        mode: currentMode,
        is24Hour: false,
        ...props,
        minimumDate: minDate,
        maximumDate: maxDate,
        onChange: setDate,
      });
    };

    const showDatepicker = () => {
      console.log('date')
      showMode('date');
    };

    const showTimepicker = () => {
      showMode('time');
    };
    return (
      <ThemedView style={styles.androidDateTime}>
        <ThemedButton
          {...props}
          type={ButtonType.Secondary}
          onPress={showDatepicker}
          title={date.toLocaleDateString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
          style={styles.androidButton}
        />
        <ThemedButton
          {...props}
          type={ButtonType.Secondary}
          onPress={showTimepicker}
          title={date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
          style={styles.androidButton}
        />
      </ThemedView>
    );
  }
};

const smallSpacing = getThemeProperty('smallSpacing');

const styles = StyleSheet.create({
  androidDateTime: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: smallSpacing,
  },
  androidButton: {
    paddingHorizontal: smallSpacing,
  },
});
