import { Theme } from '@/constants/Theme';
import { useThemeColor } from '@/hooks';
import { StyleSheet, Text, type TextProps } from 'react-native';

export enum TextType {
  Default = 'default',
  Title = 'title',
  Bold = 'bold',
  Subtitle = 'subtitle',
  Link = 'link',
  Small = 'small',
}

export type ThemedTextProps = TextProps & {
  type?: TextType;
};

export const ThemedText = ({
  style,
  type = TextType.Default,
  ...rest
}: ThemedTextProps) => {
  const textColor = useThemeColor('text');
  const linkColor = useThemeColor('link');
  const helperTextColor = useThemeColor('helperText');
  let color;
  let typeStyle;
  switch (type) {
    case 'default':
      color = textColor;
      typeStyle = styles.default;
      break;
    case 'title':
      color = textColor;
      typeStyle = styles.title;
      break;
    case 'bold':
      color = textColor;
      typeStyle = styles.semiBold;
      break;
    case 'subtitle':
      color = textColor;
      typeStyle = styles.subtitle;
      break;
    case 'link':
      color = linkColor;
      typeStyle = styles.link;
      break;
    case 'small':
      color = helperTextColor;
      typeStyle = styles.small;
      break;
  }
  return <Text style={[{ color }, typeStyle, style]} {...rest} />;
};

const styles = StyleSheet.create({
  default: {
    fontSize: Theme.base.textSize,
    lineHeight: Theme.base.textSize * 1.25,
  },
  semiBold: {
    fontSize: Theme.base.textSize,
    lineHeight: Theme.base.textSize * 1.25,
    fontWeight: '600',
  },
  title: {
    fontSize: Theme.base.textSize * 2,
    lineHeight: Theme.base.textSize * 2.5,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Theme.base.textSize * 1.5,
    lineHeight: Theme.base.textSize * 1.875,
    fontWeight: 'bold',
  },
  link: {
    fontSize: Theme.base.textSize,
    lineHeight: Theme.base.textSize * 1.25,
  },
  small: {
    fontSize: Theme.base.textSize * 0.75,
    lineHeight: Theme.base.textSize * 0.875,
  },
});
