import {fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Transaction from "./Transaction"
import { getBasicMockState, render } from "../../utils/test.utils";
import { vi } from "vitest";

import { store } from "../../redux/store";
import * as redux from '../../redux/hooks';
import { selectTransaction } from "../../redux/transactionsSlice";

import type { Transaction as TransactionType } from "../../redux/transactionsSlice";
import type { Account } from "../../redux/accountsSlice";
import type { Category } from "../../redux/categoriesSlice";

const mockAccount = {id: 1, name: 'Starling'} as Account;
const mockAccount2 = {id: 2, name: 'NatWest'} as Account;
const mockCategory = {id: 2, name: 'Food', type: 'expense'} as Category;

const mockTransaction = {
	id: 1,
	amount: 24,
	date: '2023-01-01',
	type: 'spend',
	description: 'Food from Sainsburys',
	category: 2,
	fund: undefined,
	account: 1
} as TransactionType;

const mockStateBase = {accounts: [mockAccount, mockAccount2], categories: [mockCategory]};

it("Loads element without crashing and displays transaction details", () => {
	const mockState = getBasicMockState({...mockStateBase, general: {currentPage: 'Home'}});

	const mockStore = vi.spyOn(store, 'getState');
	mockStore.mockReturnValue(mockState.preloadedState);

	render(<Transaction obj={mockTransaction}/>, mockState);

	screen.getByText('Starling - Food from Sainsburys');
	screen.getByText('Jan 1, 2023');
	screen.getByText('-£24.00');
});

it("Displays transfer details correctly when on Home page", () => {
	const mockTransfer = {
		id: 1,
		amount: 24,
		date: '2023-01-01',
		type: 'transfer',
		from: 1,
		to: 2,
	} as TransactionType;

	const mockState = getBasicMockState({...mockStateBase, general: {currentPage: 'Home'}});

	const mockStore = vi.spyOn(store, 'getState');
	mockStore.mockReturnValue(mockState.preloadedState);

	render(<Transaction obj={mockTransfer}/>, mockState);

	screen.getByText('Transferred from Starling to NatWest');
});

it("Displays transfer details correctly when on Account page", () => {
	const mockTransfer = {
		id: 1,
		amount: 24,
		date: '2023-01-01',
		type: 'transfer',
		from: 1,
		to: 2,
	} as TransactionType;

	const mockState = getBasicMockState({...mockStateBase, general: {currentPage: 'Accounts', selectedItem: 1}});

	const mockStore = vi.spyOn(store, 'getState');
	mockStore.mockReturnValue(mockState.preloadedState);

	render(<Transaction obj={mockTransfer}/>, mockState);

	screen.getByText('Transferred to NatWest');
});

it("Displays transfer details correctly when on different Account page", () => {
	const mockTransfer = {
		id: 1,
		amount: 24,
		date: '2023-01-01',
		type: 'transfer',
		from: 1,
		to: 2,
	} as TransactionType;

	const mockState = getBasicMockState({...mockStateBase, general: {currentPage: 'Accounts', selectedItem: 2}});

	const mockStore = vi.spyOn(store, 'getState');
	mockStore.mockReturnValue(mockState.preloadedState);

	render(<Transaction obj={mockTransfer}/>, mockState);

	screen.getByText('Transferred from Starling');
});

it("Doesn't show the account when looking at the accounts page, it shows category instead.", () => {
	const mockState = getBasicMockState({...mockStateBase, general: {currentPage: 'Accounts'}});

	const mockStore = vi.spyOn(store, 'getState');
	mockStore.mockReturnValue(mockState.preloadedState);

	render(<Transaction obj={mockTransaction}/>, mockState);

	screen.getByText('Food - Food from Sainsburys');
});

it("Shows the running balance if given", () => {
	const mockState = getBasicMockState({...mockStateBase, general: {currentPage: 'Accounts'}});

	const mockStore = vi.spyOn(store, 'getState');
	mockStore.mockReturnValue(mockState.preloadedState);

	render(<Transaction obj={mockTransaction} runningBalance={100}/>, mockState);
	screen.getByText('£100.00');
});

it('Selects a transaction when clicked', () => {
	const mockUseDispatch = vi.spyOn(redux, 'useAppDispatch');
	const mockDispatch = vi.fn();
	mockUseDispatch.mockReturnValue(mockDispatch);

	const mockState = getBasicMockState({...mockStateBase, general: {currentPage: 'Accounts'}});

	const mockStore = vi.spyOn(store, 'getState');
	mockStore.mockReturnValue(mockState.preloadedState);

	render(<Transaction obj={mockTransaction}/>, mockState);
	let amount = screen.getByText('-£24.00');
	fireEvent.click(amount);

	expect(mockDispatch).toBeCalledWith(selectTransaction(mockTransaction));
})