import { useAppSelector } from "@/redux/hooks";

import { selectVisibleAccounts } from "@/redux/accountsSlice";
import { selectTransactions } from "@/redux/transactionsSlice";
import { parseCurrency } from "@/utils/transactions.utils";
import { getAccountTotals } from "@/utils/transactions.utils";

import Table from "@/components/Table/Table";
import Container from "@/components/styled/Container";
import InterestCalculator from "@/components/InterestCalculator/InterestCalculator";

const calculateInterest = (amount: number, rate: number, extraCharges: number): [number,number] => {
	const yearlyInterestBase = amount * (rate / 100);
	const monthlyInterestBase = yearlyInterestBase / 12;

	let monthly = monthlyInterestBase - extraCharges;
	let yearly = monthly * 12;

	return [monthly, yearly];
}

const Interest = () => {
	const accounts = useAppSelector(selectVisibleAccounts);
	const transactions = useAppSelector(selectTransactions);

	//table data
	const accountTotals = getAccountTotals(transactions, accounts);

	//setup data variables
	let totalYearly = 0;
	let totalMonthly = 0;
	const interestObj = {} as {[key: number]: {monthly: number, yearly: number}};
	accounts.forEach(acc => interestObj[acc.id] = {monthly: 0, yearly: 0});

	//calculate interest based on totals
	accounts.forEach(acc => {
		const data = interestObj[acc.id];
		[data.monthly, data.yearly] = calculateInterest(accountTotals[acc.id], acc.interestRate, acc.extraCharges);
		totalYearly += data.yearly;
		totalMonthly += data.monthly;
	});

	return (
		<Container>
			<h4>Interest Calculator</h4>
			<p>This will show you the estimated amount of interest you should be receiving based on the interest rates provided, taking into account any extra charges (such as bank fees). You can change these rates on the Accounts page by using the 'Edit Accounts' button.</p>
			<Table>
				<thead>
					<tr>
						<th className='sticky'>Account</th>
						<th>Interest Rate</th>
						<th>Amount</th>
						<th>Extra Charges</th>
						<th>Yearly Interest</th>
						<th>Monthly Interest</th>
					</tr>
				</thead>
				<tbody>
					{
						accounts.map(account => {
							return (
								<tr key={account.id}>
									<td className='sticky filled'>{account.name}</td>
									<td>{account.interestRate}%</td>
									<td>{parseCurrency(accountTotals[account.id])}</td>
									<td>{parseCurrency(account.extraCharges)}</td>
									<td>{parseCurrency(interestObj[account.id].yearly)}</td>
									<td>{parseCurrency(interestObj[account.id].monthly)}</td>
								</tr>
							);
						})
					}
					<tr>
						<th colSpan={4} style={{textAlign: 'right'}}>Totals</th>
						<td>{parseCurrency(totalYearly)}</td>
						<td>{parseCurrency(totalMonthly)}</td>
					</tr>
				</tbody>
			</Table>
			<InterestCalculator/>
		</Container>
	);
}

export default Interest;
