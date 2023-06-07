import { useAppSelector } from "@/redux/hooks";;
import { formatDate } from "@/utils/date.utils";
import { parseCurrency } from "@/utils/transactions.utils";
import { selectAccounts } from "@/redux/accountsSlice";

import TransactionsCell from "@/components/TransactionComponents/TransactionsCell/TransactionsCell";
import { EmptyRow } from "@/components/SummaryTable/SummaryTable.parts";

import type { TransactionDisplay } from "@/utils/summary.utils";
import type { Account } from "@/redux/accountsSlice";

type DateObj = {
	total: number;
	[key: number]: TransactionDisplay;
}

type DataObj = {
	[key: string]: DateObj;
}

type AccountTotals = {
	[key: number]: number;
}

export const DateRow = ({accountTotals, data, type, date, dateFormat}: {accountTotals: AccountTotals, data: DateObj, type: string, date: string, dateFormat: string}) => {
    const accounts = useAppSelector(selectAccounts);
	return (
		<tr>
			<td className='sticky filled'>{formatDate(date, dateFormat)}</td>
			<td>{parseCurrency(data.total)}</td>
			{
				accounts.map(obj => {
					if (accountTotals[obj.id] === undefined) return null;
					if (data[obj.id] === undefined) return <td key={`empty-${date}-${obj.id}`}>-</td>
					return <TransactionsCell key={`${date}-${obj.id}`} displayObj={data[obj.id]} date={date} itemId={obj.id} type={type} showPositive={true}/>
				})
			}
		</tr>
	)
}

export const AccountHeadings = ({accountTotals}: {accountTotals: AccountTotals}) => {
    const accounts = useAppSelector(selectAccounts);
	return (
		<tr>
			<th className='sticky'>Date</th>
			<th>Total</th>
			{
				accounts.map(obj => {
					if (accountTotals[obj.id] === undefined) return null;
					return <th key={`header-${obj.id}`}>{obj.name}</th>
				})
			}
		</tr>
	);
}

export const AccountData = ({dates, dataObj, accountTotals, type}: {dates: string[], dataObj: DataObj, accountTotals: AccountTotals, type: string}) => {
    const accounts = useAppSelector(selectAccounts);
	const { displayMonths } = useAppSelector(state => state.settings);
	const dateFormat = displayMonths ? 'MMM yyyy' : 'dd-MM-yyyy';

	const emptyRowLength = accounts.reduce((t,c) => {
		if (accountTotals[c.id] === undefined) return t;
		return t + 1;
	}, 0);

	return (
		<>
		{
			dates.map(date => {
				let data = dataObj[date];
				let formattedDate = formatDate(date, dateFormat);
				if (data === undefined) return <EmptyRow key={`empty-${date}`} date={formattedDate} length={emptyRowLength}/>
				return <DateRow key={`row-${date}`} accountTotals={accountTotals} data={data} type={type} date={date} dateFormat={dateFormat}/>
			})
		}
		</>
	);
}

export const AccountTotals = ({accountTotals, total}: {accountTotals: AccountTotals, total: number}) => {
    const accounts = useAppSelector(selectAccounts);
	return (
		<tr>
			<th className='sticky'>Totals</th>
			<td>{parseCurrency(total)}</td>
			{
				accounts.map(obj => {
					let total = accountTotals[obj.id];
					if (total === undefined) return null;
					return <td key={`totals-${obj.id}`}>{parseCurrency(total)}</td>
				})
			}
		</tr>
	);
}
