import { useState } from "react";

import { useAppSelector  } from "@/redux/hooks";
import { selectFunds } from "@/redux/fundsSlice";
import { selectTransactions } from "@/redux/transactionsSlice";
import { getSearchedTransactions, parseCurrency } from "@/utils/transactions.utils";
import { compareDates, formatDate, isWithinRange, today } from "@/utils/date.utils";

import Container from "@/components/styled/Container";
import Dropdown from "@/components/Dropdown/Dropdown";
import Table from "@/components/Table/Table";
import DateRangeInput from "@/components/DateRangeInput/DateRangeInput";
import Input from "@/components/Input/Input";

type FundSpendingProps = {

}

const FundSpending = ({}: FundSpendingProps) => {
	const funds = useAppSelector(selectFunds);
	const transactions = useAppSelector(selectTransactions);
	const { startDate } = useAppSelector(state => state.settings);
	const [dateRange, setDateRange] = useState({from: startDate, to: today()});
	const [filter, setFilter] = useState('');

	const [selectedFund, setSelectedFund] = useState(funds[0]?.id || 0);

	const onChangeFund = (val: string) => {
		setSelectedFund(parseInt(val));
	}

	//Filter transactions if a filter is used
	const filteredTransactions = getSearchedTransactions(transactions, filter);

	let totalCost = 0;
	const dataObj = [] as {id: number, date: string, description: string, cost: string}[];

	filteredTransactions.forEach(tr => {
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
	});

	if (funds.length === 0) {
		return (
			<Container>
				<h4>Fund Spending</h4>
				<p>No funds have been added.</p>
			</Container>
		);
	}

	return (
		<Container>
			<h4>Fund Spending</h4>
			<Dropdown label='Fund' width='150px' labelWidth='80px' value={selectedFund} onChange={onChangeFund} options={funds.map(fund => ({label: fund.name, value: fund.id}))}/>
			<Input label='Filter' width='150px' labelWidth='80px' value={filter} onChange={setFilter}/>
			<DateRangeInput dateRange={dateRange} onChange={setDateRange} onClear={() => setDateRange({from: '', to: ''})}/>
			<Table>
				<thead>
					<tr>
						<th className='sticky'>Date</th>
						<th>Description</th>
						<th>Cost</th>
					</tr>
				</thead>
				<tbody>
					{
						dataObj.map(obj => {
							return (
								<tr key={obj.id}>
									<td className='sticky filled'>{formatDate(obj.date, 'dd MMM yyyy')}</td>
									<td style={{textAlign: 'left'}}>{obj.description}</td>
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
			<br/>
		</Container>
	);
}

export default FundSpending;
