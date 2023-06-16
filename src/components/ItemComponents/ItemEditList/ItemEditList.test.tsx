import {fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemEditList from "./ItemEditList"
import { render } from "@/utils/test.utils";
import { vi } from "vitest";

const mockCategory = {
	id: 1,
    name: 'Food',
    type: 'expense' as 'expense',
    description: 'Any food stuff',
    hidden: false,
    startingBalance: 500,
    updated: 0,
};

const mockCategory2 = {
	id: 2,
    name: 'Earnings',
    type: 'income' as 'income',
    description: 'Money from job',
    hidden: false,
    startingBalance: 0,
    updated: 0,
};

it("Loads element without crashing", () => {
	render(<ItemEditList array={[mockCategory, mockCategory2]} type='category' onFinish={()=>{}}/>);
});

it('Displays a list of items', () => {
	render(<ItemEditList array={[mockCategory, mockCategory2]} type='category' onFinish={()=>{}}/>);

	screen.getByText('Food');
	screen.getByText('Earnings');
});

it('Shows new item form when clicking the Add New button', () => {
	render(<ItemEditList array={[mockCategory, mockCategory2]} type='category' onFinish={()=>{}}/>);

	//don't exist before clicking the Add New button
	expect(screen.queryByRole('heading', { name: 'New' })).toBeFalsy();
	expect(screen.queryByLabelText('Name')).toBeFalsy();

	let addBtn = screen.getByRole('button', {name: 'Add New'});
	fireEvent.click(addBtn);

	//now they exist
	screen.getByRole('heading', { name: 'New' });
	screen.getByLabelText('Name');
});

it('Shows the edit form when clicking an edit button', () => {
	render(<ItemEditList array={[mockCategory, mockCategory2]} type='category' onFinish={()=>{}}/>);

	let editBtns = screen.getAllByRole('button', { name: 'Edit Item' });
	expect(screen.queryByText('Edit Food')).toBeFalsy();
	
	fireEvent.click(editBtns[0]);
	
	screen.getByText('Edit Food');
	screen.getByLabelText('Name');
	screen.getByLabelText('Description');
	screen.getByLabelText('Starting Balance');
	screen.getByLabelText('Hidden');
	screen.getByLabelText('Type');
});

it('Shows a working finish editing button', () => {
	const mockFn = vi.fn();
	render(<ItemEditList array={[mockCategory, mockCategory2]} type='category' onFinish={mockFn}/>);

	let finishBtn = screen.getByRole('button', {name: 'Finish Editing'});
	fireEvent.click(finishBtn);

	expect(mockFn).toHaveBeenCalled();
});