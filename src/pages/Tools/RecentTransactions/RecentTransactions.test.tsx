import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RecentTransactions from "./RecentTransactions";

import { getBasicMockState, render } from "@/utils/test.utils";
import { getDateNumber } from "@/utils/date.utils";

import type { Transaction } from "@/redux/transactionsSlice";
import type { Category } from "@/redux/categoriesSlice";
import type { Account } from "@/redux/accountsSlice";

it("Loads element without crashing", () => {
	render(<RecentTransactions/>);
});

it('Displays the heading', () => {
	render(<RecentTransactions/>);

	screen.queryByTitle('Recent Transactions');
});

it('Displays recent transactions', () => {
	const today = getDateNumber();
	const mockState = getBasicMockState({transactions: {transactions: [
		{
			id: today,
			amount: 10,
			date: '2022-01-01',
			description: 'Test',
			type: 'spend',
		} as Transaction
	]}, general: {currentToolPage: 'Recent Transactions'}});

	render(<RecentTransactions/>, mockState);

	screen.getByText('Test');
	screen.getByText('Jan 1, 2022');
});