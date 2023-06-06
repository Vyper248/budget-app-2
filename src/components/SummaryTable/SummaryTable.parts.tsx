import { parseCurrency } from "@/utils/transactions.utils";

import TransactionsCell from "../TransactionComponents/TransactionsCell/TransactionsCell";

import type { Item } from "@/redux/generalSlice";
import type { Summary } from "@/utils/summary.utils";

export const EmptyRow = ({ date, length }: { date: string, length: number }) => {
	let dataArr = Array.from('1'.repeat(length));
	return (
		<tr>
			<td className='date sticky filled'>{date}</td>
			{
				dataArr.map((_, i) => <td key={`empty-${date}-${i}`}>-</td>)
			}
			<td>-</td>
		</tr>
	);
}

export const ItemAmounts = ({ arr, date, type, summaryData }: { arr: Item[], date: string, type: string, summaryData: Summary}) => {
	let dataObj = summaryData.monthly[date];
	return (
		<>
			{
				arr.map(obj => {
					return <TransactionsCell key={`${date}-${obj.id}`} displayObj={dataObj[obj.id]} date={date} itemId={obj.id} type={type}/>
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
