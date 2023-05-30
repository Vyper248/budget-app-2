import {screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import AccountSummaries from "./AccountSummaries";
import { getBasicMockState, render } from "@/utils/test.utils";
import { Account } from "@/redux/accountsSlice";
import { Category } from "@/redux/categoriesSlice";
import { Transaction } from "@/redux/transactionsSlice";
import { store } from "@/redux/store";
import { vi } from "vitest";

const mockAccounts = [
	{
		id: 1,
		name: 'Starling',
		startingBalance: 100
	},
	{
		id: 5,
		name: 'Tesco',
		startingBalance: 0
	}
] as Account[];

const mockCategories = [
	{
		id: 3,
		name: 'food',
		type: 'expense',
	}
] as Category[];

const mockTransactions = [
	{
		id: 2,
		amount: 25,
		type: 'spend',
		category: 3,
		account: 1
	},
	{
		id: 4,
		amount: -5,
		type: 'spend',
		category: 3,
		account: 5
	},
	{
		id: 6,
		amount: 5,
		type: 'transfer',
		from: 1,
		to: 5
	}
] as Transaction[];

it("Loads element without crashing", () => {
	render(<AccountSummaries/>);
});

it("Displays totals for each account and all account total", () => {
	const mockState = getBasicMockState({accounts: mockAccounts, categories: mockCategories, transactions: {transactions: mockTransactions}})
	vi.spyOn(store, 'getState').mockReturnValue(mockState.preloadedState);
	render(<AccountSummaries/>, mockState);

	screen.getByText('Starling');
	screen.getByText('£70.00');

	screen.getByText('Tesco');
	screen.getByText('£10.00');

	screen.getByText('Total');
	screen.getByText('£80.00');
});
