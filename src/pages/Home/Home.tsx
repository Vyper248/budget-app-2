import { useState } from "react";
import StyledHome from "./Home.style";

import { isValidDateRange } from "@/utils/date.utils";

import SummaryTable from "@/components/SummaryTable/SummaryTable";
import Input from "@/components/Input/Input";
import Grid from "@/components/styled/Grid";
import Button from "@/components/Button/Button";
import AccountSummaries from "@/components/AccountSummaries/AccountSummaries";

type HomeProps = {

}

const Home = ({}: HomeProps) => {
	const [dateRange, setDateRange] = useState({from: '', to: ''});

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
			<h4 className='centered'>Period Summaries</h4>
			<Grid width="500px" template="auto auto 90px">
				<Input type='date' label='From' value={dateRange.from} onChange={onChangeInput('from')}/>
				<Input type='date' label='To' value={dateRange.to} onChange={onChangeInput('to')}/>
				<Button label='Clear' onClick={onClear} width='80px'/>
			</Grid>
			<SummaryTable key={`${dateRange.from}-${dateRange.to}`} dateRange={isValidDateRange(dateRange) ? dateRange : undefined}/>
			<AccountSummaries/>
		</StyledHome>
	);
}

export default Home;
