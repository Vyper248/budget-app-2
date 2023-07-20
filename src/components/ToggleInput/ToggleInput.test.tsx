import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToggleInput from "./ToggleInput";
import { vi } from "vitest";

it("Loads element without crashing", () => {
	render(<ToggleInput value={true} onChange={()=>{}}/>);
});

it("Calls the change function when clicked", () => {
	const mockFn = vi.fn();
	render(<ToggleInput label='Test' value={true} onChange={mockFn}/>);

	const checkbox = screen.getByLabelText('Test');
	fireEvent.click(checkbox);

	expect(mockFn).toBeCalled();
});

it("Shows the correct text when true", () => {
	render(<ToggleInput value={true} onChange={()=>{}}/>);
	screen.getByText('Yes');
});

it("Shows the correct text when false", () => {
	render(<ToggleInput value={false} onChange={()=>{}}/>);
	screen.getByText('No');
});

it("Shows the label text", () => {
	render(<ToggleInput label='Test' value={true} onChange={()=>{}}/>);
	screen.getByText('Test');
});
