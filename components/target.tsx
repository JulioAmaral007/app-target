import { MaterialIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native';
import { colors, fontFamily } from '@/theme';

export type TargetProps = {
  id?: string;
  name: string;
  percentage: string;
  current: string;
  target: string;
};

type Props = TouchableOpacityProps & {
  data: TargetProps;
};

export function Target({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.content}>
        <Text style={styles.name}>{data.name}</Text>

        <Text style={styles.status}>
          {data.percentage} • {data.current} de {data.target}
        </Text>
      </View>

      <MaterialIcons name="chevron-right" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    gap: 7,
  },
  name: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
  status: {
    fontSize: 10,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
});
