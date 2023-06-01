import { useEffect } from "react";
import { useDispatch } from "react-redux";
import StyledSummaryTable from "./SummaryTable.style";

import { useAppSelector } from "@/redux/hooks";
import { getDates } from "@/utils/summary.utils";
import { selectTransactions } from "@/redux/transactionsSlice";
import { selectCategories } from "@/redux/categoriesSlice";
import { selectFunds } from "@/redux/fundsSlice";
import { parseCurrency } from "@/utils/transactions.utils";
import { formatDate } from "@/utils/date.utils";
import { setSelectedTotal } from "@/redux/generalSlice";

import Table from '@/components/styled/Table';
import { EmptyRow, ItemAmounts, ItemHeadings, ItemTotals } from "./SummaryTable.parts";

import type { Summary } from "@/utils/summary.utils";

type DateRange = {
	from: string;
	to: string;
}

type SummaryTableProps = {
	dateRange?: DateRange;
	summaryData: Summary;
}

const SummaryTable = ({dateRange, summaryData}: SummaryTableProps) => {
	const dispatch = useDispatch();

	const selectedTotal = useAppSelector(state => state.general.selectedTotal);
	const transactions = useAppSelector(selectTransactions);
	const categories = useAppSelector(selectCategories);
	const funds = useAppSelector(selectFunds);
	const settings = useAppSelector(state => state.settings);

	const { displayIncomeTotal, displayExpenseTotal, displayMonths, periodsToDisplay } = settings;
	const dateFormat = displayMonths ? 'MMM yyyy' : 'dd-MM-yyyy';
	
	const incomeCategories = categories.filter(category => category.type === 'income' && category.hidden === false);
	const expenseCategories = categories.filter(category => category.type === 'expense' && category.hidden === false);
	const visibleFunds = funds.filter(fund => fund.hidden === false);

	const emptyRowLength = incomeCategories.length + expenseCategories.length + visibleFunds.length + (displayIncomeTotal ? 1 : 0) + (displayExpenseTotal ? 1 : 0);

	let dates = getDates(settings.startDate, settings.payPeriodType, dateRange);
	dates = dateRange ? dates : dates.slice(-periodsToDisplay);

	//If transactions changes, update summary data and selected total transactions if needed
	useEffect(() => {
		if (!selectedTotal) return;
		const dataObj = summaryData.monthly[selectedTotal.date][selectedTotal.itemId];
		dispatch(setSelectedTotal({...selectedTotal, transactions: dataObj.transactions}));
	}, [transactions]);

	return (
		<StyledSummaryTable>
			<Table>
				<thead>
					<tr>
						<th className='date'>Date</th>
						<ItemHeadings arr={incomeCategories} type='income'/>
						{ displayIncomeTotal && <th className='income'>Total Income</th> }
						<ItemHeadings arr={visibleFunds} type='fund'/>
						<ItemHeadings arr={expenseCategories} type='expense'/>
						{ displayExpenseTotal && <th className='expense'>Total Expenses</th> }
						<th className='remaining'>Remaining</th>
					</tr>
				</thead>
				<tbody>
				{
					dates.map(date => {
						const dataObj = summaryData.monthly[date];
						const sharedData = {date, summaryData};
						if (dataObj === undefined) return <EmptyRow key={`empty-${date}`} date={formatDate(date, dateFormat)} length={emptyRowLength}/>
						return (
							<tr key={`month-${date}`}>
								<td className='date'>{formatDate(date, dateFormat)}</td>
								<ItemAmounts arr={incomeCategories} type='income' {...sharedData}/>
								{ displayIncomeTotal && <td className='highlighted'>{parseCurrency(dataObj.incomeTotal)}</td> }
								<ItemAmounts arr={visibleFunds} type='fund' {...sharedData}/>
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
						<ItemTotals arr={visibleFunds} summaryData={summaryData}/>
						<ItemTotals arr={expenseCategories} summaryData={summaryData} type='expense'/>
						{ displayExpenseTotal && <td>{parseCurrency(-summaryData.totals.expenseTotal)}</td> }
						<td>{parseCurrency(summaryData.totals.remaining)}</td>
					</tr>
				</tbody>
			</Table>
		</StyledSummaryTable>
	);
}

export default SummaryTable;
