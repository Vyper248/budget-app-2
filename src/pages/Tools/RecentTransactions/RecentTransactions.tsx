import { useAppSelector } from "@/redux/hooks";

import { selectTransactions } from "@/redux/transactionsSlice";

import Container from "@/components/styled/Container";
import TransactionList from "@/components/TransactionComponents/TransactionList/TransactionList";
import subDays from "date-fns/subDays";
import format from "date-fns/format";


const RecentTransactions = () => {
	const transactions = useAppSelector(selectTransactions);

	//get date for 1 week ago in number format (can be compared with transaction ids)
	const today = new Date();
	const oneWeekAgo = subDays(today, 7);
	const oneWeekNumber = Number(format(oneWeekAgo,'yyyyMMddHHmmssSSS'));

	//filter only transactions created within the last week
	const filteredTransactions = transactions.filter(tr => {
		if (tr.id > oneWeekNumber) return true;
		return false;
	});

	//sort transactions so newer ones show first
	const sortedTransactions = filteredTransactions.sort((a, b) => b.id - a.id);

	//map to obj for TransactionList
	const transactionObjs = sortedTransactions.map(tr => ({transaction: tr}));

	return (
		<div>
			<Container>
				<h4>Recent Transactions</h4>
				<p>Shows transactions created within the last week, newest at the top. This can be helpful if you created a transaction with the wrong date and are having trouble finding it.</p>
				{ transactionObjs.length === 0 ? <p>No transactions added within the last week.</p> : null }
				<div style={{width: '100%', maxWidth: '600px'}}>
					<TransactionList list={transactionObjs}/>
				</div>
			</Container>
		</div>
	);
}

export default RecentTransactions;
