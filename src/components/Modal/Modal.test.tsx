import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal"
import { vi } from 'vitest';

it("Loads element without crashing and displays main elements", () => {
	render(<Modal heading='Test' onClickClose={()=>{}}><div>Child</div></Modal>);

	//Close button
	screen.getByRole('button');

	//Heading Text
	screen.getByText('Test');

	//Content
	screen.getByText('Child');
});

it('Calls the click handler when clicking the close button', () => {
	let mockClose = vi.fn();
	render(<Modal heading='Test' onClickClose={mockClose}><div>Child</div></Modal>);

	let closeBtn = screen.getByRole('button');
	fireEvent.click(closeBtn);
	expect(mockClose).toBeCalled();
});

it('Moves when dragged', () => {
	render(<Modal heading='Test' onClickClose={()=>{}}><div>Child</div></Modal>);

	let heading = screen.getByRole('heading');
	let outline = screen.getByRole('heading').closest('div');

	if (!outline) fail('Should be an outline!');

	//Starting position
	expect(outline.style.top).toBe('30px');
	expect(outline.style.left).toBe('285px');
	
	//Moves when dragged after mouseDown
	fireEvent.mouseDown(heading);
	fireEvent.mouseMove(outline, { clientX: 100, clientY: 100 });
	
	expect(outline.style.top).toBe('130px');
	expect(outline.style.left).toBe('385px');
	
	//Stops moving on mouseUp
	fireEvent.mouseUp(outline);
	fireEvent.mouseMove(outline, { clientX: 200, clientY: 200 });

	expect(outline.style.top).toBe('130px');
	expect(outline.style.left).toBe('385px');
});