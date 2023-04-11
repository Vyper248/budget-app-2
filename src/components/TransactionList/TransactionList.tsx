import StyledTransactionList from "./TransactionList.style";

import type { Transaction as TransactionType } from "../../redux/transactionsSlice";
import Transaction from "../Transaction/Transaction";

type TransactionObj = {
	runningBalance?: number;
	transaction: TransactionType;
}

type TransactionListProps = {
	list: TransactionObj[];
}

const TransactionList = ({list}: TransactionListProps) => {
	return (
		<StyledTransactionList>
			{ list.map((obj: TransactionObj) => {
				if (obj.runningBalance !== undefined) return <Transaction key={obj.transaction.id} obj={obj.transaction} runningBalance={obj.runningBalance}/>
				return <Transaction key={obj.transaction.id} obj={obj.transaction}/>
			}) }
		</StyledTransactionList>
	);
}

export default TransactionList;
