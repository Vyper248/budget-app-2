import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import IconButton from "./IconButton"
import { vi } from "vitest";
import { FiMove } from 'react-icons/fi';

it("Loads element without crashing", () => {
	render(<IconButton onClick={()=>{}} Icon={FiMove}/>);
});

it('Runs the onClick function when user clicks on it', () => {
	const mockFn = vi.fn();
	render(<IconButton onClick={mockFn} Icon={FiMove}/>);

	let button = screen.getByRole('button');
	button.click();

	expect(mockFn).toBeCalled();
});
