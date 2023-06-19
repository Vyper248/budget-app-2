import { useState } from "react";

import { parseCurrency } from "@/utils/transactions.utils";
import { useResponsive } from "@/utils/customHooks.utils";

import Table from "@/components/Table/Table";
import Input from "@/components/Input/Input";
import Container from "@/components/styled/Container";

const calculateInterest = (amount: number, rate: number, extraCharges: number): [number,number] => {
	const yearlyInterestBase = amount * (rate / 100);
	const monthlyInterestBase = yearlyInterestBase / 12;

	let monthly = monthlyInterestBase - extraCharges;
	let yearly = monthly * 12;

	return [monthly, yearly];
}

const InterestCalculator = () => {
	const { isMobile } = useResponsive();

	//custom interest data
	const [ customInterest, setCustomInterest ] = useState('');
    const [ customAmount, setCustomAmount ] = useState('');
    const [ customCharges, setCustomCharges ] = useState('0');
	const [ customMonthly, customYearly ] = calculateInterest(Number(customAmount), Number(customInterest), Number(customCharges));

	return (
		<Container>
			<h4>Custom</h4>
			<p>Use this to check how much interest you'll get with different amounts and interest rates etc.</p>
			<Table>
				<thead>
					<tr>
						<th>Interest Rate</th>
						<th>Amount</th>
						<th>Extra Charges</th>
						{ !isMobile && <th>Yearly Interest</th> }
						{ !isMobile && <th>Monthly Interest</th> }
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='input' style={{width: '120px'}}><Input type='number' value={customInterest} onChange={setCustomInterest} aria-label='Custom Interest Rate'/></td>
						<td className='input' style={{width: '120px'}}><Input type='number' value={customAmount} onChange={setCustomAmount} aria-label='Custom Amount'/></td>
						<td className='input' style={{width: '120px'}}><Input type='number' value={customCharges} onChange={setCustomCharges} aria-label='Custom Extra Charges'/></td>
						{ !isMobile && <td>{parseCurrency(customYearly)}</td> }
						{ !isMobile && <td>{parseCurrency(customMonthly)}</td> }
					</tr>
				</tbody>
			</Table>
			{ isMobile && (
				<Table>
					<thead>
						<tr>
							<th>Yearly Interest</th>
							<th>Monthly Interest</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{parseCurrency(customYearly)}</td>
							<td>{parseCurrency(customMonthly)}</td>
						</tr>
					</tbody>
				</Table>
			) }
		</Container>
	);
}

export default InterestCalculator;
