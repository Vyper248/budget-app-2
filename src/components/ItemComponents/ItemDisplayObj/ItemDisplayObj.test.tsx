import {fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemDisplayObj from "./ItemDisplayObj"
import { render } from "@/utils/test.utils";
import { vi } from "vitest";
import * as hooks from '@/redux/hooks';
import { removeFund } from "@/redux/fundsSlice";

const mockAccount = {
	id: 1,
    name: 'Tesco',
    description: 'test account',
    hidden: false,
    defaultAccount: true,
    extraCharges: 5,
    interestRate: 1.2,
    startingBalance: 50,
    updated: 0,
	sort: 0,
};

const mockCategory = {
	id: 2,
    name: 'Food',
    type: 'expense' as 'expense',
    description: 'Any food stuff',
    hidden: false,
    startingBalance: 500,
    updated: 0,
	sort: 0,
};

const mockFund = {
	id: 3,
    name: 'Savings',
    description: 'General savings account',
    targetAmount: 10000,
    hidden: false,
    startingBalance: 0,
    updated: 0,
	sort: 0,
};

it("Loads element without crashing", () => {
	render(<ItemDisplayObj itemObj={mockAccount} type='account' onEdit={()=>{}}/>);
});

it("Displays buttons", () => {
	render(<ItemDisplayObj itemObj={mockAccount} type='account' onEdit={()=>{}}/>);

	screen.getByRole('button', {name: 'Move Item'});
	screen.getByRole('button', {name: 'Edit Item'});
	screen.getByRole('button', {name: 'Delete Item'});
});

it('Displays correct values for an account object', () => {
	render(<ItemDisplayObj itemObj={mockAccount} type='account' onEdit={()=>{}}/>);

	screen.getByText('Tesco');
	screen.getByText('test account');
	screen.getByText('Interest Rate:');
	screen.getByText('1.2%');
	screen.getByText('Starting Balance:');
	screen.getByText('£50.00');
	screen.getByText('Extra Charges:');
	screen.getByText('£5.00');
	screen.getByText('Default Account:');
	screen.getByText('Yes');
	screen.getByText('Hidden:');
	screen.getByText('No');
});

it('Displays correct values for a category object', () => {
	render(<ItemDisplayObj itemObj={mockCategory} type='category' onEdit={()=>{}}/>);

	screen.getByText('Food');
	screen.getByText('Any food stuff');
	screen.getByText('Type:');
	screen.getByText('expense');
	screen.getByText('Starting Balance:');
	screen.getByText('£500.00');
	screen.getByText('Hidden:');
	screen.getByText('No');
});

it('Displays correct values for a fund object', () => {
	render(<ItemDisplayObj itemObj={mockFund} type='fund' onEdit={()=>{}}/>);

	screen.getByText('Savings');
	screen.getByText('General savings account');
	screen.getByText('Target:');
	screen.getByText('£10,000.00');
	screen.getByText('Starting Balance:');
	screen.getByText('£0.00');
	screen.getByText('Hidden:');
	screen.getByText('No');
});

it('Correctly dispatches when clicking on the delete item button', () => {
	const mockDispatch = vi.fn();
	vi.spyOn(hooks, 'useAppDispatch').mockReturnValue(mockDispatch);
	render(<ItemDisplayObj itemObj={mockFund} type='fund' onEdit={()=>{}}/>);

	let deleteBtn = screen.getByRole('button', {name: 'Delete Item'});
	fireEvent.click(deleteBtn);

	let confirmBtn = screen.getByRole('button', {name: 'Confirm'});
	fireEvent.click(confirmBtn);

	expect(mockDispatch).toBeCalledWith(removeFund(3));
});

it('Calls the onEdit function correctly', () => {
	const mockFn = vi.fn();
	render(<ItemDisplayObj itemObj={mockFund} type='fund' onEdit={mockFn}/>);

	let editBtn = screen.getByRole('button', {name: 'Edit Item'});
	editBtn.click();

	expect(mockFn).toBeCalledWith(mockFund);
});