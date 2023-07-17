import {fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemForm from "./ItemForm"
import { render } from "@/utils/test.utils";
import { vi } from "vitest";

import { Fund, addFund } from "@/redux/fundsSlice";
import * as hooks from '@/redux/hooks';

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

it("Loads element without crashing", () => {
	render(<ItemForm onFinish={()=>{}} type='account'/>);
});

it('Shows the correct inputs for accounts', () => {
	render(<ItemForm onFinish={()=>{}} type='account'/>);

	screen.getByLabelText('Name');
	screen.getByLabelText('Description');
	screen.getByLabelText('Starting Balance');
	screen.getByLabelText('Hidden');
	screen.getByLabelText('Default');
	screen.getByLabelText('Extra Charges');
	screen.getByLabelText('Interest Rate');
	screen.getByRole('button', {name: 'Save'});
});

it('Shows the correct inputs for categories', () => {
	render(<ItemForm onFinish={()=>{}} type='category'/>);

	screen.getByLabelText('Name');
	screen.getByLabelText('Description');
	screen.getByLabelText('Starting Balance');
	screen.getByLabelText('Hidden');
	screen.getByLabelText('Type');
	screen.getByRole('button', {name: 'Save'});
});

it('Shows the correct inputs for funds', () => {
	render(<ItemForm onFinish={()=>{}} type='fund'/>);

	screen.getByLabelText('Name');
	screen.getByLabelText('Description');
	screen.getByLabelText('Starting Balance');
	screen.getByLabelText('Hidden');
	screen.getByLabelText('Target');
	screen.getByRole('button', {name: 'Save'});
});

it('Can take an item object and display those values', () => {
	render(<ItemForm onFinish={()=>{}} type='account' item={mockAccount}/>);

	expect(screen.getByLabelText('Name')).toHaveValue('Tesco');
	expect(screen.getByLabelText('Description')).toHaveValue('test account');
	expect(screen.getByLabelText('Starting Balance')).toHaveValue(50);
	expect(screen.getByLabelText('Hidden')).toHaveValue('No');
	expect(screen.getByLabelText('Default')).toHaveValue('Yes');
	expect(screen.getByLabelText('Extra Charges')).toHaveValue(5);
	expect(screen.getByLabelText('Interest Rate')).toHaveValue(1.2);
});

it('Returns a correct item object when clicking save', () => {
	let mockDispatch = vi.fn();
	vi.spyOn(hooks, 'useAppDispatch').mockReturnValue(mockDispatch);

	render(<ItemForm onFinish={()=>{}} type='fund'/>);

	let name = screen.getByLabelText('Name');
	let desc = screen.getByLabelText('Description');
	let st_bl = screen.getByLabelText('Starting Balance');
	let tgt = screen.getByLabelText('Target');
	let saveBtn = screen.getByRole('button', {name: 'Save'});

	fireEvent.change(name, { target: { value: 'Savings' } });
	fireEvent.change(desc, { target: { value: 'test description' } });
	fireEvent.change(st_bl, { target: { value: 0 } });
	fireEvent.change(tgt, { target: { value: 500 } });

	fireEvent.click(saveBtn);

	expect(mockDispatch).toBeCalledWith(addFund({
		name: 'Savings',
		description: 'test description',
		startingBalance: 0,
		targetAmount: 500,
		hidden: false
	} as Fund));
});

it('Calls the onFinish function after user clicks the save button', () => {
	const mockFn = vi.fn();
	render(<ItemForm onFinish={mockFn} type='account' item={mockAccount}/>);

	let saveBtn = screen.getByRole('button', {name: 'Save'});
	fireEvent.click(saveBtn);

	expect(mockFn).toBeCalled();
});

it('Will not save if the name is not set', () => {
	const mockFn = vi.fn();
	render(<ItemForm onFinish={mockFn} type='account'/>);

	let saveBtn = screen.getByRole('button', {name: 'Save'});
	fireEvent.click(saveBtn);

	expect(mockFn).not.toBeCalled();
	screen.getByText('Error: Must have a name');

	let name = screen.getByLabelText('Name');
	fireEvent.change(name, { target: { value: 'NatWest' } });
	fireEvent.click(saveBtn);
	expect(mockFn).toBeCalled();
});