import {fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionForm from "./TransactionForm"
import { getBasicMockState, render } from "@/utils/test.utils";
import { vi } from 'vitest';
import * as redux from '@/redux/hooks';

import { validateTransaction } from "./TransactionForm.utils";

import type { Account } from "@/redux/accountsSlice";
import type { Fund } from "@/redux/fundsSlice";
import type { FundTransaction, Transaction } from "@/redux/transactionsSlice";
import type { Category } from "@/redux/categoriesSlice";

const mockAccountA = { id: 2345 } as Account;
const mockAccountB = { id: 1234 } as Account;
const mockFund = { id: 3456 } as Fund;
const mockCategory = { id: 4567 } as Category
const mockState = getBasicMockState({ accounts: [mockAccountA, mockAccountB], funds: [mockFund], categories: [mockCategory] });

it("Loads element without crashing", () => {
	render(<TransactionForm/>);

	screen.getByText('Type');
	screen.getByText('Date');
	screen.getByText('Amount');
});

it('Displays the correct fields for a Spend transaction', () => {
	render(<TransactionForm/>);

	screen.getByText('Description');
	screen.getByText('Account');
	screen.getByText('Group');

	screen.getByRole('button', { name: 'Save'});
});

it('Displays the correct fields for a Transfer transaction', () => {
	render(<TransactionForm/>);

	//change to Transfer form
	let transferOption = screen.getByRole('combobox', { name: 'Type' });
	fireEvent.change(transferOption, { target: { value: 'transfer' } });

	screen.getByText('From');
	screen.getByText('To');
	screen.getByRole('button', { name: 'Save'});
});

it('Displays the correct fields for a Fund Addition', () => {
	render(<TransactionForm/>);

	//change to Fund Addition form
	let transferOption = screen.getByRole('combobox', { name: 'Type' });
	fireEvent.change(transferOption, { target: { value: 'fundAddition' } });

	screen.getByText('Description');
	screen.getByText('Fund');
	screen.getByRole('button', { name: 'Save'});
});

it('Accepts a Spend obj for editing', () => {
	let transactionObj = {
		type: 'spend',
		id: 123,
		updated: 123,
		date: '2022-01-01',
		amount: 235,
		description: 'Hello',
		account: 1234,
		category: 4567,
	} as Transaction;

	render(<TransactionForm obj={transactionObj}/>, mockState);

	expect(screen.getByLabelText('Type')).toHaveValue('spend');
	expect(screen.getByLabelText('Date')).toHaveValue('2022-01-01');
	expect(screen.getByLabelText('Amount')).toHaveValue(235);
	expect(screen.getByLabelText('Description')).toHaveValue('Hello');
	expect(screen.getByLabelText('Account')).toHaveValue('1234');
	expect(screen.getByLabelText('Group')).toHaveValue('4567');
});

it('Accepts a Transfer obj for editing', () => {
	let transactionObj = {
		type: 'transfer',
		id: 123,
		updated: 123,
		date: '2022-01-01',
		amount: 235,
		from: 1234,
		to: 2345,
	} as Transaction;

	render(<TransactionForm obj={transactionObj}/>, mockState);

	expect(screen.getByLabelText('Type')).toHaveValue('transfer');
	expect(screen.getByLabelText('Date')).toHaveValue('2022-01-01');
	expect(screen.getByLabelText('Amount')).toHaveValue(235);
	expect(screen.getByLabelText('From')).toHaveValue('1234');
	expect(screen.getByLabelText('To')).toHaveValue('2345');
});

it('Accepts a Fund Addition obj for editing', () => {
	let transactionObj = {
		type: 'fundAddition',
		id: 123,
		updated: 123,
		date: '2022-01-01',
		description: 'Cool new fund!',
		amount: 235,
		fund: 3456
	} as FundTransaction;

	render(<TransactionForm obj={transactionObj}/>, mockState);

	expect(screen.getByLabelText('Type')).toHaveValue('fundAddition');
	expect(screen.getByLabelText('Date')).toHaveValue('2022-01-01');
	expect(screen.getByLabelText('Amount')).toHaveValue(235);
	expect(screen.getByLabelText('Description')).toHaveValue('Cool new fund!');
	expect(screen.getByLabelText('Fund')).toHaveValue('3456');
});

it.each([
	{labelText: 'Date', invalid: '', valid: '2022-01-01'},
	{labelText: 'Account', invalid: 0, valid: 2345},
	{labelText: 'Group', invalid: 0, valid: 3456},
	{labelText: 'Amount', invalid: 0, valid: 242},
	{labelText: 'Fund', invalid: 0, valid: 3456},
	{labelText: 'From', invalid: 0, valid: 2345},
	{labelText: 'To', invalid: 0, valid: 1234},
])(
	'Validates each field correctly', ({labelText, invalid, valid}) => {
		let mockDispatch = vi.fn();
		let mockUseDispatch = vi.spyOn(redux, 'useAppDispatch');
		mockUseDispatch.mockReturnValue(mockDispatch);

		render(<TransactionForm/>, mockState);

		//make sure amount is always correct
		fireEvent.change(screen.getByLabelText('Amount'), { target: { value: 50 } });

		if (labelText === 'Fund') {
			//change to Fund Addition form
			let transferOption = screen.getByRole('combobox', { name: 'Type' });
			fireEvent.change(transferOption, { target: { value: 'fundAddition' } });
		}

		if (labelText === 'From' || labelText === 'To') {
			//change to Transfer form
			let transferOption = screen.getByRole('combobox', { name: 'Type' });
			fireEvent.change(transferOption, { target: { value: 'transfer' } });
		}

		//set To value if testing From
		if (labelText === 'From') {
			let toInput = screen.getByLabelText('To');
			fireEvent.change(toInput, { target: { value: 1234 } } );
		}

		//set From value if testing To
		if (labelText === 'To') {
			let toInput = screen.getByLabelText('From');
			fireEvent.change(toInput, { target: { value: 2345 } } );
		}

		//get input and save button
		let input = screen.getByLabelText(labelText);
		let saveBtn = screen.getByRole('button', { name: 'Save' });

		//set input to an invalid value
		fireEvent.change(input, { target: { value: invalid } });
		fireEvent.click(saveBtn);

		//make sure hasn't been called
		expect(mockDispatch).not.toBeCalled();
		
		//error message is shown
		let error = screen.getByRole('figure');
		expect(error.textContent).toContain('Error:');

		//set date back to a valid value
		fireEvent.change(input, { target: { value: valid } });
		fireEvent.click(saveBtn);

		//dispatch is now called
		expect(mockDispatch).toBeCalledTimes(2);
});

describe('Testing validateTransaction function', () => {
	let mockObj = {
		type: 'spend',
		date: '2022-01-01' as any,
		amount: 23,
		description: '',
		account: 234 as any,
		category: 221 as any,
		fund: 234 as any,
		from: 234 as any,
		to: 234 as any,
	};

	beforeEach(() => {
		mockObj = {
			type: 'spend',
			date: '2022-01-01',
			amount: 23,
			description: '',
			account: 234,
			category: 221,
			fund: 234,
			from: 234,
			to: 234
		}
	});

	it('validates normal object correctly', () => {
		expect(validateTransaction(mockObj).valid).toBeTruthy();
	});

	it('validates incorrect date as invalid', () => {
		mockObj.date = '';
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.date = 0;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.date = undefined;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.date = null;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.date = NaN;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.date = '202-010-2';
		expect(validateTransaction(mockObj).valid).toBeFalsy();
	});

	it('validates incorrect account as invalid', () => {
		mockObj.account = 0;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.account = undefined;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.account = null;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.account = NaN;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.account = '202352';
		expect(validateTransaction(mockObj).valid).toBeFalsy();
	});

	it('validates incorrect group as invalid', () => {
		mockObj.fund = 0;
		mockObj.category = 0;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.fund = undefined;
		mockObj.category = undefined;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.fund = null;
		mockObj.category = null;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.fund = '202352';
		mockObj.category = '202352';
		expect(validateTransaction(mockObj).valid).toBeFalsy();
	});

	it('validates incorrect fund as invalid', () => {
		mockObj.type = 'fundAddition';

		mockObj.fund = 0;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.fund = undefined;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.fund = null;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.fund = '202352';
		expect(validateTransaction(mockObj).valid).toBeFalsy();
	});
	
	it('validates incorrect from as invalid', () => {
		mockObj.type = 'transfer';

		mockObj.from = 0;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.from = undefined;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.from = null;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.from = '202352';
		expect(validateTransaction(mockObj).valid).toBeFalsy();
	});

	it('validates incorrect to as invalid', () => {
		mockObj.type = 'transfer';

		mockObj.to = 0;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.to = undefined;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.to = null;
		expect(validateTransaction(mockObj).valid).toBeFalsy();

		mockObj.to = '202352';
		expect(validateTransaction(mockObj).valid).toBeFalsy();
	});
});