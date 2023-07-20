import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import differenceInMonths from "date-fns/differenceInMonths";
import parseISO from "date-fns/parseISO";

import { parseCurrency } from "@/utils/transactions.utils";
import { getAccountTotals } from "@/utils/transactions.utils";
import { setSavingsTarget, setSavingsTargetDate, setSavingsUseMoney } from "@/redux/toolsSlice";
import { selectVisibleAccounts } from "@/redux/accountsSlice";
import { selectTransactions } from "@/redux/transactionsSlice";
import { useResponsive } from "@/utils/customHooks.utils";

import Input from "@/components/Input/Input";
import Table from "@/components/Table/Table";
import Container from "@/components/styled/Container";
import ToggleInput from "@/components/ToggleInput/ToggleInput";

const SavingsGoal = () => {
	const { isMobile } = useResponsive();
	const dispatch = useAppDispatch();
	const accounts = useAppSelector(selectVisibleAccounts);
	const transactions = useAppSelector(selectTransactions);
	const { savingsTargetDate, savingsTarget, savingsUseMoney } = useAppSelector(state => state.tools);

	const onChangeDate = (value: string) => dispatch(setSavingsTargetDate(value));
	const onChangeTarget = (value: string) => dispatch(setSavingsTarget(parseFloat(value)));
	const onChangeUseMoney = (value: boolean) => dispatch(setSavingsUseMoney(value));

	const accountTotals = getAccountTotals(transactions, accounts);
	const totalMoney = savingsUseMoney ? Object.values(accountTotals).reduce((a,c) => a+c, 0) : 0;
	const amountToSave = savingsTarget - totalMoney;
    const monthsToTarget = differenceInMonths(parseISO(savingsTargetDate), new Date()) || 0;
    const monthlySavings = amountToSave / monthsToTarget || 0;

	return (
		<Container>
			<h4>Savings Goal</h4>
			<Input type='date' width='150px' label='Target Date' labelWidth='150px' value={savingsTargetDate} onChange={onChangeDate}/>
			<Input type='number' width='150px' label='Target' labelWidth='150px' value={savingsTarget} onChange={onChangeTarget}/>
			<ToggleInput label='Use Total Money' width='150px' labelWidth='150px' value={savingsUseMoney} onChange={onChangeUseMoney}/>
			<br/>
			<Table>
				<thead>
					<tr>
						<th>Total Money</th>
						<th>Months to Target</th>
						{ !isMobile && <th>Amount to Save</th> }
						{ !isMobile && <th>Monthly</th> }
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{parseCurrency(totalMoney)}</td>
						<td>{monthsToTarget > 0 ? monthsToTarget : 0}</td>
						{ !isMobile && <td>{parseCurrency(amountToSave > 0 ? amountToSave : 0)}</td> }
						{ !isMobile && <td>{parseCurrency(monthlySavings > 0 ? monthlySavings : 0)}</td> }
					</tr>
				</tbody>
			</Table>
			{ isMobile && (
				<Table>
					<thead>
					<tr>
						<th>Amount to Save</th>
						<th>Monthly</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{parseCurrency(amountToSave > 0 ? amountToSave : 0)}</td>
						<td>{parseCurrency(monthlySavings > 0 ? monthlySavings : 0)}</td>
					</tr>
				</tbody>
				</Table>
			) }
		</Container>
	);
}

export default SavingsGoal;
