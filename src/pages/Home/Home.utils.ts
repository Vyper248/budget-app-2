import { compareDates } from "@/utils/date.utils";

import type { Summary, SummaryTotals } from "@/utils/summary.utils";
import type { Category } from "@/redux/categoriesSlice";
import type { Fund } from "@/redux/fundsSlice";

export const getPieData = (totals: SummaryTotals, categories: Category[], funds: Fund[]) => {
    //create easy lookup for item names
	const itemDetails = {} as {[key: number]: {name: string, type: string}};

	categories.forEach(cat => itemDetails[cat.id] = {name: cat.name, type: cat.type});
	funds.forEach(fund => itemDetails[fund.id] = {name: fund.name, type: 'income'});

	const pieData = Object.keys(totals).flatMap(id => {
		if (itemDetails[parseInt(id)] === undefined) return [];

		const { name, type } = itemDetails[parseInt(id)];
		let total = totals[parseInt(id)];

		return {
			label: name,
			value: total < 0 && type === 'expense' ? -total : total
		}
	});

	pieData.push({
		label: 'Remaining',
		value: totals.remaining < 0 ? 0 : totals.remaining
	});

	return pieData;
}

export const getLineData = (summaryData: Summary, trim: boolean, trimAmount: number) => {
	let data = [] as {label: string; income: number; expense: number, realIncome: number, realExpense: number}[];

	Object.keys(summaryData.monthly).forEach(month => {
		const totalData = summaryData.monthly[month];
		data.push({
			label: month,
			income: totalData.incomeTotal,
			realIncome: totalData.incomeTotal,
			expense: -totalData.expenseTotal,
			realExpense: -totalData.expenseTotal
		});
	});

	data.sort((a,b) => {
		return compareDates(a.label, b.label);
	});

	if (trim) {
		data = data.slice(trimAmount < data.length ? -trimAmount : 0);
	}

	return data;
}