import { Button } from '@/components/button';
import { HomeHeader } from '@/components/home-header';
import { List } from '@/components/list';
import { Loading } from '@/components/loading';
import { Target, type TargetProps } from '@/components/target';
import { useTargetDatabase } from '@/database/useTargetDatabase';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6.184,90' },
  output: { label: 'Saídas', value: '-R$ 883,65' },
};

export default function Index() {
  const [isFetching, setIsFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);

  const targetDatabase = useTargetDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listBySavedValue();
      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: String(item.current),
        percentage: `${item.percentage.toFixed(0)}%`,
        target: String(item.amount),
      }));
    } catch (error) {
      Alert.alert(error as string, 'Não foi possível carregar as metas.');
      // console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();

    const [targetData] = await Promise.all([targetDataPromise]);

    setTargets(targetData);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) {
    return <Loading />;
  }

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
