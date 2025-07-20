import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Button } from '@/components/button';
import { List } from '@/components/list';
import { PageHeader } from '@/components/page-header';
import { Progress } from '@/components/progress';
import { Transaction, type TransactionProps } from '@/components/transaction';
import { TransactionTypes } from '@/utils/types';

const details = {
  current: 'R$ 580,00',
  target: 'R$ 1.780,00',
  percentage: 25,
};

const transactions: TransactionProps[] = [
  {
    id: '1',
    value: 'R$ 20,00',
    date: '12/04/25',
    type: TransactionTypes.Output,
  },
  {
    id: '2',
    value: 'R$ 300,00',
    date: '12/04/25',
    description: 'CDB de 110% no banco XPTO',
    type: TransactionTypes.Input,
  },
];

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        rightButton={{
          icon: 'edit',
          onPress: () => {},
        }}
        title="Apple Watch"
      />

      <Progress data={details} />

      <List
        data={transactions}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        title="Transações"
      />

      <Button
        onPress={() => router.navigate(`/transaction/${params.id}`)}
        title="Nova transação"
      />
    </View>
  );
}
