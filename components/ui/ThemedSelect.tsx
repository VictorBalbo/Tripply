import { ButtonType, ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { getThemeProperty, useThemeColor } from '@/hooks';
import { HapticService } from '@/services';
import { SFSymbol } from 'expo-symbols';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Modal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface Option {
  label: string;
  value: string;
}

interface ThemedSelectProps {
  options: Option[];
  selectedValue?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  buttonStyle?: StyleProp<ViewStyle>;
}

export const ThemedSelect = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  buttonStyle,
}: ThemedSelectProps) => {
  const [buttonIcon, setbuttonIcon] = useState<SFSymbol>('chevron.down');
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300));

  useEffect(() => {
    if (visible) {
      setbuttonIcon('chevron.up');
      Animated.timing(slideAnim.current, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const closeModal = () => {
    setbuttonIcon('chevron.down');
    Animated.timing(slideAnim.current, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const backgroundColor = useThemeColor('backgroundSoft');
  const borderColor = useThemeColor('border');

  return (
    <ThemedView style={buttonStyle}>
      {/* Select Button */}
      <ThemedButton
        type={ButtonType.Secondary}
        onPress={() => setVisible(true)}
        title={
          options.find((opt) => opt.value === selectedValue)?.label ||
          placeholder
        }
        icon={buttonIcon}
        style={buttonStyle}
      />

      {/* Bottom Modal Picker */}
      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={closeModal}
          activeOpacity={1}
        />
        <Animated.View
          style={[
            styles.modalContainer,
            { backgroundColor, transform: [{ translateY: slideAnim.current }] },
          ]}
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.option, { borderColor }]}
                onPressIn={() => HapticService.hapticImpact()}
                onPress={() => {
                  onValueChange(item.value);
                  closeModal();
                }}
              >
                <ThemedText>{item.label}</ThemedText>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      </Modal>
    </ThemedView>
  );
};

const borderRadius = getThemeProperty('borderRadius');
const smallSpacing = getThemeProperty('smallSpacing');
const largeSpacing = getThemeProperty('largeSpacing');

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    paddingHorizontal: smallSpacing,
    maxHeight: 300,
  },
  option: {
    padding: largeSpacing,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});
