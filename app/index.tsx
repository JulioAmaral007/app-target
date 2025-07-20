import { Button } from "@/components/button";
import { HomeHeader, type HomeHeaderProps } from "@/components/home-header";
import { List } from "@/components/list";
import { Loading } from "@/components/loading";
import { Target, type TargetProps } from "@/components/target";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { numberToCurrency } from "@/utils/number-currency";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";

export default function Index() {
	const [isFetching, setIsFetching] = useState(true);
	const [summary, setSummary] = useState<HomeHeaderProps>();
	const [targets, setTargets] = useState<TargetProps[]>([]);

	const targetDatabase = useTargetDatabase();
	const transactionsDatabase = useTransactionsDatabase();

	async function fetchTargets(): Promise<TargetProps[]> {
		try {
			const response = await targetDatabase.listBySavedValue();
			return response.map((item) => ({
				id: String(item.id),
				name: item.name,
				current: numberToCurrency(item.current),
				percentage: `${item.percentage.toFixed(0)}%`,
				target: numberToCurrency(item.amount),
			}));
		} catch (error) {
			Alert.alert(error as string, "Não foi possível carregar as metas.");
			return [];
		}
	}

	async function fetchSummary(): Promise<HomeHeaderProps> {
		try {
			const response = await transactionsDatabase.summary();

			if (!response) {
				throw new Error("Resposta vazia do banco de dados");
			}

			return {
				total: numberToCurrency(response.input + response.output),
				input: {
					label: "Entradas",
					value: numberToCurrency(response.input),
				},
				output: {
					label: "Saídas",
					value: numberToCurrency(response.output),
				},
			};
		} catch (error) {
			Alert.alert("Erro", "Não foi possível carregar o resumo.");
			return {
				total: numberToCurrency(0),
				input: { label: "Entradas", value: numberToCurrency(0) },
				output: { label: "Saídas", value: numberToCurrency(0) },
			};
		}
	}

	async function fetchData() {
		const targetDataPromise = fetchTargets();
		const dataSummaryPromise = fetchSummary();

		const [targetData, dataSummary] = await Promise.all([
			targetDataPromise,
			dataSummaryPromise,
		]);

		setTargets(targetData);
		setSummary(dataSummary);
		setIsFetching(false);
	}

	useFocusEffect(
		useCallback(() => {
			fetchData();
		}, []),
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
				<Button onPress={() => router.navigate("/target")} title="Nova meta" />
			</View>
		</View>
	);
}
