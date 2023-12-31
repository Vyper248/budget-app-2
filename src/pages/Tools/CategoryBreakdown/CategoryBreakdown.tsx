import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";

import { useAppSelector } from "@/redux/hooks";
import { selectCategories } from "@/redux/categoriesSlice";
import { selectTransactions, selectTransaction } from "@/redux/transactionsSlice";
import { getDateArray, isWithinRange } from "@/utils/date.utils";
import { useTransactionUpdate } from "@/utils/customHooks.utils";
import { getCategoryData } from "./CategoryBreakdown.utils";
import { setSelectedTotal } from "@/redux/generalSlice";

import Container from "@/components/styled/Container";
import Dropdown from "@/components/Dropdown/Dropdown";
import DateRangeInput from "@/components/DateRangeInput/DateRangeInput";
import Table from "@/components/Table/Table";
import { AccountHeadings, AccountData, AccountTotals } from "./CategoryBreakdown.parts";
import Input from "@/components/Input/Input";
import { getSearchedTransactions } from "@/utils/transactions.utils";

const CategoryBreakdown = () => {
	const dispatch = useAppDispatch();
	const categories = useAppSelector(selectCategories);
	const transactions = useAppSelector(selectTransactions);
	const { periodsToDisplay, startDate, payPeriodType } = useAppSelector(state => state.settings);
	const [dateRange, setDateRange] = useState({from: '', to: ''});
	const [filter, setFilter] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || 0);

	const onChangeCategory = (val: string) => {
		setSelectedCategory(parseInt(val));
		dispatch(selectTransaction(null));
		dispatch(setSelectedTotal(null));
	}

	const categoryObj = categories.find(obj => obj.id === selectedCategory);

	const filteredTransactionsByDate = transactions.filter(tr => {
		if (isWithinRange(dateRange, tr.date) === false) return false;
		return true;
	});

	//Filter transactions if a filter is used
	const filteredTransactions = getSearchedTransactions(filteredTransactionsByDate, filter);
	
	//get array of dates and dateFormat string
	const dates = getDateArray(dateRange, startDate, payPeriodType, periodsToDisplay);

	//setup objects for data
	const { organisedObj, accountTotals, total } = getCategoryData(filteredTransactions, selectedCategory, startDate, payPeriodType, dates);
	useTransactionUpdate(organisedObj, transactions);

	if (categories.length === 0) {
		return (
			<Container>
				<h4>Category Breakdown</h4>
				<p>No categories have been added.</p>
			</Container>
		);
	}

	const incomeCategories = categories.filter(cat => cat.type === 'income');
	const expenseCategories = categories.filter(cat => cat.type === 'expense');

	return (
		<Container>
			<h4>Category Breakdown</h4>
			<Dropdown label='Category' width='150px' labelWidth={'100px'} value={selectedCategory} onChange={onChangeCategory} options={[
				{ label: 'Income', value: 0, options: incomeCategories.map(obj => ({value: obj.id, label: obj.name}))},
				{ label: 'Expense', value: 0, options: expenseCategories.map(obj => ({value: obj.id, label: obj.name}))}
			]}/>
			<Input label='Filter' width='150px' labelWidth='100px' value={filter} onChange={setFilter}/>
			<DateRangeInput dateRange={dateRange} onChange={setDateRange} onClear={() => setDateRange({from: '', to: ''})}/>
			{ categoryObj && <Table>
				<thead>
					<AccountHeadings accountTotals={accountTotals}/>
				</thead>
				<tbody>
					<AccountData dates={dates} dataObj={organisedObj} accountTotals={accountTotals} type={categoryObj.type}/>
					<AccountTotals accountTotals={accountTotals} total={total}/>
				</tbody>
			</Table> }
			<br/>
		</Container>
	);
}

export default CategoryBreakdown;
