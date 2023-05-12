import {render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import ConfirmationContainer from "./ConfirmationContainer"
import { vi } from "vitest";

it("Loads element without crashing", () => {
	render(<ConfirmationContainer onClick={()=>{}}><button>Test</button></ConfirmationContainer>);
});

it('Only calls the onClick function when user clicks on confirm', async () => {
	const mockFn = vi.fn();
	render(<ConfirmationContainer onClick={mockFn}><button>Test</button></ConfirmationContainer>);

	let button = screen.getByRole('button', {name: 'Test'});
	await userEvent.click(button);
	expect(mockFn).not.toBeCalled();

	let confirm = screen.getByRole('button', {name: 'Confirm'});
	confirm.click();
	expect(mockFn).toBeCalled();
});

it('Doesnt call the onClick if user clicks on cancel', async () => {
	const mockFn = vi.fn();
	render(<ConfirmationContainer onClick={mockFn}><button>Test</button></ConfirmationContainer>);

	let button = screen.getByRole('button', {name: 'Test'});
	await userEvent.click(button);

	let cancel = screen.getByRole('button', {name: 'Cancel'});
	cancel.click();
	expect(mockFn).not.toBeCalled();
});