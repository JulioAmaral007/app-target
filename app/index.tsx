import { router } from 'expo-router';
import { View } from 'react-native';
import { Button } from '@/components/button';
import { HomeHeader } from '@/components/home-header';
import { List } from '@/components/list';
import { Target } from '@/components/target';

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6.184,90' },
  output: { label: 'Saídas', value: '-R$ 883,65' },
};

const targets = [
  {
    id: '1',
    name: 'Apple Watch',
    percentage: '50%',
    current: 'R$ 580,00',
    target: 'R$ 1.790,00',
  },
  {
    id: '2',
    name: 'Comprar uma cadeira ergonômica',
    percentage: '75%',
    current: 'R$ 900,00',
    target: 'R$ 1.200,00',
  },
  {
    id: '3',
    name: 'Comprar uma cadeira ergonômica',
    percentage: '75%',
    current: 'R$ 1.200,00',
    target: 'R$ 3.000,00',
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />
      <List
        containerStyle={{ paddingHorizontal: 24 }}
        data={targets}
        emptyMessage="Nenhuma meta. Toque em nova meta para criar."
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        title="Metas"
      />
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button onPress={() => router.navigate('/target')} title="Nova meta" />
      </View>
    </View>
  );
}
