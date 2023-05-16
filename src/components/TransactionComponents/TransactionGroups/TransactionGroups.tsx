import CloseableContainer from "@/components/CloseableContainer/CloseableContainer";
import TransactionList from "@/components/TransactionComponents/TransactionList/TransactionList";

import type { MonthlyTransactions } from "@/redux/transactionsSlice";

type TransactionGroupsProps = {
	monthlyTransactions: MonthlyTransactions[];
}

const TransactionGroups = ({monthlyTransactions}: TransactionGroupsProps) => {
	return (
		<>
		{
			monthlyTransactions.map(monthObj => {
				//this key adds enough uniqueness to each group when switching between different accounts/funds etc
				//a month object won't exist without a transaction, so this should be safe
				let firstId = monthObj.transactions[0].transaction.id;
				let listKey = `${monthObj.month} - ${firstId} - ${monthObj.transactions.length}`;
				return <CloseableContainer heading={monthObj.month} key={listKey}>
						<TransactionList list={monthObj.transactions}/>
					</CloseableContainer>
			})
		}
		</>
	);
}

export default TransactionGroups;
