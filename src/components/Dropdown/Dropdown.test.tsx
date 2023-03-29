import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Dropdown from "./Dropdown"
import { vi } from 'vitest';

it("Loads element without crashing", () => {
	render(<Dropdown value={""} onChange={()=>{}} options={[]}/>);
});

it('Displays the label if a label is given', () => {
	render(<Dropdown label='Test' value={""} onChange={()=>{}} options={[]}/>);
	screen.getByText('Test');
});

it("Displays options", () => {
	const options = [
		{value: "Option 1", label: "Option 1"},
		{value: "Option 2", label: "Option 2"},
		{value: "Option 3", label: "Option 3"}
	];
	const handleChange = vi.fn();

	render(<Dropdown value={""} onChange={handleChange} options={options}/>);
	
	screen.getByRole("combobox");
	screen.getByRole("option", {name: "Option 1"});
	screen.getByRole("option", {name: "Option 2"});
	screen.getByRole("option", {name: "Option 3"});
});

it("Calls onChange when an option is clicked", () => {
	const options = [
		{value: "Option 1", label: "Option 1"},
		{value: "Option 2", label: "Option 2"},
		{value: "Option 3", label: "Option 3"}
	];
	const handleChange = vi.fn();

	render(<Dropdown value={""} onChange={handleChange} options={options}/>);
	
	const dropdown = screen.getByRole("combobox");
	fireEvent.change(dropdown, {target: {value: 'Option 2'}});
	
	expect(handleChange).toHaveBeenCalledWith("Option 2");
});
