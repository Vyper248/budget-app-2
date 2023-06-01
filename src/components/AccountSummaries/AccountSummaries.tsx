import StyledAccountSummaries from "./AccountSummaries.style";
import { useAppSelector } from "@/redux/hooks";

import { selectVisibleAccounts } from "@/redux/accountsSlice";
import { getTransactionTotal } from "@/utils/transactions.utils";
import { selectTransactions } from "@/redux/transactionsSlice";

import AmountCard from "../AmountCard/AmountCard";

import type { Transaction } from "@/redux/transactionsSlice";

const AccountSummaries = () => {
	const accounts = useAppSelector(selectVisibleAccounts);
	const transactions = useAppSelector(selectTransactions);

	const accountObj = {} as {[key: number]: Transaction[]};

	//sort transactions into account arrays
	transactions.forEach(tr => {
		if (tr.type === 'fundAddition') return;
		if (tr.type === 'spend') accountObj[tr.account] === undefined ? accountObj[tr.account] = [tr] : accountObj[tr.account].push(tr);
		if (tr.type === 'transfer') {
			accountObj[tr.from] === undefined ? accountObj[tr.from] = [tr] : accountObj[tr.from].push(tr);
			accountObj[tr.to] === undefined ? accountObj[tr.to] = [tr] : accountObj[tr.to].push(tr);
		}
	});

	const accountTotals = [] as {label: string, amount: number}[];
	let allTotal = 0;

	//get totals for each account and add to array
	accounts.forEach(acc => {
		let transactions = accountObj[acc.id];
		let total = transactions ? getTransactionTotal(transactions, acc.id) + (acc?.startingBalance || 0) : 0;
		allTotal += total;
		accountTotals.push({label: acc.name, amount: total});
	}); 

	return (
		<>
			<h4 className='centered'>Account Summaries</h4>
			<StyledAccountSummaries>
				{
					accountTotals.map(totalObj => <AmountCard key={`accountTotal-${totalObj.label}`} label={totalObj.label} amount={totalObj.amount}/>)
				}
				<AmountCard label='Total' amount={allTotal}/>
			</StyledAccountSummaries>
		</>
	);
}

export default AccountSummaries;
