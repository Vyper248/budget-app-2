import CloseableContainer from "@/components/CloseableContainer/CloseableContainer";
import TransactionList from "@/components/TransactionComponents/TransactionList/TransactionList";

import type { MonthlyTransactions } from "@/redux/transactionsSlice";

type TransactionGroupsProps = {
	monthlyTransactions: MonthlyTransactions[];
}

const TransactionGroups = ({monthlyTransactions}: TransactionGroupsProps) => {
	//calculate total number of transactions to start displaying - max 200?
	let maxI = 0;
	let totalTransactions = 0;
	for (let i = 0; i < monthlyTransactions.length; i++) {
		let { transactions } = monthlyTransactions[i];
		if (totalTransactions + transactions.length > 200) break;
		
		maxI = i;
		totalTransactions += transactions.length;
	}

	return (
		<>
		{
			monthlyTransactions.map((monthObj, i) => {
				//this key adds enough uniqueness to each group when switching between different accounts/funds etc
				//a month object won't exist without a transaction, so this should be safe
				let firstId = monthObj.transactions[0].transaction.id;
				let listKey = `${monthObj.month} - ${firstId} - ${monthObj.transactions.length}`;
				const startClosed = i > maxI;
				return <CloseableContainer heading={monthObj.month} key={listKey} startClosed={startClosed} length={monthObj.transactions.length}>
						<TransactionList list={monthObj.transactions}/>
					</CloseableContainer>
			})
		}
		</>
	);
}

export default TransactionGroups;
