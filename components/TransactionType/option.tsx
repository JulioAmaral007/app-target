import { MaterialIcons } from '@expo/vector-icons';
import {
  type ColorValue,
  Pressable,
  type PressableProps,
  Text,
} from 'react-native';
import { colors } from '@/theme';
import { styles } from '.';

type Props = PressableProps & {
  isSelected: boolean;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  selectedColor: ColorValue;
};

export function Option({
  isSelected,
  title,
  icon,
  selectedColor,
  ...rest
}: Props) {
  return (
    <Pressable
      style={[styles.option, isSelected && { backgroundColor: selectedColor }]}
      {...rest}
    >
      <MaterialIcons
        color={isSelected ? colors.white : colors.gray[500]}
        name={icon}
        size={24}
      />
      <Text style={[styles.title, isSelected && { color: colors.white }]}>
        {title}
      </Text>
    </Pressable>
  );
}
