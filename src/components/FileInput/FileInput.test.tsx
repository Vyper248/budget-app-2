import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import FileInput from "./FileInput"
import { vi } from "vitest";
import { act } from "react-dom/test-utils";

it("Loads element without crashing", () => {
	render(<FileInput label='Test' onChange={()=>{}} onSubmit={()=>{}}/>);
});

it('Calls the onChange function when changed and displays the filename', async () => {
	const mockFn = vi.fn();
	render(<FileInput label='Test' onChange={mockFn} onSubmit={()=>{}}/>);

	const fileInput = screen.getByTestId('file-input');
	const file = new File(['{"test":"file"}'], 'test.json', { type: 'application/json' });

	fireEvent.change(fileInput, { target: { files: [file] }});

	screen.getByText('test.json');
	await waitFor(() => expect(mockFn).toBeCalledWith({test: 'file'}));
});

it('Calls the onSubmit function when submitting', () => {
	const mockFn = vi.fn();
	render(<FileInput label='Test' onChange={()=>{}} onSubmit={mockFn}/>);

	const fileInput = screen.getByTestId('file-input');
	const file = new File(['{"test":"file"}'], 'test.json', { type: 'application/json' });

	fireEvent.change(fileInput, { target: { files: [file] }});

	act(() => {
		screen.getByText('Test').click();
	});

	expect(mockFn).toBeCalled();
});