import StyledAccountSummaries from "./AccountSummaries.style";
import { useAppSelector } from "@/redux/hooks";

import { selectAccounts, selectVisibleAccounts } from "@/redux/accountsSlice";
import { getAccountTotals } from "@/utils/transactions.utils";
import { selectTransactions } from "@/redux/transactionsSlice";

import AmountCard from "../AmountCard/AmountCard";

const AccountSummaries = () => {
	const accounts = useAppSelector(selectVisibleAccounts);
	const transactions = useAppSelector(selectTransactions);

	const accountTotals = getAccountTotals(transactions, accounts);

	let allTotal = Object.values(accountTotals).reduce((a,c) => a+c, 0);

	return (
		<>
			<h4 className='centered'>Account Summaries</h4>
			<StyledAccountSummaries>
				<div>
					{
						accounts.map(acc => <AmountCard key={`accountTotal-${acc.name}`} label={acc.name} amount={accountTotals[acc.id]}/>)
					}
				</div>
				<div>
					<AmountCard label='Total' amount={allTotal}/>
				</div>
			</StyledAccountSummaries>
		</>
	);
}

export default AccountSummaries;
