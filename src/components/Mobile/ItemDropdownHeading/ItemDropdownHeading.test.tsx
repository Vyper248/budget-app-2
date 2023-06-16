import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemDropdownHeading from "./ItemDropdownHeading"
import { render } from "@/utils/test.utils";

import type { Category } from "@/redux/categoriesSlice";
import { vi } from "vitest";

const mockCategories = [
    {
        id: 1,
        name: 'Food',
        type: 'expense' as 'expense',
        description: 'Any food stuff',
        hidden: false,
        startingBalance: 500,
        updated: 0,
    },
    {
        id: 2,
        name: 'Earnings',
        type: 'income' as 'income',
        description: 'Money from job',
        hidden: false,
        startingBalance: 0,
        updated: 0,
    },
	{
        id: 3,
        name: 'Travel',
        type: 'expense' as 'expense',
        description: 'Travel expenses',
        hidden: true,
        startingBalance: 0,
        updated: 0,
    }
] as Category[];

it("Loads element without crashing", () => {
	render(<ItemDropdownHeading items={[]} hiddenItems={[]} selectedItemId={1} onSelect={()=>{}} onEdit={()=>{}}/>);
});

it("Includes all categories in the dropdown, including hidden ones", () => {
	render(<ItemDropdownHeading items={mockCategories} hiddenItems={[]} selectedItemId={1} onSelect={()=>{}} onEdit={()=>{}}/>);

	screen.getByRole('option', { name: 'Food' });
	screen.getByRole('option', { name: 'Earnings' });
	screen.getByRole('option', { name: 'Travel' });
});

it('Calls the onEdit function when edit button is clicked', () => {
	const mockFn = vi.fn();
	render(<ItemDropdownHeading items={[]} hiddenItems={[]} selectedItemId={1} onSelect={()=>{}} onEdit={mockFn}/>);

	const editBtn = screen.getByRole('button', { name: 'Edit Items' });
	editBtn.click();

	expect(mockFn).toBeCalled();
});

it('Calls the onSelect function when selecting an item', () => {
	const mockFn = vi.fn();
	render(<ItemDropdownHeading items={mockCategories} hiddenItems={[]} selectedItemId={1} onSelect={mockFn} onEdit={()=>{}}/>);

	const select = screen.getByRole('combobox');
	fireEvent.change(select, { target: { value: 2 } });

	expect(mockFn).toBeCalled();
});