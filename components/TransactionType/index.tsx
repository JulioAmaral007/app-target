import { colors, fontFamily } from '@/theme'
import { TransactionTypes } from '@/utils/types'
import { StyleSheet, View } from 'react-native'
import { Option } from './option'

type Props = {
  selected: TransactionTypes
  onChange: (type: TransactionTypes) => void
}

export function TransactionType({ selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Option
        icon="arrow-upward"
        title="Guardar"
        isSelected={selected === TransactionTypes.Input}
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionTypes.Input)}
      />
      <Option
        icon="arrow-downward"
        title="Resgatar"
        isSelected={selected === TransactionTypes.Output}
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionTypes.Output)}
      />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: 42,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    overflow: 'hidden',
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    gap: 7,
  },
  title: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.gray[500],
  },
})