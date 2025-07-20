import { StyleSheet, Text, View } from 'react-native';
import Input, { type CurrencyInputProps } from 'react-native-currency-input';
import { colors, fontFamily } from '@/theme';

type Props = CurrencyInputProps & {
  label: string;
};

export function CurrencyInput({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Input
        delimiter="."
        minValue={0}
        placeholderTextColor={colors.gray[400]}
        precision={2}
        separator=","
        style={styles.input}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
  label: {
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
    fontSize: 12,
  },
  input: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
  },
});
