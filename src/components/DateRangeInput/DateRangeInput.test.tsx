import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import DateRangeInput from "./DateRangeInput"
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