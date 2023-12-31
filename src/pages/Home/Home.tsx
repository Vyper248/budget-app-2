import { useMemo, useState } from "react";
import StyledHome from "./Home.style";

import { isValidDateRange } from "@/utils/date.utils";
import { useAppSelector } from "@/redux/hooks";
import { selectTransactions } from "@/redux/transactionsSlice";
import { selectCategories, selectExpenseCategories } from "@/redux/categoriesSlice";
import { selectFunds } from "@/redux/fundsSlice";
import { getSummaryData } from "@/utils/summary.utils";
import { getPieData, getLineData } from "./Home.utils";

import SummaryTable from "@/components/SummaryTable/SummaryTable";
import AccountSummaries from "@/components/AccountSummaries/AccountSummaries";
import PieChart from "@/components/PieChart/PieChart";
import LineChart from "@/components/LineChart/LineChart";
import DateRangeInput from "@/components/DateRangeInput/DateRangeInput";

const Home = () => {
	const [dateRange, setDateRange] = useState({from: '', to: ''});

	const settings = useAppSelector(state => state.settings);
	const transactions = useAppSelector(selectTransactions);
	const categories = useAppSelector(selectCategories);
	const expenseCategories = useAppSelector(selectExpenseCategories);
	const funds = useAppSelector(selectFunds);
	const { showChart, swapSummaries, periodsToDisplay } = settings;

	const useableDateRange = isValidDateRange(dateRange) ? dateRange : undefined;
	const summaryData = useMemo(() => getSummaryData(transactions, categories, funds, useableDateRange), [transactions, categories, funds, useableDateRange])
	const pieData = getPieData(summaryData.totals, expenseCategories, funds);
	const lineData = getLineData(summaryData, useableDateRange === undefined, periodsToDisplay);

	const onClear = () => {
		setDateRange({from: '', to: ''});
	}

	return (
		<StyledHome>
			{ swapSummaries && <AccountSummaries/> }
			<h4 className='centered'>Period Summaries</h4>
			<DateRangeInput dateRange={dateRange} onChange={setDateRange} onClear={onClear}/>
			<SummaryTable key={`${dateRange.from}-${dateRange.to}`} summaryData={summaryData} dateRange={useableDateRange}/>
			{ !swapSummaries && <AccountSummaries/> }
			{ showChart && <PieChart data={pieData} heading='Totals Chart'/> }
			<LineChart data={lineData}/>
		</StyledHome>
	);
}

export default Home;