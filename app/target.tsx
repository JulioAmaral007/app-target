import { Button, View } from 'react-native';
import { CurrencyInput } from '@/components/currency-input';
import { Input } from '@/components/input';
import { PageHeader } from '@/components/page-header';

export default function Target() {
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

        <CurrencyInput label="Valor alvo (R$)" value={24_350.73} />

        <Button title="Salvar" />
      </View>
    </View>
  );
}
