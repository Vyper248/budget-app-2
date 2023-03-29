import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input"
import { vi } from 'vitest';

it("Loads element without crashing", () => {
	render(<Input value='test' onChange={()=>{}}/>);
});

it('Shows the correct label', () => {
	render(<Input value='test' onChange={()=>{}} label='label'/>);
	screen.getByText('label');
});

it('Shows the correct starting value in the input', () => {
	render(<Input value='test' onChange={()=>{}}/>);
	let input = screen.getByRole('textbox');
	expect(input).toHaveValue('test');
});

it('Runs the onChange callback when input is changed', () => {
	let mockChange = vi.fn();
	render(<Input value='test' onChange={mockChange}/>);

	let input = screen.getByRole('textbox');
	fireEvent.change(input, { target: { value: 'a' } });

	expect(mockChange).toBeCalledTimes(1);
});

it('Has the correct type', () => {
	render(<Input value='test' type='number' onChange={()=>{}}/>);
	let input = screen.getByRole('spinbutton');
	expect(input).toHaveAttribute('type', 'number');
});