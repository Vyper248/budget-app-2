import StyledTransactionList from "./TransactionList.style";

import { sortTransactions } from "@/utils/transactions.utils";

import Transaction from "@/components/TransactionComponents/Transaction/Transaction";

import type { TransactionObj } from "@/redux/transactionsSlice";

type TransactionListProps = {
	list: TransactionObj[];
	sort?: boolean;
}

const TransactionList = ({list, sort=false}: TransactionListProps) => {
	let sortedList = [...list];
	if (sort) sortedList = sortTransactions(sortedList);

	return (
		<StyledTransactionList>
			{ sortedList.map((obj: TransactionObj) => {
				if (obj.runningBalance !== undefined) return <Transaction key={obj.transaction.id} obj={obj.transaction} runningBalance={obj.runningBalance}/>
				return <Transaction key={obj.transaction.id} obj={obj.transaction}/>
			}) }
		</StyledTransactionList>
	);
}

export default TransactionList;
