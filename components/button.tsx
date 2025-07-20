import { colors, fontFamily } from '@/theme'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'


type Props = TouchableOpacityProps & {
  title: string
  isProcessing?: boolean
}

export function Button({ title, isProcessing = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      disabled={isProcessing}
      {...rest}
    >
      <Text style={styles.title}>
        {isProcessing ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue[500],
    height: 48,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.white,
  },
})