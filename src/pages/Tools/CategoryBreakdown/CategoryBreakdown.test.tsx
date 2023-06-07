import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryBreakdown from "./CategoryBreakdown";
import { getBasicMockState, render } from "@/utils/test.utils";

import type { Category } from "@/redux/categoriesSlice";
import { Account } from "@/redux/accountsSlice";
import { Transaction } from "@/redux/transactionsSlice";
import { vi } from "vitest";

const mockCategories = [
	{
		id: 1,
		type: 'income',
		name: 'Earnings'
	},
	{
		id: 2,
		type: 'expense',
		name: 'Food'
	}
] as Category[];

const mockAccounts = [
	{
		id: 1,
		name: 'Starling',
		hidden: false
	}
] as Account[];

const mockTransactions = [
	{
		id: 1,
		type: 'spend',
		date: '2023-01-01',
		category: 1,
		account: 1,
		amount: 10
	},
	{
		id: 2,
		type: 'spend',
		date: '2023-02-15',
		category: 1,
		account: 1,
		amount: 20
	}
] as Transaction[]

const mockSettings = {
	periodsToDisplay: 12,
	startDate: '2022-01-01',
	payPeriodType: 'monthly' as 'monthly',
	displayMonths: true
}

const mockState = getBasicMockState({
	categories: mockCategories, 
	accounts: mockAccounts, 
	transactions: {transactions: mockTransactions}, 
	settings: mockSettings
});

beforeAll(() => {
	vi.setSystemTime('2023-03-01');
});

it("Loads element without crashing", () => {
	render(<CategoryBreakdown/>, mockState);
});

it("Displays date range inputs", () => {
	render(<CategoryBreakdown/>, mockState);

	screen.getByLabelText('From');
	screen.getByLabelText('To');
	screen.getByRole('button', { name: 'Clear' });
});

it("Displays category dropdown and options", () => {
	render(<CategoryBreakdown/>, mockState);

	screen.getByLabelText('Category');
	screen.getByRole('option', { name: 'Earnings' });
	screen.getByRole('option', { name: 'Food' });
});

it("Displays Account", () => {
	render(<CategoryBreakdown/>, mockState);
	screen.getByText('Starling');
});

it("Displays transactions", () => {
	render(<CategoryBreakdown/>, mockState);

	let monthAmountsA = screen.getAllByText('£10.00');
	expect(monthAmountsA).toHaveLength(2);

	let monthAmountsB = screen.getAllByText('£20.00');
	expect(monthAmountsB).toHaveLength(2);

	let totalAmounts = screen.getAllByText('£30.00');
	expect(totalAmounts).toHaveLength(2);
});