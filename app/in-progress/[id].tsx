import { Button } from '@/components/button';
import { List } from '@/components/list';
import { Loading } from '@/components/loading';
import { PageHeader } from '@/components/page-header';
import { Progress } from '@/components/progress';
import { Transaction, type TransactionProps } from '@/components/transaction';
import { useTargetDatabase } from '@/database/useTargetDatabase';
import { useTransactionsDatabase } from '@/database/useTransactionsDatabase';
import { numberToCurrency } from '@/utils/number-currency';
import { TransactionTypes } from '@/utils/types';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';

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
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: '',
    current: 'R$ 0,00',
    target: 'R$ 0,00',
    percentage: 0,
  });
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const params = useLocalSearchParams<{ id: string }>();

  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchTargetDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));
      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da meta');
      console.log(error);
    }
  }

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.listByTargetId(
        Number(params.id)
      );

      setTransactions(
        response.map((item) => ({
          id: String(item.id),
          value: numberToCurrency(item.amount),
          date: dayjs(item.created_at).format('DD/MM/YYYY [às] HH:mm'),
          description: item.observation,
          type:
            item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input,
        }))
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as transações.');
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchTargetDetails();
    const fetchTransactionsPromise = fetchTransactions();

    await Promise.all([fetchDetailsPromise, fetchTransactionsPromise]);
    setIsFetching(false);
  }

  function handleTransactionRemove(id: string) {
    Alert.alert('Remover', 'Deseja realmente remover?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => transactionRemove(id) },
    ]);
  }

  async function transactionRemove(id: string) {
    try {
      await transactionsDatabase.remove(Number(id));
      fetchData();
      Alert.alert('Transação', 'Transação removida com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover a transação.');
      console.log(error);
    }
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
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        rightButton={{
          icon: 'edit',
          onPress: () => router.navigate(`/target?id=${params.id}`),
        }}
        title={details.name}
      />

      <Progress data={details} />

      <List
        data={transactions}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() => handleTransactionRemove(item.id)}
          />
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
