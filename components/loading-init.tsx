import { Image, StyleSheet, View } from 'react-native';
import { colors } from '@/theme/colors';

export default function LoadingInit() {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('@/assets/images/splash-icon.png')}
        style={styles.logo}
      />
    </View>
  );
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
});
