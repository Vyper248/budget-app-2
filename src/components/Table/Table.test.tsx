import {act, fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./Table";
import { vi } from "vitest";

beforeAll(() => {
  	//set table widths
	Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 500 });
	Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: 500 });
	Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 200 });
})

it("Loads element without crashing and displays children", () => {
	render(<Table><tbody><tr><td>Test</td></tr></tbody></Table>);

	screen.getByText('Test');
});

it('Displays correct scroll text if width is larger than screen width and when scrolling', () => {
	//set screen width
	global.innerWidth = 200;

	render(<Table><tbody><tr><td>Test</td></tr></tbody></Table>);

	const table = screen.getByRole('table');
	const scrollContainer = table.parentElement as HTMLElement;

	const scrollTexts = screen.getAllByText('Scroll for more');
	expect(scrollTexts).toHaveLength(2);

	//initially display the right scroll text
	expect(scrollTexts[0]).toHaveClass('hidden');
	expect(scrollTexts[1]).not.toHaveClass('hidden');
	
	//after scrolling a little, display both
	fireEvent.scroll(scrollContainer, { target: { scrollLeft: 20 } });

	expect(scrollTexts[0]).not.toHaveClass('hidden');
	expect(scrollTexts[1]).not.toHaveClass('hidden');

	//after scrolling to the end, display left
	fireEvent.scroll(scrollContainer, { target: { scrollLeft: 300 } });

	expect(scrollTexts[0]).not.toHaveClass('hidden');
	expect(scrollTexts[1]).toHaveClass('hidden');
});

it('Hides scroll text if screen is large enough to display the entire table', () => {
	//set screen width
	global.innerWidth = 600;

	render(<Table><tbody><tr><td>Test</td></tr></tbody></Table>);

	const scrollTexts = screen.queryAllByText('Scroll for more');
	expect(scrollTexts).toHaveLength(0);
});

it('Hides scroll text if resizing to a larger size', () => {
	vi.useFakeTimers();

	//set screen width
	global.innerWidth = 200;

	render(<Table><tbody><tr><td>Test</td></tr></tbody></Table>);

	const scrollTexts = screen.getAllByText('Scroll for more');
	expect(scrollTexts).toHaveLength(2);

	//initially display the right scroll text
	expect(scrollTexts[0]).toHaveClass('hidden');
	expect(scrollTexts[1]).not.toHaveClass('hidden');

	//Resize the screen
	act(() => {
		global.innerWidth = 600;
		global.dispatchEvent(new Event('resize'));
	
		//fast-forward timer
		vi.runAllTimers();
	});

	const scrollTexts2 = screen.queryAllByText('Scroll for more');
	expect(scrollTexts2).toHaveLength(0);
});