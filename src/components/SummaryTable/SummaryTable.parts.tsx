import { parseCurrency } from "@/utils/transactions.utils";

import type { Item } from "@/redux/generalSlice";
import type { Summary } from "@/utils/summary.utils";

type SelectedData = {
	date: string;
	id: number;
	type: string;
}

export const EmptyRow = ({ date, length }: { date: string, length: number }) => {
	let dataArr = Array.from('1'.repeat(length));
	return (
		<tr>
			<td>{date}</td>
			{
				dataArr.map((_, i) => <td key={`empty-${date}-${i}`}>-</td>)
			}
			<td>-</td>
		</tr>
	);
}

export const ItemAmounts = ({ arr, date, type, summaryData, selectedData, onClickCell }: { arr: Item[], date: string, type: string, summaryData: Summary, selectedData: SelectedData, onClickCell: (date: string, id: number, type: string) => (e: React.MouseEvent<HTMLElement>) => void }) => {
	let dataObj = summaryData.monthly[date];
	return (
		<>
			{
				arr.map(obj => {
					const total = dataObj[obj.id].total;

					let selected = obj.id === selectedData.id && date === selectedData.date;
					let className = 'summaryData';

					if (selected) className += ' selected';
					if (total === 0) return <td key={`${date}-${obj.id}`}>-</td>

					return <td key={`${date}-${obj.id}`} onClick={onClickCell(date, obj.id, type)} className={className}>{parseCurrency(type === 'expense' ? -total : total)}</td>
				})
			}
		</>
	);
}

export const ItemHeadings = ({ arr, type }: { arr: Item[], type: string }) => {
	return (
		<>
			{arr.map(obj => <th className={type} key={`heading-${obj.id}`}>{obj.name}</th>)}
		</>
	);
}

export const ItemTotals = ({ arr, summaryData, type = 'income' }: { arr: Item[], summaryData: Summary, type?: string }) => {
	return (
		<>
			{
				arr.map(obj => {
					const total = summaryData.totals[obj.id];
					return <td key={`total-${obj.id}`}>{parseCurrency(type === 'expense' ? -total : total)}</td>
				})
			}
		</>
	);
}
