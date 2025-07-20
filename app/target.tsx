import { CurrencyInput } from '@/components/currency-input';
import { Input } from '@/components/input';
import { PageHeader } from '@/components/page-header';
import { useTargetDatabase } from '@/database/useTargetDatabase';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, View } from 'react-native';

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
      // update
    } else {
      create();
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
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        subtitle="Economize para alcançar sua meta financeira."
        title="Meta"
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nova meta"
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
