import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Interest from "./Interest";
import { getBasicMockState, render } from "@/utils/test.utils";
import { store } from "@/redux/store";

import type { Account } from "@/redux/accountsSlice";
import type { Transaction } from "@/redux/transactionsSlice";
import type { Category } from "@/redux/categoriesSlice";
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
		hidden: false,
		startingBalance: 100,
		interestRate: 1,
		extraCharges: 0
	},
	{
		id: 2,
		name: 'Tesco',
		hidden: false,
		startingBalance: 10000,
		interestRate: 2.5,
		extraCharges: 5
	}
] as Account[];

const mockTransactions = [
	{
		id: 1,
		type: 'spend',
		account: 1,
		amount: 50,
		date: '2023-01-01',
		category: 2
	}
] as Transaction[];

const mockState = getBasicMockState({
	accounts: mockAccounts,
	categories: mockCategories,
	transactions: { transactions: mockTransactions }
});

it("Loads element without crashing and shows headings", () => {
	render(<Interest/>, mockState);

	screen.getByRole('heading', { name: 'Interest Calculator' });
	screen.getByRole('heading', { name: 'Custom' });
});

it('Displays accounts', () => {
	render(<Interest/>, mockState);

	screen.getByText('Starling');
	screen.getByText('Tesco');
});

it('Displays interest rates', () => {
	render(<Interest/>, mockState);

	screen.getByText('1%');
	screen.getByText('2.5%');
});

it('Displays account totals and extra charges', () => {
	vi.spyOn(store, 'getState').mockReturnValue(mockState.preloadedState);
	
	render(<Interest/>, mockState);

	screen.getByText('£50.00');
	screen.getByText('£10,000.00');
	screen.getByText('£5.00');
});

it('Displays interest rates', () => {
	vi.spyOn(store, 'getState').mockReturnValue(mockState.preloadedState);
	
	render(<Interest/>, mockState);

	screen.getByText('£0.50');
	screen.getByText('£0.04');

	screen.getByText('£190.00');
	screen.getByText('£15.83');
});

//Copied from Interest Calculator

it('Displays custom inputs', () => {
	render(<Interest/>, mockState);

	screen.getByRole('spinbutton', { name: 'Custom Interest Rate'});
	screen.getByRole('spinbutton', { name: 'Custom Amount'});
	screen.getByRole('spinbutton', { name: 'Custom Extra Charges'});
});

it('Allows changing custom inputs and seeing the result', () => {
	render(<Interest/>, mockState);

	const rateInput = screen.getByRole('spinbutton', { name: 'Custom Interest Rate'});
	const amountInput = screen.getByRole('spinbutton', { name: 'Custom Amount'});

	fireEvent.change(rateInput, { target: { value: 1 } });
	fireEvent.change(amountInput, { target: { value: 100 } });

	screen.getByText('£1.00');
	screen.getByText('£0.08');

	fireEvent.change(rateInput, { target: { value: 2 } });
	fireEvent.change(amountInput, { target: { value: 100 } });

	screen.getByText('£2.00');
	screen.getByText('£0.17');

	fireEvent.change(rateInput, { target: { value: 2 } });
	fireEvent.change(amountInput, { target: { value: 200 } });

	screen.getByText('£4.00');
	screen.getByText('£0.33');
});