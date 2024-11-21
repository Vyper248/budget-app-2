import {fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import DateRangeInput from "./DateRangeInput"
import { render } from "@/utils/test.utils";
import { vi } from "vitest";

it("Loads element without crashing", () => {
	const dateRange = {from: '', to: ''};
	render(<DateRangeInput dateRange={dateRange} onChange={()=>{}}/>);
});

it("Calls the change function when changing either date", () => {
	const dateRange = {from: '', to: ''};
	const mockChange = vi.fn();

	render(<DateRangeInput dateRange={dateRange} onChange={mockChange}/>);

	let fromInput = screen.getByLabelText('From');
	let toInput = screen.getByLabelText('To');

	fireEvent.change(fromInput, { target: { value: '2023-01-01' } });
	expect(mockChange).toBeCalledWith({from: '2023-01-01', to: ''});

	fireEvent.change(toInput, { target: { value: '2023-02-01' } });
	expect(mockChange).toBeCalledWith({from: '', to: '2023-02-01'});
});

it("Calls the clear function when pressing the clear button", () => {
	const dateRange = {from: '', to: ''};
	const mockClear = vi.fn();

	render(<DateRangeInput dateRange={dateRange} onChange={()=>{}} onClear={mockClear}/>);

	let clearButton = screen.getByRole('button', { name: 'Clear' });
	clearButton.click();

	expect(mockClear).toBeCalledTimes(1);
});

it("Displays an error when showing an invalid date", () => {
	const dateRange = {from: '2023-01-01', to: '1700-02-01'};
	render(<DateRangeInput dateRange={dateRange} onChange={()=>{}}/>);

	screen.getByText('Error: Second date is not valid.');
});

it('Includes the set date buttons', () => {
	const dateRange = {from: '', to: ''};
	render(<DateRangeInput dateRange={dateRange} onChange={()=>{}}/>);

	screen.getByRole('button', { name: 'Previous Year' });
	screen.getByRole('button', { name: 'Current Year' });
	screen.getByRole('button', { name: 'Current Tax Year' });
	screen.getByRole('button', { name: 'Previous Tax Year' });
	screen.getByRole('button', { name: 'Current Month' });
	screen.getByRole('button', { name: 'Previous Month' });
});

it.each([['Previous Year'], ['Current Year'], 
		['Previous Tax Year'], ['Current Tax Year'], 
		['Previous Month'], ['Current Month']])('Has working set date buttons', (name) => {
	const dateRange = {from: '', to: ''};
	const mockFn = vi.fn();
	render(<DateRangeInput dateRange={dateRange} onChange={mockFn}/>);

	const btn = screen.getByRole('button', { name });
	fireEvent.click(btn);
	expect(mockFn).toBeCalledTimes(1);
});