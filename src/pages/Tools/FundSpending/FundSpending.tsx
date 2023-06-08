import { useState } from "react";

import { useAppSelector  } from "@/redux/hooks";
import { selectFunds } from "@/redux/fundsSlice";
import { selectTransactions } from "@/redux/transactionsSlice";
import { parseCurrency } from "@/utils/transactions.utils";
import { compareDates, formatDate, isWithinRange, today } from "@/utils/date.utils";

import Container from "@/components/styled/Container";
import Dropdown from "@/components/Dropdown/Dropdown";
import Table from "@/components/Table/Table";
import DateRangeInput from "@/components/DateRangeInput/DateRangeInput";

type FundSpendingProps = {

}

const FundSpending = ({}: FundSpendingProps) => {
	const funds = useAppSelector(selectFunds);
	const transactions = useAppSelector(selectTransactions);
	const { startDate } = useAppSelector(state => state.settings);
	const [dateRange, setDateRange] = useState({from: startDate, to: today()});

	const [selectedFund, setSelectedFund] = useState(funds[0].id || 0);

	const onChangeFund = (val: string) => {
		setSelectedFund(parseInt(val));
	}

	let totalCost = 0;
	const dataObj = [] as {id: number, date: string, description: string, cost: string}[];

	transactions.forEach(tr => {
		if (tr.type !== 'spend') return;
		if (tr.fund === undefined) return;
		if (tr.fund !== selectedFund) return;
		if (isWithinRange(dateRange, tr.date) === false) return;

		totalCost += tr.amount;
		dataObj.push({
			id: tr.id,
			date: tr.date,
			description: tr.description,
			cost: parseCurrency(tr.amount),
		});
	});

	dataObj.sort((a, b) => {
		return compareDates(a.date, b.date);
	})

	return (
		<Container>
			<h4>Fund Spending</h4>
			<Dropdown label='Fund' value={selectedFund} onChange={onChangeFund} options={funds.map(fund => ({label: fund.name, value: fund.id}))}/>
			<DateRangeInput dateRange={dateRange} onChange={setDateRange} onClear={() => setDateRange({from: '', to: ''})}/>
			<Table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Description</th>
						<th>Cost</th>
					</tr>
				</thead>
				<tbody>
					{
						dataObj.map(obj => {
							return (
								<tr key={obj.id}>
									<td>{formatDate(obj.date, 'dd MMM yyyy')}</td>
									<td>{obj.description}</td>
									<td>{obj.cost}</td>
								</tr>
							);
						})
					}
					<tr>
						<th colSpan={2} style={{textAlign: 'right'}}>Total</th>
						<td>{parseCurrency(totalCost)}</td>
					</tr>
				</tbody>
			</Table>
		</Container>
	);
}

export default FundSpending;
