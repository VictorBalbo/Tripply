import { Colors } from '@/constants/Theme';
import { SFSymbol } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';
import { Icon } from './Icon/Icon';
import { PressableView } from './PressableView';
import { TextType, ThemedText } from './ThemedText';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Delete = 'delete',
}

interface ButtonProps {
  onPress: () => void;
  title: string;
  icon?: SFSymbol;
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;
}

export const ThemedButton = ({
  onPress,
  title,
  icon,
  type = ButtonType.Primary,
  style,
}: ButtonProps) => {
  let backgroundColor;
  let textColor;
  switch (type) {
    case ButtonType.Secondary:
      backgroundColor = Colors.blackLight;
      textColor = Colors.white;
      break;
    case ButtonType.Delete:
      backgroundColor = Colors.red;
      textColor = Colors.white;
      break;
    case ButtonType.Primary:
    default:
      backgroundColor = Colors.blue;
      textColor = Colors.white;
      break;
  }

  return (
    <PressableView onPress={onPress} style={[style, { backgroundColor }]}>
      {icon && <Icon size={20} color={textColor} name={icon} />}
      <ThemedText type={TextType.Bold}>{title}</ThemedText>
    </PressableView>
  );
};
