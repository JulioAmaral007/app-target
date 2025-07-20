
import { colors } from '@/theme/colors'
import { Image, StyleSheet, View } from 'react-native'

export default function LoadingInit() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require('@/assets/images/splash-icon.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray[900],
  },
  logo: {
    height: '20%',
    aspectRatio: 1,
  },
})
