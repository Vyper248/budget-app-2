import { useState } from "react";
import StyledInterest from "./Interest.style";
import { useAppSelector } from "@/redux/hooks";

import { selectAccounts, selectVisibleAccounts } from "@/redux/accountsSlice";
import { selectTransactions } from "@/redux/transactionsSlice";
import { parseCurrency } from "@/utils/transactions.utils";
import { getAmount, getAccountTotals } from "@/utils/transactions.utils";

import Table from "@/components/Table/Table";
import Input from "@/components/Input/Input";

type InterestProps = {

}

const calculateInterest = (amount: number, rate: number, extraCharges: number): [number,number] => {
	const yearlyInterestBase = amount * (rate / 100);
	const monthlyInterestBase = yearlyInterestBase / 12;

	let monthly = monthlyInterestBase - extraCharges;
	let yearly = monthly * 12;

	return [monthly, yearly];
}

const Interest = ({}: InterestProps) => {
	const accounts = useAppSelector(selectVisibleAccounts);
	const transactions = useAppSelector(selectTransactions);

	//custom interest data
	const [customInterest, setCustomInterest] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [customCharges, setCustomCharges] = useState('0');
	const [ customMonthly, customYearly ] = calculateInterest(Number(customAmount), Number(customInterest), Number(customCharges));

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
		<StyledInterest>
			<h4>Interest Calculator</h4>
			<p>This will show you the estimated amount of interest you should be receiving based on the interest rates provided, taking into account any extra charges (such as bank fees). You can change these rates on the Accounts page by using the 'Edit Accounts' button.</p>
			<Table>
				<thead>
					<tr>
						<th>Account</th>
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
									<td>{account.name}</td>
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
						<th colSpan={4}>Totals</th>
						<td>{parseCurrency(totalYearly)}</td>
						<td>{parseCurrency(totalMonthly)}</td>
					</tr>
				</tbody>
			</Table>

			<h4>Custom</h4>
			<p>Use this to check how much interest you'll get with different amounts and interest rates etc.</p>
			<Table>
				<thead>
					<tr>
						<th>Interest Rate</th>
						<th>Amount</th>
						<th>Extra Charges</th>
						<th>Yearly Interest</th>
						<th>Monthly Interest</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='input'><Input type='number' value={customInterest} onChange={setCustomInterest} aria-label='Custom Interest Rate'/></td>
						<td className='input'><Input type='number' value={customAmount} onChange={setCustomAmount} aria-label='Custom Amount'/></td>
						<td className='input'><Input type='number' value={customCharges} onChange={setCustomCharges} aria-label='Custom Extra Charges'/></td>
						<td>{parseCurrency(customYearly)}</td>
						<td>{parseCurrency(customMonthly)}</td>
					</tr>
				</tbody>
			</Table>
		</StyledInterest>
	);
}

export default Interest;
