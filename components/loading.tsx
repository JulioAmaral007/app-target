import type { ActivityIndicatorProps } from 'react-native';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '@/theme/colors';

export function Loading({
  size = 'large',
  color = colors.blue[500],
}: ActivityIndicatorProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
}
