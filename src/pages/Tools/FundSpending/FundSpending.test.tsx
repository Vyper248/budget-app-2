import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FundSpending from "./FundSpending";
import { getBasicMockState, render } from "@/utils/test.utils";

import type { Fund } from "@/redux/fundsSlice";
import { Transaction } from "@/redux/transactionsSlice";

const mockFunds = [
	{
		id: 1,
		name: 'Savings'
	},
	{
		id: 2,
		name: 'Presents'
	}
] as Fund[];

const mockTransactions = [
	{
		id: 1,
		type: 'spend',
		date: '2023-01-01',
		fund: 1,
		account: 1,
		amount: 10,
		description: 'TestA'
	},
	{
		id: 2,
		type: 'spend',
		date: '2023-02-15',
		fund: 2,
		account: 1,
		amount: 20,
		description: 'TestB'
	},
	{
		id: 3,
		type: 'spend',
		date: '2023-02-15',
		fund: 1,
		account: 1,
		amount: 20,
		description: 'TestC'
	},
	{
		id: 4,
		type: 'spend',
		date: '2023-04-15',
		fund: 2,
		account: 1,
		amount: 30,
		description: 'TestD'
	},
] as Transaction[]

const mockState = getBasicMockState({
	funds: mockFunds,
	transactions: {transactions: mockTransactions}
});

it("Loads element without crashing", () => {
	render(<FundSpending/>);
});

it("Displays date range inputs", () => {
	render(<FundSpending/>);

	screen.getByLabelText('From');
	screen.getByLabelText('To');
	screen.getByRole('button', { name: 'Clear' });
});

it("Displays category dropdown and options", () => {
	render(<FundSpending/>, mockState);

	screen.getByLabelText('Fund');
	screen.getByRole('option', { name: 'Savings' });
	screen.getByRole('option', { name: 'Presents' });
});

it('Displays the correct transactions and details', () => {
	render(<FundSpending/>, mockState);

	screen.getByText('£10.00');
	screen.getByText('£20.00');
	screen.getByText('£30.00');

	screen.getByText('TestA');
	screen.getByText('TestC');

	screen.getByText('01 Jan 2023');
	screen.getByText('15 Feb 2023');
});

it('Displays the correct transactions and details', () => {
	render(<FundSpending/>, mockState);

	const dropdown = screen.getByLabelText('Fund');
	fireEvent.change(dropdown, { target: { value: 2 } });

	screen.getByText('£20.00');
	screen.getByText('£30.00');
	screen.getByText('£50.00');

	screen.getByText('TestB');
	screen.getByText('TestD');

	screen.getByText('15 Feb 2023');
	screen.getByText('15 Apr 2023');
});