import { colors } from '@/theme'
import { fontFamily } from '@/theme/fontFamily'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, View } from 'react-native'
import { Separator } from './separator'
import { Summary } from './summary'

export type HomeHeaderProps = {
  total: string
}

type Props = {
  data: HomeHeaderProps
}

export function HomeHeader({ data }: Props) {
  return (
<LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>

      <Separator color={colors.blue[400]} />

      <View style={styles.summary}>
        <Summary
          data={{ label: 'Entradas', value: 'R$ 6.184,90' }}
          icon={{ name: 'arrow-upward', color: colors.blue[400] }}
        />

        <Summary
          isLeft
          data={{ label: 'Saídas', value: '-R$ 883,65' }}
          icon={{ name: 'arrow-downward', color: colors.red[400] }}
        />
      </View>
    </LinearGradient>
  )
}



const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 324,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    paddingBottom: 18,
    gap: 24,
  },
  label: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fontFamily.regular,
  },
  total: {
    fontSize: 32,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  summary: {
    width: '100%',
    gap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})