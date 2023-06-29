import { act, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PopoutMessage from "./PopoutMessage";
import { getBasicMockState, render } from "@/utils/test.utils";
import * as redux from '@/redux/hooks';
import { vi } from "vitest";

const mockState = getBasicMockState({general: { message: {text: 'Test', type: 'error'} } });

it("Loads element without crashing", () => {
	render(<PopoutMessage/>);
});

it("Displays message text", () => {
	render(<PopoutMessage/>, mockState);

	screen.getByText('Test');
});

it('Has a functional close button', () => {
	const mockDispatch = vi.fn();
	vi.spyOn(redux, 'useAppDispatch').mockReturnValue(mockDispatch);
	vi.useFakeTimers();

	render(<PopoutMessage/>, mockState);
	const closeBtn = screen.getByRole('button', {name: 'Close Message'});
	fireEvent.click(closeBtn);

	act(() => {
		vi.runAllTimers();
	});
	
	expect(mockDispatch).toBeCalledTimes(2);
});

it('Closes by itself without using close button', () => {
	const mockDispatch = vi.fn();
	vi.spyOn(redux, 'useAppDispatch').mockReturnValue(mockDispatch);
	vi.useFakeTimers();

	render(<PopoutMessage/>, mockState);

	act(() => {
		vi.runAllTimers();
	});

	expect(mockDispatch).toBeCalledTimes(1);
});