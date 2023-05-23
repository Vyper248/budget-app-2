import { useEffect, useState } from "react";
import StyledSummaryTable from "./SummaryTable.style";

import { useAppSelector } from "@/redux/hooks";
import { getSummaryData, getDates, getHeadingColor } from "@/utils/summary.utils";
import { selectTransactions } from "@/redux/transactionsSlice";
import { selectCategories } from "@/redux/categoriesSlice";
import { selectFunds } from "@/redux/fundsSlice";
import { parseCurrency } from "@/utils/transactions.utils";
import { formatDate } from "@/utils/date.utils";

import Table from '@/components/styled/Table';
import Modal from "../Modal/Modal";
import TransactionList from "../TransactionComponents/TransactionList/TransactionList";
import { EmptyRow, ItemAmounts, ItemHeadings, ItemTotals } from "./SummaryTable.parts";

import type { Transaction } from "@/redux/transactionsSlice";

type DateRange = {
	from: string;
	to: string;
}

type SummaryTableProps = {
	dateRange?: DateRange;
}

const SummaryTable = ({dateRange}: SummaryTableProps) => {
	const [showTransactions, setShowTransactions] = useState(false);
	const [selectedTransactions, setSelectedTransactions] = useState<Transaction[]>([]);
	const [selectedData, setSelectedData] = useState({date: '', id: 0, type: ''});
	const [transactionPos, setTransactionPos] = useState({x: 0, y: 0});
	
	const transactions = useAppSelector(selectTransactions);
	const categories = useAppSelector(selectCategories);
	const funds = useAppSelector(selectFunds);
	const settings = useAppSelector(state => state.settings);

	const [summaryData, setSummaryData] = useState(getSummaryData(transactions, categories, funds, dateRange));

	const { displayIncomeTotal, displayExpenseTotal, displayMonths } = settings;
	const dateFormat = displayMonths ? 'MMM yyyy' : 'dd-MM-yyyy';

	const emptyRowLength = categories.length + funds.length + (displayIncomeTotal ? 1 : 0) + (displayExpenseTotal ? 1 : 0);

	const incomeCategories = categories.filter(category => category.type === 'income');
	const expenseCategories = categories.filter(category => category.type === 'expense');

	let dates = getDates(settings.startDate, settings.payPeriodType, dateRange);

	//If transactions changes, update summary data and selected transactions if needed
	useEffect(() => {
		const newSummary = getSummaryData(transactions, categories, funds, dateRange);
		setSummaryData(newSummary);
		
		if (!showTransactions) return;
		const dataObj = newSummary.monthly[selectedData.date][selectedData.id];
		setSelectedTransactions(dataObj.transactions);
	}, [transactions]);

	const onClickCell = (date: string, id: number, type: string) => (e: React.MouseEvent<HTMLElement>) => {
		const dataObj = summaryData.monthly[date][id];

		setSelectedTransactions(dataObj.transactions);
		setShowTransactions(true);
		setSelectedData({date, id, type});

		//get position of clicked cell and put modal next to it
		let leftPos = e.currentTarget.offsetLeft - 450;
        if (leftPos < 0) leftPos = e.currentTarget.offsetLeft + e.currentTarget.offsetWidth;
        let topPos = e.currentTarget.offsetTop;
        setTransactionPos({x: leftPos, y: topPos});
	}

	const onCloseTransactions = () => {
		setSelectedTransactions([]);
		setShowTransactions(false);
		setSelectedData({date: '', id: 0, type: ''});
	}

	const getModalProps = () => {
		return {
			key: `${transactionPos.x}-${transactionPos.y}`,
			width: '450px',
			heading: 'Transactions',
			onClickClose: onCloseTransactions,
			x: transactionPos.x,
			y: transactionPos.y,
			center: true,
			headingColor: getHeadingColor(selectedData.type),
			color: selectedData.type === 'income' ? 'white' : 'black',
		}
	}

	return (
		<StyledSummaryTable>
			<Table>
				<thead>
					<tr>
						<th className='date'>Date</th>
						<ItemHeadings arr={incomeCategories} type='income'/>
						{ displayIncomeTotal && <th className='income'>Total Income</th> }
						<ItemHeadings arr={funds} type='fund'/>
						<ItemHeadings arr={expenseCategories} type='expense'/>
						{ displayExpenseTotal && <th className='expense'>Total Expenses</th> }
						<th className='remaining'>Remaining</th>
					</tr>
				</thead>
				<tbody>
				{
					dates.map(date => {
						const dataObj = summaryData.monthly[date];
						const sharedData = {date, summaryData, selectedData, onClickCell};
						if (dataObj === undefined) return <EmptyRow key={`empty-${date}`} date={formatDate(date, dateFormat)} length={emptyRowLength}/>
						return (
							<tr key={`month-${date}`}>
								<td className='date'>{formatDate(date, dateFormat)}</td>
								<ItemAmounts arr={incomeCategories} type='income' {...sharedData}/>
								{ displayIncomeTotal && <td className='highlighted'>{parseCurrency(dataObj.incomeTotal)}</td> }
								<ItemAmounts arr={funds} type='fund' {...sharedData}/>
								<ItemAmounts arr={expenseCategories} type='expense' {...sharedData}/>
								{ displayExpenseTotal && <td className='highlighted'>{parseCurrency(-dataObj.expenseTotal)}</td> }
								<td>{parseCurrency(dataObj.remaining)}</td>
							</tr>
						);
					})
				}
					<tr className='highlighted'>
						<td>Total</td>
						<ItemTotals arr={incomeCategories} summaryData={summaryData}/>
						{ displayIncomeTotal && <td>{parseCurrency(summaryData.totals.incomeTotal)}</td> }
						<ItemTotals arr={funds} summaryData={summaryData}/>
						<ItemTotals arr={expenseCategories} summaryData={summaryData} type='expense'/>
						{ displayExpenseTotal && <td>{parseCurrency(-summaryData.totals.expenseTotal)}</td> }
						<td>{parseCurrency(summaryData.totals.remaining)}</td>
					</tr>
				</tbody>
			</Table>
			{ showTransactions && <Modal {...getModalProps()}>
				<TransactionList list={selectedTransactions.map(transaction => ({transaction}))} sort={true}/>
			</Modal> }
		</StyledSummaryTable>
	);
}

export default SummaryTable;
