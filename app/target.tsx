import { Button } from '@/components/button';
import { CurrencyInput } from '@/components/currency-input';
import { Input } from '@/components/input';
import { PageHeader } from '@/components/page-header';
import { useTargetDatabase } from '@/database/useTargetDatabase';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  const params = useLocalSearchParams<{ id?: string }>();
  const targetDatabase = useTargetDatabase();

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert(
        'Atenção',
        'Preencha o nome e o valor precisa ser maior que zero.'
      );
    }

    setIsProcessing(true);

    if (params.id) {
      update();
    } else {
      create();
    }
  }

  async function update() {
    try {
      await targetDatabase.update({ id: Number(params.id), name, amount });
      Alert.alert('Sucesso!', 'Meta atualizada com sucesso!', [
        {
          text: 'Ok',
          onPress: router.back,
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a meta.');
      console.log(error);
      setIsProcessing(false);
    }
  }

  async function create() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert(
        'Atenção',
        'Preencha o nome e o valor precisa ser maior que zero.'
      );
    }

    try {
      await targetDatabase.create({ name, amount });

      Alert.alert('Nova Meta', 'Meta criada com sucesso!', [
        {
          text: 'Ok',
          onPress: router.back,
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a meta.');
      setIsProcessing(false);
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);
      setName(response.name);
      setAmount(response.amount);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da meta.');
      console.log(error);
    }
  }

  function handleRemove() {
    if (!params.id) {
      return;
    }

    Alert.alert('Remover', 'Deseja realemente remover?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: remove },
    ]);
  }

  async function remove() {
    try {
      setIsProcessing(true);

      await targetDatabase.remove(Number(params.id));
      Alert.alert('Meta', 'Meta removida!', [
        { text: 'Ok', onPress: () => router.replace('/') },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover a meta.');
      console.log(error);
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id));
    }
  }, [params.id, fetchDetails]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        rightButton={
          params.id
            ? {
                icon: 'delete',
                onPress: handleRemove,
              }
            : undefined
        }
        subtitle="Economize para alcançar sua meta financeira."
        title={params.id ? 'Editar meta' : 'Nova meta'}
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
        />

        <CurrencyInput
          label="Valor alvo (R$)"
          onChangeValue={setAmount}
          value={amount}
        />

        <Button
          isProcessing={isProcessing}
          onPress={handleSave}
          title="Salvar"
        />
      </View>
    </View>
  );
}
