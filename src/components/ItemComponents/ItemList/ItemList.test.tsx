import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemList from "./ItemList"

import { vi } from "vitest";

const mockItems = [
	{
		id: 1,
		name: 'Test1',
		hidden: false
	},
	{
		id: 2,
		name: 'Test2',
		hidden: false
	},
	{
		id: 3,
		name: 'Test3',
		hidden: true
	},
];

it("Loads element without crashing", () => {
	render(<ItemList heading='Heading' items={[]} selectedItemId={1} onSelect={()=>{}} onEdit={()=>{}}/>);
});

it("Displays the correct heading", () => {
	render(<ItemList heading='Heading' items={[]} selectedItemId={1} onSelect={()=>{}} onEdit={()=>{}}/>);

	let heading = screen.getByRole('heading');
	expect(heading).toHaveTextContent('Heading');
});

it("Displays the correct items and handles onClick", () => {
	const mockFn = vi.fn();
	render(<ItemList heading='Heading' items={mockItems} selectedItemId={1} onSelect={mockFn} onEdit={()=>{}}/>);

	const item1 = screen.getByRole('button', { name: 'Test1'});
	const item2 = screen.getByRole('button', { name: 'Test2'});
	const item3 = screen.getByRole('button', { name: 'Test3'});

	fireEvent.click(item1);
	expect(mockFn).toBeCalledWith(1);

	fireEvent.click(item2);
	expect(mockFn).toBeCalledWith(2);

	fireEvent.click(item3);
	expect(mockFn).toBeCalledWith(3);
});

it("Displays the hidden items with a different style", () => {
	render(<ItemList heading='Heading' items={mockItems} selectedItemId={1} onSelect={()=>{}} onEdit={()=>{}}/>);

	const item3 = screen.getByRole('button', { name: 'Test3'});
	expect(item3).toHaveStyle({backgroundColor: '#999'});
});

it("Displays a functioning edit button and handles onClick", () => {
	const mockFn = vi.fn();
	render(<ItemList heading='Heading' items={mockItems} selectedItemId={1} onSelect={()=>{}} onEdit={mockFn}/>);

	const item1 = screen.getByRole('button', { name: 'Edit'});

	fireEvent.click(item1);
	expect(mockFn).toBeCalled();
});