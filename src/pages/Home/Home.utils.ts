import type { SummaryTotals } from "@/utils/summary.utils";
import type { Category } from "@/redux/categoriesSlice";
import type { Fund } from "@/redux/fundsSlice";

export const getPieData = (totals: SummaryTotals, categories: Category[], funds: Fund[]) => {
    //create easy lookup for item names
	const itemNames = {} as {[key: number]: string};
	categories.forEach(cat => itemNames[cat.id] = cat.name);
	funds.forEach(fund => itemNames[fund.id] = fund.name);

	const pieData = Object.keys(totals).flatMap(id => {
		let name = itemNames[parseInt(id)];
		let total = totals[parseInt(id)];
		if (!name) return [];
		return {
			label: name,
			value: total < 0 ? -total : total
		}
	});

	pieData.push({
		label: 'Remaining',
		value: totals.remaining < 0 ? 0 : totals.remaining
	});

	return pieData;
}