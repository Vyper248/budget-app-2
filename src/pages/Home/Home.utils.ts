import type { SummaryTotals } from "@/utils/summary.utils";
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