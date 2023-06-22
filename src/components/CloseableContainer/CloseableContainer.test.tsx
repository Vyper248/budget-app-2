import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import CloseableContainer from "./CloseableContainer"
import { vi } from "vitest";
import { act } from "react-dom/test-utils";

it("Loads element without crashing", () => {
	render(<CloseableContainer heading='test' length={1}><div>Content</div></CloseableContainer>);
});

it("Displays the heading", () => {
	render(<CloseableContainer heading='test' length={1}><div>Content</div></CloseableContainer>);
	expect(screen.getByRole('heading')).toHaveTextContent('test');
});

it("Displays the content", () => {
	render(<CloseableContainer heading='test' length={1}><div>Content</div></CloseableContainer>);
	screen.getByText('Content');
});

it("Has the correct height for the container div", async () => {
	render(<CloseableContainer heading='test' length={2}><div>Content</div></CloseableContainer>);

	let content = screen.getByText('Content');
	let contentDiv = content.parentElement?.parentElement as HTMLElement;
	let style = window.getComputedStyle(contentDiv);
	expect(style.height).toBe('90px');
});

it('Stops rendering the content when closed', () => {
	vi.useFakeTimers();

	render(<CloseableContainer heading='test' length={1}><div>Content</div></CloseableContainer>);

	const heading = screen.getByRole('heading', { name: 'test' });
	
	act(() => {
		fireEvent.click(heading);
		vi.runAllTimers();
	});

	expect(screen.queryByText('Content')).toBeFalsy();
});

it('Stops rendering the content immediately when closed if set to instant', () => {
	render(<CloseableContainer heading='test' length={50}><div>Content</div></CloseableContainer>);

	const heading = screen.getByRole('heading', { name: 'test' });

	//content renders while open
	expect(screen.queryByText('Content')).toBeTruthy();

	//content stops rendering when closed
	fireEvent.click(heading);
	expect(screen.queryByText('Content')).toBeFalsy();
});

it('Doesnt render content when starting closed', () => {
	render(<CloseableContainer heading='test' length={1} startClosed={true}><div>Content</div></CloseableContainer>);
	expect(screen.queryByText('Content')).toBeFalsy();
});