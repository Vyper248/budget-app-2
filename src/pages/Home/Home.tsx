import { useState } from "react";
import StyledHome from "./Home.style";

import { isValidDateRange } from "@/utils/date.utils";
import { useAppSelector } from "@/redux/hooks";
import { selectTransactions } from "@/redux/transactionsSlice";
import { selectCategories, selectExpenseCategories } from "@/redux/categoriesSlice";
import { selectFunds } from "@/redux/fundsSlice";
import { getSummaryData } from "@/utils/summary.utils";
import { getPieData } from "./Home.utils";

import SummaryTable from "@/components/SummaryTable/SummaryTable";
import Input from "@/components/Input/Input";
import Grid from "@/components/styled/Grid";
import Button from "@/components/Button/Button";
import AccountSummaries from "@/components/AccountSummaries/AccountSummaries";
import PieChart from "@/components/PieChart/PieChart";

const Home = ({}) => {
	const [dateRange, setDateRange] = useState({from: '', to: ''});

	const settings = useAppSelector(state => state.settings);
	const transactions = useAppSelector(selectTransactions);
	const categories = useAppSelector(selectCategories);
	const expenseCategories = useAppSelector(selectExpenseCategories);
	const funds = useAppSelector(selectFunds);

	const useableDateRange = isValidDateRange(dateRange) ? dateRange : undefined;
	const summaryData = getSummaryData(transactions, categories, funds, useableDateRange);
	const pieData = getPieData(summaryData.totals, expenseCategories, funds);

	const { showChart, swapSummaries } = settings;

	const onChangeInput = (key: string) => (val: string) => {
		setDateRange(dateRange => {
			return {...dateRange, [key]: val}
		});
	}

	const onClear = () => {
		setDateRange({from: '', to: ''});
	}

	return (
		<StyledHome>
			{ swapSummaries && <AccountSummaries/> }
			<h4 className='centered'>Period Summaries</h4>
			<Grid width="500px" template="auto auto 90px">
				<Input type='date' label='From' value={dateRange.from} onChange={onChangeInput('from')} max={dateRange.to}/>
				<Input type='date' label='To' value={dateRange.to} onChange={onChangeInput('to')} min={dateRange.from}/>
				<Button label='Clear' onClick={onClear} width='80px'/>
			</Grid>
			<SummaryTable key={`${dateRange.from}-${dateRange.to}`} summaryData={summaryData} dateRange={useableDateRange}/>
			{ !swapSummaries && <AccountSummaries/> }
			{ showChart && <PieChart data={pieData} heading='Totals Chart'/> }
		</StyledHome>
	);
}

export default Home;
